const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connection = require('./Config/config')
const userController = require('./Controllers/User.controller')
const categoryController = require('./Controllers/Category.controller')
const authentication = require('./Middlewares/Authentication')


const app = express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Home page");
})

app.use("/user", userController)

app.use(authentication)

app.use("/category",categoryController)



app.listen(process.env.PORT, async ()=>{
    try{
        await connection;
        console.log("Connected to db");
    }
    catch(err){
        console.log(err);
    }
    console.log("Something running at 8000");
})