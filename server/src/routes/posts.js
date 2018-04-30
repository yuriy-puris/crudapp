const express = require('express')
const router = express.Router()
const User = require('../models/post-model')
const bcrypt = require('bcrypt-nodejs')

let sessionUser

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
        let id = sessionUser._id
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
        sessionUser = req.session.user
        req.session.user.expires = new Date(
          Date.now() + 3 * 24 * 3600 * 1000
        )
        console.log('You are logged in', req.session.user)
        res.status(200).send({ user: req.session.user })
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

router.get('/login', (req, res, next) => {
  let id = sessionUser._id
  User.findById(id, (err, doc) => {
    res.send(doc)
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
