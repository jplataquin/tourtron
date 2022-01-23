const { Server }    = require("socket.io");
const https         = require('https');
const express       = require('express');
const fs            = require('fs');
const http2         = require("http2");
const path          = require('path');
const wssport       = 5000;
const httpsport     = 5001;


const credentials = {
    key:    fs.readFileSync('../../../../etc/letsencrypt/live/patrila.app/privkey.pem'),
    cert:   fs.readFileSync('../../../../etc/letsencrypt/live/patrila.app/fullchain.pem')
};

const app         = express();
const httpsServer = https.createServer(credentials, app);
const http2Server = http2.createSecureServer({  
    allowHTTP1: true,  
    key: credentials.key, 
    cert: credentials.cert
});

app.use('assets/',express.static(path.join(__dirname, '/assets'))); 

app.get('/client', function (req, res) {
    console.log('here')
    res.sendFile(path.join(__dirname, '/client.html'));
});

app.get('/rover', function (req, res) {
    res.sendFile(path.join(__dirname, '/rover.html'));
});

/***************************************************************/

const io = new Server(http2Server,{  
    cors: {    
      origin: "*"  
    }
});

let availableRovers = {};

io.sockets.on("connection", socket => {

    console.log('Connected');

    socket.on("offer", (id, message,name) => {
        socket.to(id).emit("offer", socket.id, message,name);
    });
      
    socket.on("answer", (id, message) => {
        socket.to(id).emit("answer", socket.id, message);
    });
    
    socket.on("candidate", (id, message) => {
        socket.to(id).emit("candidate", socket.id, message);
    });



    //Receive status of rover
    socket.on('status',(state)=>{

        if(state.status == 'ready'){

            //Change state
            state.status = 'available';

            availableRovers[state.name] = {
                socket: socket,
                state:state 
            };

            socket.emit('status',state);
        }
    });


    socket.on('get-available-rovers',()=>{
        socket.emit('available-rover-list',Object.keys(availableRovers));
    });

    socket.on('connect-to-rover',(data)=>{
        console.log('connect-to-rover');

        let uid = data.uid ?? false;
        let name = data.name ?? '';

        //TODO: validate user and session

        if(typeof availableRovers[name] == 'undefined'){
            
            socket.emit('connection-error',{
                message:'Rover is not available (A)'
            });

            return false;
        }


        if(availableRovers[name].state.status != 'available'){
            socket.emit('connection-error',{
                message:'Rover is not available (B)'
            });

            return false;
        }

        //TODO get client data and send to rover

        //Update rover status
        availableRovers[name].state.status = 'pending-connection';


        //Inform rover that the client wants to connect
        availableRovers[name].socket.emit('connection-request',{
            uid:uid,
            clientId:socket.id,
            state: availableRovers[name].state
        });
    });


    socket.on('connection-success',name=>{

        //TODO validate that rover exists

        availableRovers[name].state.status = 'connected';
        availableRovers[name].client = socket;

        availableRovers[name].socket.emit('status',availableRovers[name].state);
    })
});


http2Server.listen(wssport);
httpsServer.listen(httpsport);