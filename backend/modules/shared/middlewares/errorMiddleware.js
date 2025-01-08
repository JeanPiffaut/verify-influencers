exports.errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err.message || err);

    if (!res.headersSent) {
        res.status(err.status || 500).json({
            error: {
                message: err.message || "Internal Server Error",
                details: err.details || null,
            },
        });
    } else {
        next(err);
    }
};
