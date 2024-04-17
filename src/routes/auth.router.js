const authService = require('../controllers/auth.controller')
const authRouter = require('express').Router()

authRouter.post('/login', authService.login)
authRouter.post('/signup', authService.signup)
authRouter.post('/logout', authService.logout)

module.exports = authRouter
