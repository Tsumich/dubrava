const uuid = require('uuid')
const {Room, Booking, Image, Guest, Payment} = require('../models/models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
class RoomConroller{

    async getAllRooms(req, res){
        console.log('geting rooms...')
        const rooms = await Room.findAll({include: [{model: Image, as: "image"}]})
        return res.json(rooms);
    }

    async booking(req, res){
        console.log('getings bookings...')
        let {start, end} = req.query
        console.log(start, end)
        let booking
        if(start && end){
            booking = await Booking.findAll({
                where: {
                    [Op.or]: [
                        { [Op.and]: [{ checkIn: { [Op.lte]: start } }, { checkOut: { [Op.gte]: start } }] },
                        { [Op.and]: [{ checkIn: { [Op.lte]: end } }, { checkOut: { [Op.gte]: end } }] },
          
                        { [Op.and]: [{ checkIn: { [Op.lte]: start } }, { checkOut: { [Op.gte]: end } }] },
                        { [Op.and]: [{ checkIn: { [Op.gte]: start } }, { checkOut: { [Op.lte]: end } }] },
                    ],
                  },
            })
        }else{
            booking = await Booking.findAll({include: [{model: Guest, as: "guest"}, {model: Room, as: "room"}]})

        }
        return res.json(booking);
    }


    async search(req, res){
       try {
        let {checkIn, checkOut, roomsId} = req.body
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        console.log(roomsId)

        const booking =  await Booking.findAll({
            attributes:  ['roomId'],
            where: {
                  roomId: {
                    [Op.in]: roomsId},
                    [Op.or]: [
                        { [Op.and]: [{ checkIn: { [Op.lte]: checkInDate } }, { checkOut: { [Op.gte]: checkInDate } }] },
                        { [Op.and]: [{ checkIn: { [Op.lte]: checkOutDate } }, { checkOut: { [Op.gte]: checkOutDate } }] },
        
                        { [Op.and]: [{ checkIn: { [Op.lte]: checkInDate } }, { checkOut: { [Op.gte]: checkOutDate } }] },
                        { [Op.and]: [{ checkIn: { [Op.gte]: checkInDate } }, { checkOut: { [Op.lte]: checkOutDate } }] },
                    ],
                },
        })
        console.log(booking)
         return  res.json(booking)  
    }catch(e){console.log(e)}          
    }
 
}
module.exports = new RoomConroller()