const express = require("express")
const http = require("http")
const { Server } = require("socket.io");
const cors = require("cors")

const app = express()
const PORT = 3000
app.use(cors());


// Create httpServer
const httpServer = http.createServer(app);


// Singling server
const io = new Server(httpServer , {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET" , "POST"]
    }
});



//connection pool ,, event fire krna
io.on("connection" , (socket)=>{
    socket.on("sender" , (data)=>{
        console.log(data)
        io.emit("receiver", data);
    })



})


httpServer.listen(PORT , ()=>{
    console.log("Server is running on port " , PORT)
})

