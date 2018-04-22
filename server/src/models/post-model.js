const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  firstName: {
    type: String,
    unique: true
  },
  lastName: {
    type: String
  }
})
const PostModel = mongoose.model('userinfo', PostSchema)
module.exports = PostModel
