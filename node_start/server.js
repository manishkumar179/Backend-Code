
// const http = require("http")
//npm  init-y


let express = require("express")

// console.log(exp);


// const server = http.createServer((req, res)=>{
    
//     if(req.url === "/"){
//         res.end("Main home pe hu")
//     }else if(req.url === "/about"){
//         res.end("Main about pe hu")
//     }
    
// })

let app = express()

app.get("/" , (req,res)=>{

    res.send("Ha ha mil gaya")
})

app.listen(3000, ()=>{
    console.log("Server is  running on port 3000");
    
})









