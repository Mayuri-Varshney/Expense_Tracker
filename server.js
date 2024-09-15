const express=require('express')
const cors=require('cors')
const morgan = require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const connectDb = require("./config/connectDb")
// const mongoose=require('mongoose')


connectDb();
// mongoose.connect('mongodb://127.0.0.1:27017/expenseapp')
// .then(()=>{
//     console.log("connected")
// }).catch((err)=>{
//     console.log("yhujijiji")
// })

dotenv.config()
//rest object
const app=express()

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())

//routes
//user routes
app.use('/api/v1/users',require('./routes/userRoute.js'))

//transaction routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes.js'))

const PORT = 8085 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})