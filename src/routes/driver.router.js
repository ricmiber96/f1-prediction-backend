const driverService = require('../controllers/driver.controller')
const driverRouter = require('express').Router()

driverRouter.get('/', driverService.getDrivers)

module.exports = driverRouter
