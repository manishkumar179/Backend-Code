require("dotenv").config();
const app = require("./src/app");

let port = process.env.PORT

app.listen(port , ()=>{
    console.log(` SERVER IS RUNNING ON PORT ${port} `)
});