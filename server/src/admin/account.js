// const router = require('express').Router()
// const User = require('../models/post-model')
// const config = require('../config/config')
// const jwt = require('jwt-simple')
//
// router.get('/account', function(req, res, next) {
//     if (!req.headers['x-auth']) { return res.sendStatus(401)}
//     try {
//         const firstName = jwt.decode(req.headers['x-auth'], config.secretkey).firstName
//     } catch(err) {
//         return res.sendStatus(401)
//     }
//     User.findOne({ firstName: firstName }, function(err, user) {
//         if (err) {
//             return res.sendStatus(500)
//         } // ошибка БД, возвращаем 500 - Internal Server Error
//         if (!user) {
//             return res.sendStatus(401)
//             // пользователя нет в БД, возвращаем 401 - Unauthorized
//         }
//         res.json(user) // если всё в порядке, возвращаем JSON с user
//     })
// })
//
// module.exports = router
