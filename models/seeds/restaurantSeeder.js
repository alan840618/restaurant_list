const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results


db.once('open',()=>{
    console.log('mongodb connected!')
    Restaurant.create(restaurantList)
      .then(()=>{
        console.log('restaurantSeeder done!')
      })
      .catch(err=>console.log(err))
})