import express from 'express'
require("dotenv").config()
const app = express();

app.get("/", (req,res)=>{
    res.send("hello")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port: ${process.env.PORT}`)
})