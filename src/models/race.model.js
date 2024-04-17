const mongoose = require('mongoose')

const raceSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  circuit: {
    type: String,
    required: true
  },
  imgCircuit: {
    type: String,
    required: true
  },
  imgBackground: {
    type: String,
    required: true
  },
  flag: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  raceResult: {
    type: Array
  }
})

raceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Race = mongoose.model('Race', raceSchema)
module.exports = Race
