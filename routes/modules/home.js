const express = require('express')
const router = express.Router()
// 引入路由模組
// 引入restaurant model
const Restaurant = require('../../models/restaurant')
// 定義路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})
// 匯出路由器
module.exports = router
