const User = require('../models/user.model')
const Race = require('../models/race.model')
const Prediction = require('../models/prediction.model')
const bcrypt = require('bcrypt')

async function calculatePoints (raceResult, prediction) {
  let points = 0
  for (let i = 0; i < raceResult.length; i++) {
    const realResultIndex = raceResult.indexOf(raceResult[i])
    const predictionIndex = prediction.indexOf(raceResult[i])
    console.log('Points', points)
    if (realResultIndex === predictionIndex) {
      points += 25
    } else {
      const difference = Math.abs(realResultIndex - predictionIndex)
      if (difference === 1) {
        points += 18
      } else if (difference === 2) {
        points += 15
      } else if (difference === 3) {
        points += 12
      } else if (difference === 4) {
        points += 10
      } else if (difference === 5) {
        points += 8
      } else if (difference === 6) {
        points += 6
      } else if (difference === 7) {
        points += 4
      } else if (difference === 8) {
        points += 2
      } else if (difference === 9) {
        points += 1
      }
    }
  }
  return points
}

// GET USERS ORDER BY POINTS
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).exec()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUserPoints = async (req, res) => {
  const { userId } = req.body
  try {
    const race = await Race.findOne({ raceResult: { $ne: undefined } })
      .sort({ startDate: -1 }) // Sort by date field in descending order to get the last race
      .exec()
    if (!race) {
      return res.status(404).json({ message: 'No race found' }).end()
    }
    const prediction = await Prediction.findOne({ raceId: race._id })
    if (!prediction) {
      return res.status(404).json({ message: 'No prediction found' }).end()
    }
    console.log(race)
    console.log(prediction)
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'No user found' }).end()
    }
    if ((race && prediction) && (user.lastRacePredicted !== race._id)) {
      console.log(race.raceResult)
      console.log(prediction.prediction)

      const points = await calculatePoints(race.raceResult, prediction.prediction)
      console.log(points)
      const userUpdate = await User.findOneAndUpdate(
        { _id: userId }, // Query to find the user by ID
        { $inc: { points } }, // Update the points field
        { new: true } // Return the updated document
      ).exec()
      res.status(200).json(userUpdate)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  // if (race._id === prediction.raceId) {
  //   console.log('Correct prediction')
  // }
}

// const createUser = async (req, res) => {
//   const { username, password, email } = req.body
//   const userExist = await User.findOne({ email })
//   if (userExist) {
//     return res.status(400).json({ message: 'Email already exists' }).end()
//   } else {
//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(password, saltRounds)
//     const user = new User({
//       username,
//       passwordHash,
//       email
//     })

//     try {
//       const savedUser = await user.save()
//       res.status(201).json(savedUser)
//     } catch (error) {
//       res.status(400).json({ message: error.message })
//     }
//   }
// }

module.exports = {
  getUsers,
  getUserById,
  updateUserPoints
  // createUser
}
