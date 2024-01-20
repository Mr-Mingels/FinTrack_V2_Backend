import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import session from "express-session"
import MongoDBStore from 'connect-mongo'
import connectToMongoDb from '../controllers/mongoController'
import authRouter from '../routes/authRoutes'
import { localStrategy, session as passportSession } from '../controllers/authController'

// Load environment variables
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
const allowedOrigin = isProduction
    ? process.env.APP_LIVE_URL
    : process.env.BASE_FRONTEND_URL

console.log('Allowed origin is: ', allowedOrigin)

const corsOptions = {
    // TODO: Only allow all origins when running locally but restrict in production
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Origin',
        'X-Requested-With',
        'Accept',
    ],
}

const app = express()

app.use(cors(corsOptions))

// Parse incoming JSON request bodies and make the data available in req.body
app.use(express.json());

// Parse incoming URL-encoded request bodies (typically from HTML forms) and make the data available in req.body
app.use(express.urlencoded({ extended: true }));

// Configure session management middleware for maintaining user sessions
app.use(
    session({
        secret: "finTrack_V2-11122023", // A secret key for encrypting session data (change this for security)
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Set the session cookie to expire after 1 week (adjust as needed)
        resave: true, // Forces the session to be saved back to the session store, even if it wasn't modified during the request
        saveUninitialized: true, // Forces an uninitialized session to be saved to the store
        store: new MongoDBStore({
            mongoUrl: process.env.MONGODB_URL,
            collectionName: "finTrack_V2_Sessions",
        }),
    })
);

app.use(cookieParser())

app.use(localStrategy);
app.use(passportSession);

// API Routes setup
app.use('/api/v1/auth', authRouter)

// Connect to the database
connectToMongoDb()
export default app