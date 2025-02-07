const uuid = require('uuid')
const {Room, Booking, Image, Guest, Payment, User} = require('../models/models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        'random_secret_key123',
        {expiresIn: '24h'}
    )
}

class RoomConroller{
    async createBooking (req,res) {
        let {checkIn, checkOut, roomId, guests, name, lastName, phoneNumber} = req.body
        console.log(checkIn)
        const booking = await Booking.create({
            checkIn:checkIn, 
            checkOut:checkOut, 
            roomId: roomId,
            name:name,
            lastName:lastName,
            phoneNumber:phoneNumber
            }).then(booking =>
           { if(guests){guests.map(async guest => {
                    const createsGuest = await Guest.create({
                        lastName:guest.lastName,
                        name: guest.lastName,
                        bookingId: booking.id
                    })
                })}}
            )
        return res.json(booking)
    }

    async createPayment (req, res) {
        let {userId, bookingId} = req.body
        const payment = await Payment.create({
            userId: userId,
            bookingId: bookingId
        }).then(
            await Booking.update(
                {IsPaid: true},
                {
                    where: {
                    id: bookingId
                    }
                }
            )
        )
        return res.json(payment)
    }
    
    async registration (req, res){
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный login или password'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return res.json("Пользователь с таким логином уже существует")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }


    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return res.json('Пользователь не найден')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.json('неверный пароль')
        }
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token, login, role})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

}
module.exports = new RoomConroller()