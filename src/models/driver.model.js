const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
  driverNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  team: {
    type: String
  },
  imageDriver: {
    type: String,
    required: true
  },
  imageNumber: {
    type: String
  },
  imageFlag: {
    type: String
  }
})

driverSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver
