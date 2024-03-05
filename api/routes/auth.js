import express from 'express'
import { signIn, signUp } from '../controllers/auth.js'
const routes = express.Router()

routes.get('/signin', signIn)
routes.post('/signup', signUp)

export default routes;