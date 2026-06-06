import React, { useState } from 'react'
import { useEffect } from 'react';
import io from "socket.io-client";
const socket = io("http://localhost:3000")

const App = () => {

  const [message , setMessage]  = useState("")
  const [realMessage , setRealMessage] = useState([])
  const [myId , setMyId]  = useState("")


  const sendMessage =()=>{
    //data send to server
    socket.emit("sender" , message)
    setMessage("");
  }



  useEffect(()=>{
    socket.on("connect" , ()=>{
      // console.log(socket.id)
      setMyId(socket.id)
    })

    socket.on("receiver" , (data)=>{
      console.log(data)
      //data come to client 
      setRealMessage((prev)=>([
        ...prev , data
      ]))
    } )
  } , [])



  return (
    <>

    <h1>Chat App</h1>
    <h3>Chat by : {myId}</h3>
    <input type="text" placeholder='Enter message' value={message} onChange={(e)=>setMessage(e.target.value)} />
    <button onClick={sendMessage} >Send</button>

    <div>
      {
        realMessage.map((value , index)=>{
          return <p key={index}>{value}</p>
        })
      }
    </div>
    </>
  )
}

export default App
