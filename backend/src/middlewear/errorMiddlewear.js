export const errorMiddlewear = (err, req, res, next) => {

    res.status(500).json({
        status: false,
        message: err.message
    })
}