const express = require('express')
const router = express.Router()
const User = require('../models/post-model')
const bcrypt = require('bcrypt-nodejs')

//create and write to database

router.post('/userinfo', (req, res) => {
  let { firstName, userEmail, password } = req.body

  let userData = {
    firstName,
    userEmail,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(5))
  }

  let newUser = new User(userData)

  // newUser.save().then(error => {
  //   if(!error) {
  //       return res.status(201).json('signup successful')
  //   } else {
  //     if( error.code === 11000 ) {
  //       return res.status(409).send('user already exist!')
  //     } else {
  //       console.log(JSON.stringify(error, null, 2))
  //       return res.send(500).send('error signup user')
  //     }
  //   }
  // })

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
        console.log('You are logged in')
        res.status(200).send('You are logged in')
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

  router.get('/userinfo', (req, res) => {
    //model Post and her method find and return method send, sort data
    User.find({}, 'firstName userEmail', (err, users) => {
      if(err) {
        console.log(err)
      } else {
        res.send({ users: users })
      }
    }).sort({ _id: -1})
  })

module.exports = router;
