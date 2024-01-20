import express from 'express'
import { LogIn, SignUp, LogOut, CheckAuthentication } from '../controllers/authController'

const authRouter = express.Router()

authRouter.post('/sign-up', SignUp)
authRouter.post('/log-in', LogIn)
authRouter.get('/log-out', LogOut)
authRouter.get('/authenticated', CheckAuthentication)

export default authRouter