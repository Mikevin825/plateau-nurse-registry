import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Plateau Nurse Registry API is operational.',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Registry API running on http://localhost:${PORT}`)
})
