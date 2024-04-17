const racesService = require('../controllers/race.controller')
const racesRouter = require('express').Router()

racesRouter.get('/', racesService.getRaces)
racesRouter.get('/:id', racesService.getRaceById)
racesRouter.put('/:id', racesService.updateRaceResults)

module.exports = racesRouter
