const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  raceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Race'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prediction: {
    type: Array,
    required: true
  }
})

predictionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Prediction = mongoose.model('Prediction', predictionSchema)
module.exports = Prediction
