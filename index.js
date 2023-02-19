const express = require("express")
const {connection}= require("./db")
const app = express()
const {userrouter}=require("./routes/userroute")
const {noterouter}=require("./routes/notesroute")
const {validator,tokenVerify} = require("./midddleware/middle")
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})
app.use("/user/login",validator)
app.use("/user",userrouter)
app.use(tokenVerify)
app.use("/note",noterouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server is connected to database");
    }
    catch(err)
    {
        console.log("server is not connected to db")
    }
    console.log(`server is running at port ${process.env.port}`)
})