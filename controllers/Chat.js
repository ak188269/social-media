 function Socket(server){
    const io=require("socket.io")(server,{
        cors:{
    origin:"*"
        }
    });
let room;
    io.on("connection",(socket)=>{
        console.log(`${socket.id} connected`);

        socket.on("new-message",(msg)=>{
            console.log("there is a new message ",msg);
            console.log("room is ",room);
            socket.broadcast.to("room").emit("receive-msg",msg);
        })

        socket.on("join-room",(room)=>{
            socket.join("room");
            room=room.toString();
            socket.emit("joined-room");
            console.log(`${socket.id} joined room ${room}`);
        })
    })

}
module.exports =Socket;