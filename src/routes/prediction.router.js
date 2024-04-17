const predictionService = require('../controllers/prediction.controller')
const predictionRouter = require('express').Router()

predictionRouter.post('/', predictionService.createPrediction)
predictionRouter.get('/', predictionService.getPredictions)
predictionRouter.get('/:id', predictionService.getPredictionById)

module.exports = predictionRouter
