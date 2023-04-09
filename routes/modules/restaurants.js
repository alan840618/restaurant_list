const express = require('express')
const router = express.Router()
//引入路由模組
//引入restaurant model
const Restaurant = require('../../models/restaurant')
//定義路由
// show page
router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//create new restaurant
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
//edit restaurant page
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(err => console.log(err))
})
//edit restaurant
router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .then(restaurant => {
      Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})
//delete restaurant
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndRemove(restaurantId)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
//匯出路由器
module.exports = router 