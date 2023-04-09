const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const Restaurant = require('../models/restaurant')
//引入路由模組
router.use('/',home)
router.use('/restaurants',restaurants)
//search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword //查詢字串
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurant = restaurants.filter(data => {
        return data.name.toLowerCase().includes(keyword.toLowerCase().trim()) || data.category.toLowerCase().includes(keyword.toLowerCase().trim())
      })
      res.render('index', { restaurants: filteredRestaurant, keyword: keyword })
    })
    .catch(err => console.log(err))
})
//create new restaurant page
router.get('/new', (req, res) => {
  return res.render('new')
})
//匯出路由器
module.exports = router 