const notFound = (req, res, next)=> {
    const err = new Error (`Resource not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
}

const errorHandler  = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500: res.statusCode;
    let message = err.message;
    if(err.name === 'CastError' && err.kind == 'ObjectId') {
        message = 'Resource not Found';
        statusCode = '404';
    }
    return res.status(statusCode).json({message, stack: process.env.NODE_ENV === 'production' ? null: err.stack});
}

module.exports = {notFound, errorHandler};