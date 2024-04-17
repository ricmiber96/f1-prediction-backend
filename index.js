const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./src/utils/config')
const driverRouter = require('./src/routes/driver.router')
const raceRouter = require('./src/routes/races.router')
const predictionRouter = require('./src/routes/prediction.router')
const userRouter = require('./src/routes/user.router')
const authRouter = require('./src/routes/auth.router')
const middleware = require('./src/utils/middleware')
const port = process.env.PORT || 3000

mongoose.connect(config.MONGO_DB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use('/api/auth', authRouter)
app.use('/api/drivers', driverRouter)
app.use('/api/races', raceRouter)
app.use('/api/prediction', predictionRouter)
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
