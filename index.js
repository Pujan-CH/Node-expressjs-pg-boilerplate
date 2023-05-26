// Declare all requried packages
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const cors = require('cors')

// Get reference to Multer and Express
const upload = multer()
const app = express()

const env = require('./Config/env')
const UserMgmtRouters = require('./Routes/UserMgmtUri')
const { verifyJwtToken } = require('./Utils/UserAuthUtilities')
const { logger } = require('./Config/logger')
const db = require('./Config/db_connect')

// Set View to the View folder
app.set('view engine', 'ejs')
app.set('views', './View/dist')

logger.info('index page reloaded...!!!')

// Set Routes to standard stuff
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())
app.use(cookieParser())

app.use(express.static('Static'))

// cors
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200
  })
)

// HomePage

app.get('/', function (req, res) {
  logger.info('hello')
  res.send('Hello There !!!')
})

// Apply Authentication Middleware Here

app.use(UserMgmtRouters)

// Create a Server and add a listener
http.createServer(app)
logger.info({ message: 'Server Started SuccessFully' })
app.listen(env.port)
