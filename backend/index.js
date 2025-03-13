import express from "express"
import dotenv from "dotenv"
import connectDB from "./Models/db.js"
import TaskRouter from "./Routes/TaskRouter.js"
import bodyParser from "body-parser"
import cors from 'cors'

dotenv.config({})

const app = express()

const PORT = process.env.PORT || 4000

app.get('/',(req,res)=> {
    res.send("hello from server")
})

app.use(cors())
app.use(bodyParser.json())
app.use('/tasks',TaskRouter)

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is Running at Port=${PORT}👍`)
})