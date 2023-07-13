'use strict'

const { Transaction, Status, Sequelize } = require('../models')

class TransactionController {
    static async summary(req, res, next) {
        try {
            const transactions = await Transaction.findAll({
                attributes: [
                    [Sequelize.fn('date_part', 'year', Sequelize.col('transactionDate')), 'year'],
                    [Sequelize.fn('date_part', 'month', Sequelize.col('transactionDate')), 'month'],
                    [Sequelize.fn('count', Sequelize.col('*')), 'count']
                ],
                group: [
                    Sequelize.fn('date_part', 'year', Sequelize.col('transactionDate')),
                    Sequelize.fn('date_part', 'month', Sequelize.col('transactionDate')),
                ],
                raw: true
            })
            res.status(200).json({
                statusCode: 200,
                data: transactions
            })
        } catch (err) {
            next(err)
        }
    }

    static async fetchAll(req, res, next) {
        try {
            const { year, month } = req.query

            const options = {
                include: [
                    {
                        model: Status
                    }
                ]
            }

            if (year && month) {
                options.where = {
                    [Sequelize.Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date_part', 'year', Sequelize.col('transactionDate')),
                            year
                        ),
                        Sequelize.where(
                            Sequelize.fn('date_part', 'month', Sequelize.col('transactionDate')),
                            month
                        )
                    ]
                }
            } else {
                if (year) {
                    options.where = {
                        transactionDate: Sequelize.where(
                            Sequelize.fn('date_part', 'year', Sequelize.col('transactionDate')),
                            year
                        )
                    }
                }

                if (month) {
                    options.where = {
                        transactionDate: Sequelize.where(
                            Sequelize.fn('date_part', 'month', Sequelize.col('transactionDate')),
                            month
                        )
                    }
                }
            }

            const transactions = await Transaction.findAll(options)
            res.status(200).json({
                statusCode: 200,
                data: transactions
            })
        } catch (err) {
            next(err)
        }
    }

    static async fetchById(req, res, next) {
        try {
            const { id } = req.params
            const transaction = await Transaction.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Status
                    }
                ]
            })

            if (!transaction) throw { name: 'NotFound' }

            res.status(200).json({
                statusCode: 200,
                data: transaction
            })
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const { productID, productName, amount, customerName, createBy } = req.body
            await Transaction.create({
                productID, productName, amount, customerName, createBy, status: 0, transactionDate: new Date(), createOn: new Date()
            })

            res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'Successfully create new transaction'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { productID, productName, amount, customerName, status } = req.body

            const findTransaction = await Transaction.findOne({ where: { id } })

            if (!findTransaction) throw { name: 'NotFound' }

            await Transaction.update(
                { productID, productName, amount, customerName, status },
                { where: { id } }
            )

            res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'Successfully update transaction'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const findTransaction = await Transaction.findOne({ where: { id } })

            if (!findTransaction) throw { name: 'NotFound' }

            await Transaction.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'Successfully delete transaction'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TransactionController