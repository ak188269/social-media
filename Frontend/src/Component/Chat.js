import React, { useEffect, useState } from 'react'
import { io} from "socket.io-client";
import "./Chat.css";
function Chat() {
    const [socket]=useState(io("http://localhost:8080/",{autoConnect:false}));
    const [msg,setMsg]=useState("");
    const [room,setRoom]=useState("");
    // const [isConnected,setIsConnected] = useState(false);

    useEffect(()=>{
        // socket=io("http://localhost:8080/",{autoConnect:false});
        console.log(socket);
        socket.on("connect",()=>{
            // console.log(`${socket} joined chat`);
            console.log(socket);
        })
socket.on("disconnect",()=>{
    console.log("disconnected");
})

socket.on("receive-msg",(msg)=>{
    document.getElementById("msg").innerHTML+='<p class="left" style="float:left;clear:both">'+msg+'</p>'
    console.log("message received --> ",msg);
})

socket.on("joined-room",()=>{
    alert("joined-room");
})
    },[socket])
    const send=()=>{
// socket.emit("join-me","room");
socket.emit("new-message",msg);
document.getElementById("msg").innerHTML+='<p class="right" style="float:right">'+msg+'</p>'
    }

  return (
<>
<h1>Chat with me</h1>
<h3>Enter room id</h3>
<input type="text" value={room} onChange={(e)=>setRoom(e.target.value)}style={{border:
"2px solid black"}} />
<button style={{backgroundColor:"red", color:"white",padding:"10px"}} onClick={()=>{
    socket.connect();
    if(room)
    socket.emit("join-room",room);
}}>Join</button>
<br />
<input type="text" value={msg} onChange={(e)=>setMsg(e.target.value)} style={{border:
"2px solid black"}}/>
<button onClick={send} style={{backgroundColor:"green", color:"white" ,padding:"10px"}}>send</button>
<div id="msg"></div>

</>  )
}

export default Chat