const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

        if (!token) {
            return res.json({ message: 'Користувач не авторизований' })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded
        req.userId = decoded.id

        next()

    } catch (e) {
        return res.json({ message: 'Невідома помилка' })
    }
}
