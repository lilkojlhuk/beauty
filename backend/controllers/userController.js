const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

const registration = async (req, res, next) => {
    try {
        const { email, password, role, first_name, last_name, phone } = req.body

        if (!email || !password || !first_name || !last_name || !phone) {
            return res.json({ message: 'Заповніть обов`язкові поля' })
        }

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return res.json({ message: 'Користувач з таким email вже існує' })
        }

        const hasPassword = await bcrypt.hash(password, 5)

        const user = await User.create({ email, role, password: hasPassword, first_name, last_name, phone })

        const token = generateJWT(user.id, user.email, user.role)

        return res.json({ token })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.json({ message: 'Користувач з таким email не існує' })
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return res.json({ message: 'Невірний пароль' })
        }

        const token = generateJWT(user.id, user.email, user.role)
        return res.json({ token })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

const current = async (req, res, next) => {
    try {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)

        return res.json({ token })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

const getUserRole = (req, res) => {
    try {
        generateJWT(req.user.role)

        const userRole = req.user.role

        return res.json({ userRole })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

module.exports = {
    registration,
    login,
    current,
    getUserRole
}