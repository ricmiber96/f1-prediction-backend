const Prediction = require('../models/prediction.model')
const User = require('../models/user.model')

const createPrediction = async (req, res) => {
  const { raceId, userId, predictionArray } = req.body
  console.log(req.body)
  if (!raceId || !userId || !predictionArray) {
    return res.status(400).json({ error: 'RaceId, userId and predictionArray are required' })
  } else {
    const prediction = new Prediction({
      raceId,
      userId,
      prediction: predictionArray
    })
    try {
      const savedPrediction = await prediction.save()
      res.status(201).json(savedPrediction)
      const userUpdate = await User.findOneAndUpdate(
        { _id: userId }, { lastRacePredicted: raceId }).exec()
      console.log(userUpdate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

const getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find()
    res.status(200).json(predictions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPredictionById = async (req, res) => {
  const { userId } = req.body
  try {
    const prediction = await Prediction.find({ userId })
    if (prediction) {
      res.status(200).json(prediction)
    } else {
      res.status(404).json({ message: 'Prediction not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createPrediction,
  getPredictions,
  getPredictionById
}
