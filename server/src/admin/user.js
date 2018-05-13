// const router = require('express').Router()
// const bcrypt = require('bcrypt-nodejs')
// const User = require('../models/post-model')
// const config = require('../config/config')
// const jwt = require('jwt-simple')
//
// router.post('/userinfo', (req, res) => {
//
//   //create post
//   const user = new User({
//     firstName: req.body.firstName,
//     userEmail: req.body.userEmail,
//     password: req.body.password
//   })
//
//   const password = user.password
//
//   bcrypt.hash(password, null, null, function(err, hash) {
//     if (err) { res.sendStatus(500) }
//     else {
//       user.password = hash
//       user.save(function (err) {
//                 if (err) { res.sendStatus(500)}
//                 else {
//                     res.sendStatus(201)
//                 }
//             })
//     }
//   })
//
// })
//
// router.get('/userinfo', function (req, res, next) {
//   console.log(req.headers['x-auth'])
//     if(!req.headers['x-auth']) {
//         return res.sendStatus(401)
//     }
//     try {
//         var auth = jwt.decode(req.headers['x-auth'], config.secretkey)
//     } catch (err) {
//         return res.sendStatus(401)
//     }
//     User.findOne({ firstName: auth.firstName }, function(err, user) {
//         if (err) { return res.sendStatus(500) }
//         else {
//             res.json(user)
//         }
//     })
// })
//
//
// module.exports = router
