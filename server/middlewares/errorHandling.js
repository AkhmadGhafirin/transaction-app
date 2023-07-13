'use strict'

function errorHandling(err, req, res, next) {
    console.log(err)
    let message = 'Internal Server Error'
    let code = 500
    switch (err.name) {
        case 'SequelizeValidationError':
            code = 400
            message = err?.errors[0]?.message
            break;
        case 'SequelizeUniqueConstraintError':
            code = 400
            message = err?.errors[0]?.message
            break;
        case 'NotFound':
            code = 404
            message = 'Data not found'
            break;
        default:
            code = 500
            message = 'Internal Server Error'
            break;
    }
    res.status(code).json({
        statusCode: code,
        error: {
            message
        }
    })
}

module.exports = errorHandling