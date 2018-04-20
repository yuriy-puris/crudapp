const express = require('express')
const router = express.Router()
const Post = require('../models/post-model')

//create and write to database

router.post('/posts', (req, res) => {

  //create post
  const post = new Post({
    title: req.body.title,
    description: req.body.description
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

router.get('/posts', (req, res) => {
  //model Post and her method find and return method send, sort data
  Post.find({}, 'title description', (err, posts) => {
    if(err) {
      console.log(err)
    } else {
      res.send({ posts: posts })
    }
  }).sort({ _id: -1})
})

module.exports = router;