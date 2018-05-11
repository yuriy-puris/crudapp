const express = require('express')
const router = express.Router()
const User = require('../models/post-model')
const bcrypt = require('bcrypt-nodejs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//create and write to database

router.post('/userinfo', (req, res) => {
  let { firstName, userEmail, password } = req.body

  let userData = {
    firstName,
    userEmail,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(5))
  }

  let newUser = new User(userData)

  newUser.save((err, data) => {
      if(err) {
        console.log('hi it si error')
      } else {
        res.send('signup successful')
      }
    })
  })

//read data in database

router.post('/login', (req, res) => {
  let { firstName, password } = req.body
  User.findOne({ firstName: firstName }, 'firstName userEmail password', (err, userData) => {
    if(!err) {
      let passwordCheck = bcrypt.compareSync(password, userData.password)

      if ( passwordCheck ) {
        req.session.user = {
          firstName: userData.firstName,
          userEmail: userData.userEmail,
          _id: userData._id
        }
        req.session.user.expires = new Date(
          Date.now() + 3 * 24 * 3600 * 1000
        )
        // res.status(200).send({ user: req.session.user })
        res.redirect('login/' + req.session.user._id)
      } else {
        console.log('invaild login')
        res.send(401).send('incorrect password')
      }
    } else {
      console.log('invaild login')
      res.status(401).send('invaild login')
    }
  })
})

router.get('/login/:id', (req, res, next) => {
  let id = req.params.id
  User.findById(id, (err, user) => {
    if(err) {
      console.log(err)
    } else {
      res.send({ user: user })
    }
  })
})

router.get('/userinfo', (req, res) => {
  User.find({}, 'firstName userEmail', (err, users) => {
    if(err) {
      console.log(err)
    } else {
      res.send({ users: users })
    }
  }).sort({ _id: -1})
})

module.exports = router;
