import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'

const app = express()
dotenv.config()


mongoose.connect(process.env.MONGO_URL).then(() => console.log('mongodb connected!')).catch(err => {
    console.log('mongodb failed to connect. ', err)
})

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.listen(3000, () => {
    console.log('server listening on port 3000')
})