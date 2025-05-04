const {Sequelize} = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize(
    process.env.DB_NAME_SWEB,
    process.env.DB_USER_SWEB,
    process.env.DB_PASSWORD_SWEB,{
        dialect:'postgres',
        host : 'pg4.sweb.ru',
        port: process.env.DB_PORT_SWEB
    }
)