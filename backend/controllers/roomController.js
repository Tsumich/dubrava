const uuid = require('uuid')
const {Room, Booking, Image, Guest, Payment} = require('../models/models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
const moment = require("moment");
const { checkAuth } = require('./checkAuth');
const multer = require('multer');

class RoomConroller{

    async getAllRooms(req, res){
        console.log('geting rooms...')
        const rooms = await Room.findAll({include: [{model: Image, as: "image"}]})
        return res.json(rooms);
    }

    async booking(req, res){
        console.log('getings bookings...')
        let {start, end} = req.query
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
            booking = await Booking.findAll({
                where: {confirmed: true},
                include: [{model: Guest, as: "guest"}, {model: Room, as: "room"}]})

        }
        return res.json(booking);
    }


    async search(req, res){
       try {
        let {checkIn, checkOut, roomsId} = req.body
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

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

    async getEndingBooking(req, res){
        try {
        const daysForCheck = 7;
        const now = moment().format("YYYY-MM-DD")
        const startDate = moment().add(daysForCheck, "days").format("YYYY-MM-DD");
         const booking =  await Booking.findAll({
             where: {
                    [Op.and]: [
                        {confirmed: true},
                        {checkOut: { [Op.gte]: now }},
                        {checkOut: { [Op.lte]: startDate}}
                    ]
                 },
                 include: [{model: Guest, as: "guest"}, {model: Room, as: "room"}]
         })
         //{include: [{model: Guest, as: "guest"}, {model: Room, as: "room"}]}
         console.log(booking)
          return  res.json(booking)  
     }catch(e){console.log(e)}          
     }
 
     async setPrice(req, res){
        let {id, price} = req.body
        console.log(id, price)
        const newPrice = await Room.update( { price: price, }, { where: { id: id, }, } )
        return  res.json(newPrice)  
    }

    async editImageInfo(req, res){
        let {imageId, imageTitle, imageInfo} = req.body
        await Image.update( { 
            title: imageTitle,
            info: imageInfo
        }, { where: { id: imageId, }, } )
    }

    async changeRoomImageName (req, res){
    let {oldName, newName} = req.body
    console.log(req.body)
    const imageData =  await Image.update( { 
            image: newName,
        }, { where: { image: oldName, }, } )
        return  res.json(imageData)  
    }
    
}
module.exports = new RoomConroller()