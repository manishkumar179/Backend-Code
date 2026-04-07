let express  = require("express")

let app = express()

//middleWare
app.use(express.json())


app.get("/" , (req, res)=>{

    res.send("I am running on / path")
})


 
app.get("/about" , (req , res)=>{
    res.send("About page")
})



app.post("/getData" , (req , res)=>{

    let {name , age}  = req.body;

    res.json({
        message : "ok",
        name,
        age
    })
    
})




app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})