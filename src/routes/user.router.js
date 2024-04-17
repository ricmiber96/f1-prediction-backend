const userService = require('../controllers/user.controller')
const userRouter = require('express').Router()

userRouter.get('/', userService.getUsers)
userRouter.get('/:id', userService.getUserById)
userRouter.put('/points', userService.updateUserPoints)

module.exports = userRouter
