import express from 'express'
import { getUsers } from '../controllers/user.js'
const routes = express.Router()

routes.get('/list', getUsers)

export default routes;