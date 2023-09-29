const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: { type: DataTypes.STRING, },
        last_name: { type: DataTypes.STRING, },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
    },
    { timestamps: true },
)

const Records = sequelize.define('records',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        status: { type: DataTypes.STRING, defaultValue: "" },
        record_when: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
    },
    { timestamps: true },
)

User.hasOne(Records)
Records.belongsTo(User)

module.exports = {
    User,
    Records
}