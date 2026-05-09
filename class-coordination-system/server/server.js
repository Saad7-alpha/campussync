import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/db.js'
import errorHandler from './middleware/error.js'
import { initializeSocket } from './sockets/socketHandler.js'

// Import routes
import authRoutes from './routes/auth.js'
import assignmentRoutes from './routes/assignments.js'
import messageRoutes from './routes/messages.js'

// Load env vars
dotenv.config()

// Connect to database
connectDB()

const app = express()
const httpServer = createServer(app)

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// Initialize socket handler
initializeSocket(io)

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/messages', messageRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Class Coordination System API is running' })
})

// Error handler
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  console.log(`📡 Socket.IO server ready`)
})

export default app
