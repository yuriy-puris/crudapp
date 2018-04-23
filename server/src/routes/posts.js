const express = require('express')
const router = express.Router()
const User = require('../models/post-model')

//create and write to database

router.post('/userinfo', (req, res) => {
  //create post
  const post = new User({
    firstName: req.body.firstName,
    userEmail: req.body.userEmail,
    password: req.body.password
  })

  //write post to database
  post.save((err, data) => {
      if(err) {
        console.log('hi it si error')
      } else {
        res.send({
          success: true,
          message: `Post with ID_${data._id} saved successfully!`
        })
      }
  })
})

//read data in database

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
