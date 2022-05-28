const { Server }    = require("socket.io");
const https         = require('https');
const express       = require('express');
const fs            = require('fs');
const http2         = require("http2");
//const http          = require("http");
const path          = require('path');
const wssport       = 5000;
const httpsport     = 5001;

const credentials = {
    key:    fs.readFileSync('../../../../etc/letsencrypt/live/patrila.app/privkey.pem'),
    cert:   fs.readFileSync('../../../../etc/letsencrypt/live/patrila.app/fullchain.pem')
};


const app         = express();

/*
const httpsServer   = http.createServer(app);
const http2Server  = http.createServer();
*/

const httpsServer = https.createServer(credentials, app);
const http2Server = http2.createSecureServer({  
    allowHTTP1: true,  
    key: credentials.key, 
    cert: credentials.cert
});

app.use('/assets',express.static(path.join(__dirname, '/assets'))); 
app.use('/components',express.static(path.join(__dirname, '/components'))); 

app.get('/js/adarna.js',function(req,res){
    res.sendFile(path.join(__dirname, 'node_modules/adarna/dist/adarna.js'));
});


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/list.html'));
});


app.get('/client', function (req, res) {
    res.sendFile(path.join(__dirname, '/client.html'));
});

app.get('/rover', function (req, res) {
    res.sendFile(path.join(__dirname, '/rover.html'));
});

/***************************************************************/

const io = new Server(http2Server,{  
    cors: {    
      origin: "*"  
    },
    pingInterval: 5000, 
    pingTimeout: 10000
});

let availableRovers = {};

io.sockets.on("connection", socket => {

    socket.on("offer", (id, message,name) => {
        socket.to(id).emit("offer", socket.id, message,name);
    });
      
    socket.on("answer", (id, message) => {
        socket.to(id).emit("answer", socket.id, message);
    });
    
    socket.on("candidate", (id, message) => {
        socket.to(id).emit("candidate", socket.id, message);
    });


    /**ready - avaiable - pending - connected**/

    //Receive status update from rover
    socket.on('update-rover-status',(state)=>{

        if(state.status == 'ready'){

            //Change state
            state.status = 'available';

            availableRovers[state.name] = {
                socket: socket,
                state: state,
                client:null
            };

            socket.emit('status',state);

            return true;
        }
    });


    socket.on('get-available-rovers',(callback)=>{

        let roverList = [];

        //Get only rover that has status available
        for(let key in availableRovers){
            if(availableRovers[key].state.status == 'available'){
                roverList.push(key);
            }
        }

        callback(roverList);
    });

    socket.on('connect-to-rover',(data,callback)=>{
        
        let uid  = data.uid ?? false;
        let name = data.name ?? '';

        //TODO: validate user and session

        //If rover is not detected
        if(typeof availableRovers[name] == 'undefined'){
            
            callback({
                status:0,
                message:'Rover is not available (A)'
            });

            return false;
        }

        //If rover is not status available
        if(availableRovers[name].state.status != 'available'){
        
            callback({
                status:0,
                message:'Rover is not available (B)'
            });

            return false;
        }

        //TODO get client data and send to rover

        //Update rover status
        availableRovers[name].state.status = 'pending';

        //Inform rover that the client wants to connect
        availableRovers[name].socket.emit('rover-connection-request',{
            uid: uid,
            clientId: socket.id,
            state: availableRovers[name].state
        });
    });


    socket.on('rover-connection-success',name=>{

        //TODO validate that rover exists

        availableRovers[name].state.status = 'connected';
        availableRovers[name].client = socket;

        //inform the rover of new status
        availableRovers[name].socket.emit('status',availableRovers[name].state);
    });

    socket.on('request-client-stream',(clientId)=>{
        socket.to(clientId).emit('request-client-stream',socket.id);
    });

    //Inform the rover that the client broadcast failed
    socket.on('client-broadcast-failed',(target)=>{
        socket.to(target).emit('client-broadcast-failed');
    });

    //Inform the client that the rover broadcast failed
    socket.on('rover-broadcast-failed',(roverName,clientId,message)=>{

        if(typeof availableRovers[roverName] == 'undefined') return false;

        socket.to(clientId).emit('rover-broadcast-failed',message);
    });

    socket.once('disconnect',() =>{
        
        let rovers = Object.values(availableRovers);

        for(let i = 0; i <= rovers.length-1;i++){
            let rover = rovers[i];

            //If the rover was disconnected
            if(rover.socket.id == socket.id){
                
                if(rover.client != null){
                    rover.client.emit('rover-disconnected');     
                }

                //Delete rover from registry
                delete availableRovers[rover.state.name];

                return false;
            }

            if(rover.client != null){

                //If client was disconnected
                if(rover.client.id == socket.id){

                    rover.state.status = 'ready';
                    rover.client = null;

                    rover.socket.emit('client-disconnected');
                    return false;
                }
            }
        };
    });




    /*** PING ***/
    socket.on('client-ping',(data)=>{
        
        socket.to(data.id).emit('client-ping',{
            time:data.time,
            id:data.id,
            from:socket.id
        });
        
    });

    socket.on('ping-rover',(data)=>{

        if(typeof availableRovers[data.name] == 'undefined') return false;
        let rover = availableRovers[data.name];

        socket.to(rover.socket.id).emit('ping-rover',{
            time:data.time,
            from:socket.id
        });
    });

    socket.on('reply-ping-rover',(data)=>{
        
        socket.to(data.to).emit('reply-ping-rover',{
            time:data.time
        });
    })


    /****************MOVEMENT*****************/

    function preMovementCheck(roverName){
        if(typeof availableRovers[roverName] == 'undefined') return false;
        
        if(availableRovers[roverName].state.status != 'connected') return false;

        if(availableRovers[roverName].client.id != socket.id) return false;

        return true;
    }

    socket.on('forward',(roverName)=>{

        if(!preMovementCheck(roverName)) return false;
        console.log('FORWARD')
        availableRovers[roverName].socket.emit('forward');
    });

    socket.on('backward',(roverName)=>{

        if(!preMovementCheck(roverName)) return false;
        availableRovers[roverName].socket.emit('backward');
    });

    socket.on('rotate-left',(roverName)=>{

        if(!preMovementCheck(roverName)) return false;
        availableRovers[roverName].socket.emit('rotate-left');
    });

    socket.on('rotate-right',(roverName)=>{

        if(!preMovementCheck(roverName)) return false;
        availableRovers[roverName].socket.emit('rotate-right');
    });

    socket.on('stop',(roverName)=>{

        if(!preMovementCheck(roverName)) return false;
        availableRovers[roverName].socket.emit('stop');
    });


    
});


http2Server.listen(wssport);
httpsServer.listen(httpsport);