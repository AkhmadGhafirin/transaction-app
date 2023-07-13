'use strict'
const express = require('express')
const transactionRouter = require('./transactionRouter')
const router = express.Router()

router.use('/transactions', transactionRouter)

module.exports = router