//module imports
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')
const connectDb = require('./db/config')


//import port
const PORT = process.env.PORT

//instance expess
const app = express()


//declare document folder as static
app.use(express.static('documents'))
app.use(express.static('views'))

//bodyparser middleware for incoming data..
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//middleware
app.use(cors())

//template engine settings
app.set('view engine', 'ejs')
app.set('views', "./views")

//index route
app.get(`/`, async(req, res)=>{
    try {
        // return res.status(StatusCodes.ACCEPTED).json({status : true, msg: `Welcome to fileUpload`})
        return res.render('index.ejs')
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status : false, msg : error})
    }
})

//upload GUI
app.get(`/upload`, async(req, res)=>{
    try {
        // return res.status(StatusCodes.ACCEPTED).json({status : true, msg: `Welcome to fileUpload`})
        return res.render('upload.ejs')
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status : false, msg : error})
    }
})

//api route
app.use(`/api/file`, require('./route/fileRoute'))

//default route
app.all(`**`, async(req, res)=>{
    try {
        return res.status(StatusCodes.NOT_FOUND).json({status : false, msg: 'Requested path not found'})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error})
    }
})

//server listener
app.listen(PORT, () => {
    console.log(`server is running @ http://localhost:${PORT}`)
    connectDb()
})