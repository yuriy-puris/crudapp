// const router = require('express').Router()
// const bcrypt = require('bcrypt-nodejs')
// const User = require('../models/post-model')
// const config = require('../config/config')
// const jwt = require('jwt-simple')
//
//
// router.post('/login', function(req, res) {
//   if(!req.body.firstName || !req.body.password) {
//     return res.sendStatus(400)
//   } else {
//     const firstName = req.body.firstName
//     const password = req.body.password
//     User.findOne({firstName: firstName})
//       .select('password')
//       .exec(function(err, user) {
//         if(err) {
//           return res.sendStatus(500)
//         }
//         if(!user) return res.sendStatus(401)
//         bcrypt.compare(password, user.password, function(err, valid) {
//           if(err) { return res.sendStatus(500) }
//           if(!valid) { return res.sendStatus(401) }
//           const token = jwt.encode({firstName: firstName}, config.secretkey)
//           res.send(token)
//         })
//       })
//   }
// })
//
// module.exports = router
