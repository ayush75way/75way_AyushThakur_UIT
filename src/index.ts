import express from 'express'
import bodyParser from 'body-parser'
import adminRouter from './routes/Admin'
import userRouter from './routes/User'
import employeeRouter from './routes/Employee'
import { authenticateAdmin, authenticateEmployee, createConnection } from './utils/helpers';
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(express.json()) 
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use("/user",userRouter)
app.use("/admin", authenticateAdmin, adminRouter)
app.use("/employee", authenticateEmployee, employeeRouter)

// mongo atlas connection
createConnection()

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port: ${process.env.PORT}`)
})

