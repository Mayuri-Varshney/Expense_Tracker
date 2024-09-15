const mongoose=require('mongoose')
const colors = require('colors')

const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/expenseapp')
        console.log(`server connected on ${mongoose.connection.host}`)
    }catch(err){
        console.log(`${err}`.bgRed)
    }
}

module.exports = connectDb