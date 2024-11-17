const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
        },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guest_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    bed_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bedroom_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    benefits:{
        type: DataTypes.STRING,
    },
    meel:{
        type: DataTypes.STRING
    },
    info:{
        type: DataTypes.STRING
    }
})

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    image: {type: DataTypes.STRING, 
    },    
})


const Guest = sequelize.define('guest', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {type: DataTypes.STRING, 
    },
    lastname: {type: DataTypes.STRING

    }    
})


const Booking = sequelize.define('booking', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
        },
    checkIn: {
        type: DataTypes.DATEONLY
    },
    checkOut: {
        type: DataTypes.DATEONLY
    },
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.DOUBLE
    },
    IsPaid: {
        type: DataTypes.BOOLEAN
    }
})

const Payment = sequelize.define('payment', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },

})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING
    },
    login: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
})

Booking.hasOne(Payment, {as:'booking'})
Payment.belongsTo(Booking)

User.hasMany(Payment, {as: 'payment'})
Payment.belongsTo(User)

Room.hasMany(Image, {as: 'image'})
Image.belongsTo(Room)

Booking.hasMany(Guest, {as: 'guest'})
Guest.belongsTo(Booking)

Room.hasMany(Booking, {as:'booking'})
Booking.belongsTo(Room)

module.exports = {
    Room,
    Image,
    User,
    Booking,
    Payment,
    Guest,
}