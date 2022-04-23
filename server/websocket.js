const socketio = require('socket.io');
// server.js does not run again because it is already executed
const { server} = require("./server.js");
const { newRoomName, getRandomColor } = require('./utils');
// const {Game} = require("./game.js");
const assert = require('assert');

const io = socketio(server, {cors:{ origin:'*',}});

global.io = io;


//io.sockets.something and io.something are same thing
io.on("connection", (sock) => {
    sock.roomName = sock.handshake.query.roomName;
    sock.username = sock.handshake.query.username;
    sock.progress = 0;
    sock.color = getRandomColor();
    sock.join(sock.roomName);
    

    sock.on("progress",(progress)=>{
        sock.progress = progress;
    })
    sock.on("list",()=>{
        let data = {};
        const clients = io.sockets.adapter.rooms.get(sock.roomName);
        if(clients){
            for (const clientId of clients){
                const clientSocket = io.sockets.sockets.get(clientId);
                let clientData = {
                    username:clientSocket.username,
                    progress:clientSocket.progress,
                    color:clientSocket.color,
                };
                data[clientId] = clientData; 
            }
        }
        sock.emit("list",data);
    });
    sock.on("start",()=>{
        console.log("start from ",sock.id, sock.roomName );
        io.in(sock.roomName).emit("start");
    });    
    
});
