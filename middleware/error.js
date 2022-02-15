const ErrorResponse = require("../Utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err};
    error.message = err.message;
    // Log to console for dev
    console.log(err);

    // Mongoose bad ObjectId
    if(err.message === 'CastError') {
        const message = 'Bootcamp not found with id of '+ err.value;
        error = new ErrorResponse(message, 404);
    }

    if(err.code === 11000) {
        const message = `Duplicate field enetered for ${err.keyValue.name}`;
        error = new ErrorResponse(message, 400);
    }
    // Mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};
module.exports = errorHandler;