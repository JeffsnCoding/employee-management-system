const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const employeeRoutes = require('./routes/employees')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.use('/api/employees', employeeRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

async function startServer() {
  try {
    const dbPath = path.join(__dirname, '../database/employees.db')
    const dbDir = path.dirname(dbPath)

    if (!fs.existsSync(dbDir)) {
      console.log('Creating database directory...')
      fs.mkdirSync(dbDir, { recursive: true })
    }

    if (!fs.existsSync(dbPath)) {
      console.log('Database not found, initializing...')
      await require('./database/init')()
      console.log('Database initialized successfully')
    } else {
      console.log('Database file exists, skipping initialization')
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()