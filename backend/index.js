import express from "express"
import dotenv from 'dotenv' 
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import { connectDb } from './config/connectDb.js' 
import userRoute from "./routes/userRoute.js"
import urlRoute from "./routes/urlRoutes.js"
dotenv.config()
const app = express()
const port = process.env.port || 5000
connectDb()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
origin:'http://localhost:5173',
credentials:true
}
app.use(cors(corsOptions));
app.use(cookieParser());

// middlewares 
app.get("/", (req,res) => {
    res.send("Hey this is working")
})
app.use("/user",userRoute)
app.use("/api/urls",urlRoute)
const PORT = process.env.PORT || 8000;
app.listen(port , () => {
console.log(`Server is running on port port`)
})