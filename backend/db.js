const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'kursach2',
    'postgres',
    'gon81926',{
        dialect:'postgres',
        host:'localhost',
        port:'5432'
    }
)