const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  const { username, email, password, points } = req.body
  const defaultPoints = 500
  const userExist = await User.findOne({ email })
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  } else if (userExist) {
    return res.status(400).json({ error: 'Email already exists' }).end()
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
      username,
      email,
      passwordHash
    })
    if (points === undefined) {
      newUser.points = defaultPoints
    } else {
      newUser.points = points
    }

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  } else {
    const user = await User.findOne({ email })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
      return res.status(404).json({ error: 'User not found' })
    } else {
      const userForToken = {
        email: user.email,
        id: user._id
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      res.status(200).send({ token, email: user.email, username: user.username, id: user._id })
    }
  }
}

const logout = (req, res) => {
}

module.exports = {
  login,
  signup,
  logout
}
