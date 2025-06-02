const uuid = require('uuid')
const {Room, Booking, Image, Guest, Payment, User} = require('../models/models')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const { Mutex } = require('async-mutex');
const mutex = new Mutex();
const sequelize = require('../db')
const { Sequelize, Transaction } = require('sequelize');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        'random_secret_key123',
        {expiresIn: '1h'}
    )
}

class AdminController{

    async request (req, res) {
        let {bookingId} = req.body.params
        let booking =  await Booking.update(
            {confirmed:true},
            {
                where: {
                id: bookingId
                }
            }
        ) 
        return res.json(booking)
    }
   
    async getRequests(req, res){
        const booking = await Booking.findAll({
            where:{
                confirmed:false
            },
            include: [{model: Guest, as: "guest"}, {model: Room, as: "room"}]
        })
        return res.json(booking);  
    }

     async createBooking (req,res) {
        let {checkIn, checkOut, roomId, guestsCollection, name, lastName, phoneNumber, price, isPaid, confirmed} = req.body
        try{
            await Booking.findAll({
            where: {
                    roomId: roomId,
                    [Op.or]: [
                        { [Op.and]: [{ checkIn: { [Op.lte]: checkIn } }, { checkOut: { [Op.gte]: checkIn } }] },
                        { [Op.and]: [{ checkIn: { [Op.lte]: checkOut } }, { checkOut: { [Op.gte]: checkOut } }] },
     
                        { [Op.and]: [{ checkIn: { [Op.lte]: checkIn } }, { checkOut: { [Op.gte]: checkOut } }] },
                        { [Op.and]: [{ checkIn: { [Op.gte]: checkIn } }, { checkOut: { [Op.lte]: checkOut } }] },
                    ],
                },
            }).then( async (data) => {
                if(data.length == 0) {
                    const booking =  await Booking.create({
                        checkIn:checkIn, 
                        checkOut:checkOut, 
                        roomId: roomId,
                        name:name,
                        price:price,
                        isPaid:false,
                        lastName:lastName,
                        phoneNumber:phoneNumber,
                        confirmed: confirmed
                        }).then(async booking => { 
                            if(guestsCollection && booking){
                                guestsCollection.map( async guest => {
                                    console.log(guest, booking.id)
                                    const createsGuest = await Guest.create({
                                        lastname:guest.lastName,
                                        name: guest.name,
                                        bookingId: booking.id
                            })
                            })}
                            return res.json('Запись на бронирование создана, ожидайте звонок менеджера')
                            }
                            
                        )
            }else{
                return res.json('Невозможно заселиться на выбранный период')
            }
        })
    } catch(err){}

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

    async setConfirmed(req, res) {
        let {userId, bookingId} = req.body
        const confirmed = 
            await Booking.update(
                {
                    confirmed: true,
                    userId: userId
                },
                {
                    where: {
                        id: bookingId
                    }
                }
            )
        
        return res.json(confirmed)
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
        // зашифрованный пароль
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPassword})
        // токен авторизации
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }


    async login(req, res, next) {
        const {login, password, role} = req.body
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

    async getAllUsers(req, res){
        const users = await User.findAll()
        return res.json(users)
    }

    async getMe (req,res){
        console.log('getting me...', req.userId)
        try{
            const user  = await User.findOne({ where: { id: req.userId } })
            if(!user) {
                return res.status(400).json({message: "Пользователь не найден"})
            }	
            res.json(user)
        }
        catch(err){
            console.log(err)
            return res.status(400).json({message: "нет доgтупа"})
        }
    }

    async createBooking2 (req,res) {
        let {checkIn, checkOut, roomId, guests, name, lastName, phoneNumber, price, isPaid, confirmed} = req.body
        lock.acquire('resourceKey', async () => {
            const booking = await Booking.findAll({
                where: {
                        roomId: roomId,
                        confirmed: true,
                        [Op.or]: [
                            { [Op.and]: [{ checkIn: { [Op.lte]: checkIn } }, { checkOut: { [Op.gte]: checkIn } }] },
                            { [Op.and]: [{ checkIn: { [Op.lte]: checkOut } }, { checkOut: { [Op.gte]: checkOut } }] },
         
                            { [Op.and]: [{ checkIn: { [Op.lte]: checkIn } }, { checkOut: { [Op.gte]: checkOut } }] },
                            { [Op.and]: [{ checkIn: { [Op.gte]: checkIn } }, { checkOut: { [Op.lte]: checkOut } }] },
                        ],
                    },
                })            
                await processResource();
            return booking;
          }).then( async (data) => {
            if(data.length == 0) {
                const booking =  await Booking.create({
                    checkIn:checkIn, 
                    checkOut:checkOut, 
                    roomId: roomId,
                    name:name,
                    price:price,
                    isPaid:false,
                    lastName:lastName,
                    phoneNumber:phoneNumber,
                    confirmed: confirmed
                    }).then(booking => {   
                        if(guests & booking){guests.map( async guest => {
                        const createsGuest = await Guest.create({
                            lastName:guest.lastName,
                            name: guest.lastName,
                            bookingId: booking.id
                        })
                        })}
                        return res.json('Запись на бронирование создана')}
                        
                    )
                
        }else{
            return res.json('Нельзя заселиться на данный период')
        }
    }).catch((err) => {
        console.log(err)
            res.status(500).send('Error');
          });

    }

}




module.exports = new AdminController()