let express = require("express")

let app = express()

app.use(express.json())

//Q. 1
app.get("/" , (req,res)=>{

    res.send("Server is running successfully")
})


//Q. 2

let array = [];
app.post("/users" , (req, res)=>{

    let {name , age} = req.body;

    if(!name || !age){
        return res.send("Data not found")
    }

    let newArr = {name , age};
    array.push(newArr)

    res.json({
        message:"New User added successfully",
        newArr
    })

})

//Q. 3

// let users = [
//     { name: "Manish", age: 22 },
//     { name: "Rahul", age: 25 }
// ];

app.get("/user" ,(req , res)=>{

    res.json({
        message:"return all users",
        users
    })

})


//Q. 4

// let user = [
//     { name: "Manish", age: 22 },
//     { name: "Rahul", age: 25 }
// ];

app.get("/userss/:name" ,(req, res)=>{

    let name = req.params.name;

    let findUser = user.find((elem)=> elem.name == name)

    if(!findUser){
       return res.send("User not found")
    }else{
        res.send("User found")
    }

} )


// Q. 5


app.delete("/users/:name" , (req, res)=>{

    let name = req.params.name;

    let index = users.findIndex((elem)=> elem.name === name)

    if(index == -1){
        return res.send("User not found")
    }

    const deleteUser = users.splice(index , 1)

    res.json({
        message:"Deleted user successfully",
        users:deleteUser[0]
    })


})

//Q. 6

app.get("/users/count" , (req,res)=>{

    let num = users.length

    res.json({
        message:"ok",
        num
    })
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})