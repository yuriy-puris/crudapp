const express = require('express')
const router = express.Router()
const Post = require('../models/post-model')

//create and write to database

router.post('/userinfo', (req, res) => {

  //create post
  const post = new Post({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  //write post to database
  post.save((err, data) => {
      if(err) {
        console.log(err)
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
  Post.find({}, 'firstName lastName', (err, posts) => {
    if(err) {
      console.log(err)
    } else {
      res.send({ posts: posts })
    }
  }).sort({ _id: -1})
})

module.exports = router;
