const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
mongoose.Promise = global.Promise

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use(session({
  secret: 'i need more beers',
  resave: false,
  saveUninitialized: false,
  // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
  store: new MongoStore({
    url: 'mongodb://localhost/articles',
  })
}))

app.use(require('./routes/posts'))

mongoose.connect(config.dbURL, config.dbOptions)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

// app.listen(process.env.PORT || config.port,
//   () => console.log(`Server start on port ${config.port} ...`))
