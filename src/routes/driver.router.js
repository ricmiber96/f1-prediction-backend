const driverService = require('../controllers/driver.controller')
const driverRouter = require('express').Router()

driverRouter.get('/', (req, res) => {
  res.send(driverService.getDrivers())
})
