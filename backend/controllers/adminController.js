const uuid = require('uuid')
const {Room, Booking, Image, Guest, Payment} = require('../models/models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
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
    


}
module.exports = new RoomConroller()