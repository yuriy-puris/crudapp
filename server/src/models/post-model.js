const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  password: {
    type: String,
  },
  tasks: Array
})

const UserModel = mongoose.model('userinfo', UserSchema)
module.exports = UserModel
