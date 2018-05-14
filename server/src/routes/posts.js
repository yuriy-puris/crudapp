const express = require('express')
const router = express.Router()
const User = require('../models/post-model')
const bcrypt = require('bcrypt-nodejs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID
//create and write to database

let sess

router.post('/userinfo', (req, res) => {
  let { firstName, userEmail, password, tasks } = req.body

  let userData = {
    firstName,
    userEmail,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(5)),
  }

  let newUser = new User(userData)

  newUser.save((err, data) => {
      if(err) {
        console.log('hi it si error')
      } else {
        console.log('signup succesfully')
        sess = newUser
        res.redirect('/')
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
        sess = req.session.user
        res.redirect('/')
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


router.get('/', (req, res) => {
  let sess_user_id = sess._id
  console.log(sess)
  User.findById(sess_user_id, (err, user) => {
    if(err) {
      console.log(err)
    } else {
      res.send(user)
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
