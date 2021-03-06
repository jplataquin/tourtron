function broadcastStream(data){
    console.log('B1');
    data.videoConstraint =  (typeof data.videoConstraint != 'undefined') ? data.videoConstraint : {};
    data.clientSocketId  = (typeof data.clientSocketId != 'undefined') ? data.clientSocketId : false;
    data.state           = (typeof data.state != 'undefined') ? data.state : false;
    data.camera          = (typeof data.camera != 'undefined') ? data.camera : false;
    data.microphone      = (typeof data.microphone != 'undefined') ? data.microphone : false;
    data.socket          = (typeof data.socket != 'undefined') ? data.socket : false;
    data.webRTCconfig    = (typeof data.webRTCconfig != 'undefined') ? data.webRTCconfig : {
        iceServers: [
            { 
            "urls": "stun:stun.l.google.com:19302",
            },
             { 
               "urls": "turn:turn.patrila.app:5349",
               "username": "guest",
               "credential": "somepassword"
             }
        ]
    };
   
    if(!data.camera) {
        return Promise.reject('Camera not found');
    }

    if(!data.microphone) {
        return Promise.reject('Microphone not found');
    }

    if(!data.socket) {
        return Promise.reject('Socket not found');
    }

    if(!data.clientSocketId) {
        return Promise.reject('Client Socket ID not found');
    }

    if(!data.state) {
        return Promise.reject('State not found');
    }

    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    data.videoConstraint.deviceId = data.camera ? { exact: data.camera } : undefined;
    
    let peerConnection = new RTCPeerConnection(data.webRTCconfig);   
   
    return new Promise( (resolve,reject)=>{
     
        //Open microphone and camera
        navigator.mediaDevices.getUserMedia({
            audio: { 
                deviceId: data.microphone ? { exact: data.microphone } : undefined 
            },
            video: data.videoConstraint
        }).then((stream)=>{
        
            window.stream = stream;
            
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        
            peerConnection.onicecandidate = (event) => {
              
                if (event.candidate) {
                    data.socket.emit("candidate", data.clientSocketId, event.candidate);
                }
            };
            
            //Send connection offer to client
            peerConnection
                .createOffer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                  
                    data.socket.emit("offer", data.clientSocketId, peerConnection.localDescription,data.state.name);
                });


            data.socket.on("answer", (id, description) => { 
                if(peerConnection != null){
                   
                    peerConnection.setRemoteDescription(description);
                }
            });

            data.socket.on("candidate", (id, candidate) => {
                if(peerConnection != null){
                    
                    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                }
            });
              

            resolve({
                stopStream:()=>{

                    //Stop all stream
                    if (window.stream) {
                        window.stream.getTracks().forEach(track => {
                            track.stop();
                        });
                    }
                    
                    //Close peer connection

                    if(peerConnection){
                        peerConnection.close();
                        peerConnection = null;
                    }
                    

                }
            });

        }).catch((err)=>{
            
            //Stop all stream
            if (window.stream) {
                window.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
            
            peerConnection.close();
            peerConnection = null;

            console.log('Error: unable to broadcast',err);
            reject(err);
            
        });

    });
  
}


function getMediaCaptureDevices(){
    
  
    return new Promise( async (resolve,reject) =>{
        
        await navigator.mediaDevices.getUserMedia({audio: true, video: true}); 
        
        navigator.mediaDevices.enumerateDevices().then((deviceInfos)=>{
            
            
            let audioDevices = [];
            let videoDevices = [];
    
            let audio_i = 1;
            let video_i = 1;
    
            for (const deviceInfo of deviceInfos) {
                
                if (deviceInfo.kind === "audioinput") {
                    
                    audioDevices.push({
                        id:deviceInfo.deviceId,
                        name:deviceInfo.label || `Microphone ${audio_i++}`
                    });
                    
                } else if (deviceInfo.kind === "videoinput") {
                    
                    videoDevices.push({
                        id:deviceInfo.deviceId,
                        name:deviceInfo.label || `Camera ${video_i++}`
                    });
                }
            }
    
            resolve({
                video: videoDevices,
                audio: audioDevices
            });
        }).catch((err)=>{
            reject('Media devices unavailable');
        });
    
    });
    
}


function viewStream(data){
    
    data.videoElement   = (typeof data.videoElement != 'undefined') ? data.videoElement : undefined;
    data.broadcasterId  = (typeof data.broadcasterId != 'undefined') ? data.broadcasterId : undefined;
    data.socket         = (typeof data.socket != 'undefined') ? data.socket : undefined;
    data.onMessage      = (typeof data.onMessage != 'undefined') ? data.onMessage : (message)=>{};
    data.onStreamEnd    = (typeof data.onStreamEnd != 'undefined') ? data.onStreamEnd : (message)=>{};
    data.streamId       = (typeof data.streamId != 'undefined') ? data.streamId : false;
    data.webRTCconfig   = (typeof data.webRTCconfig != 'undefined') ? data.webRTCconfig : {
        iceServers: [
            { 
            "urls": "stun:stun.l.google.com:19302",
            },
            { 
                "urls": "turn:turn.patrila.app:5349",
                "username": "user",
                "credential": "somepassword"
            }
        ]
    };

    let status = {
        connected: false
    };

    let peerConnections;

    data.socket.on("offer", (id, description) => {
  
        peerConnection = new RTCPeerConnection(data.webRTCconfig);
        
        peerConnection
            .setRemoteDescription(description)
            .then(()  => peerConnection.createAnswer())
            .then(sdp => peerConnection.setLocalDescription(sdp))
            .then(() => {
                data.socket.emit("answer", id, peerConnection.localDescription);
            });
    
    
        peerConnection.ontrack = event => {
            data.videoElement.srcObject = event.streams[0];
            status.connected = true;
        };
    
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                data.socket.emit("candidate", id, event.candidate);
            }
        };
  
    });
  
    data.socket.on("candidate", (id, candidate) => {
        peerConnection
            .addIceCandidate(new RTCIceCandidate(candidate))
            .catch(e => console.error(e));
    });

    data.socket.on("onMessage", (message) => {
        data.onMessage(message);
    });

    data.socket.on("onMessage", (message) => {
        console.log('fired',message);
    });

    data.socket.on("streamEnd", () => {
        data.onStreamEnd();
    });

    data.socket.emit('viewStream',{
        id: data.broadcasterId,
        streamId:data.streamId
    });


    window.onunload = window.onbeforeunload = () => {
        data.socket.close();
        if(typeof peerConnections['close'] != 'undefined'){
            peerConnection.close();
        }
        
    };
      

    return {
        send:(message)=>{

            if(status.connected){
                data.socket.emit("sendMessage",data.broadcasterId,message);
                return true;
            }
            
            return false;
           
        },
        disconnect: ()=>{

        },
        status:status
    }
}