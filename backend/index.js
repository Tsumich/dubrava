const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/routes')
const path = require('path')
const https = require("https");
const fs = require("fs");
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors())
//app.use(cors({ origin: 'https://dubrava-tb2h.vercel.app' }));
app.use('/api', router)


const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(9000, () => console.log('Server listen 9000 port'))
    }catch(err){
        console.log(err)
    }
    // await sequelize.authenticate()
    //  await sequelize.sync()
    // https.createServer(options, app)
    //     .listen(9000, function (req, res) {
    //         console.log("Server started at port 9000");
    // });
}
start()