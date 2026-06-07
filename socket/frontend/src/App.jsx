import React, { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import ChatBox from "./components/ChatBox";
const socket = io("http://localhost:3000");

const App = () => {
  const [message, setMessage] = useState("");
  const [realMessage, setRealMessage] = useState([]);
  const [myId, setMyId] = useState("");

  const sendMessage = () => {
    // message send to server
    socket.emit("sender", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      // console.log(socket.id)
      setMyId(socket.id);
    });

    socket.on("receiver", (data) => {
      console.log(data);
      //data come to client
      setRealMessage((prev) => [...prev, data]);
    });
  }, []);

  return (
    <>
      <div>
        <ChatBox
          realMessage={realMessage}
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
          myId={myId}
        />
      </div>
    </>
  );
};

export default App;
