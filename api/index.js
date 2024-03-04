import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => console.log('mongodb connected!')).catch(err => {
    console.log('mongodb failed to connect. ', err)
})
app.listen(3000, () => {
    console.log('server listening on port 3000')
})