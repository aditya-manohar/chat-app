const express = require('express');
const app = express();
const path =require("path");

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join()));

io.on("connection",(socket)=>{
    socket.on("newuser",function(username)
    {
        socket.broadcast.emit("update",username + " joined the chat" )
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username + " left the chat")
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat",message)
    })
})

server.listen(3000,()=>{
    console.log("server running...")
});