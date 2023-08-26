const checkConsumerEntry = (req, res, next) => {
    if (!req.body.consumerName || !req.body.consumerName.trim()) {
        return res.status(401).json({
            message: "Please, Consumer name is required"
        })
    }

    if (!req.body.password || !req.body.password.trim()) {
        return res.status(401).json({
            message: "Action: Password is required"
        })
    }

    next()
}

module.exports = {checkConsumerEntry}