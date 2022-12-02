const verifyStatus = (req, res) => {
    req?.cookies?.jwt ? res.sendStatus(201) : res.sendStatus(401)
}

module.exports = { verifyStatus };