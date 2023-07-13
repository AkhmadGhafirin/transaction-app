'use strict'
const express = require('express')
const TransactionController = require('../controllers/transactionController')
const router = express.Router()

router.get('/', TransactionController.fetchAll)
router.get('/summaries', TransactionController.summary)
router.post('/', TransactionController.create)
router.get('/:id', TransactionController.fetchById)
router.put('/:id', TransactionController.update)
router.delete('/:id', TransactionController.delete)

module.exports = router