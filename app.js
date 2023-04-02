const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',()=>{
    console.log('mongodb error!')
})
db.once('open',()=>{
    console.log('mongodb connected!')
})
app.use(bodyParser.urlencoded({ extended: true }))
// set template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// set static file
app.use(express.static('public'))
//route setting
// index page
app.get('/',(req,res)=>{
    Restaurant.find()
      .lean()
      .then(restaurants => res.render('index',{restaurants}))
      .catch(err => console.log(err))
})
// show page
app.get('/restaurants/:restaurantId', (req, res) => {
    const { restaurantId } = req.params
    Restaurant.findById(restaurantId)
      .lean()
      .then(restaurant => res.render("show", { restaurant }))
      .catch(err => console.log(err))
  })
//search
app.get('/search',(req,res)=>{
    
    const keyword = req.query.keyword //查詢字串
    Restaurant.find()
      .lean()
      .then(restaurants =>{
        const filteredRestaurant = restaurants.filter(data=>{
            return data.name.toLowerCase().includes(keyword.toLowerCase().trim())|| data.category.toLowerCase().includes(keyword.toLowerCase().trim())
        }) 
        res.render('index',{restaurants:filteredRestaurant,keyword:keyword})
      })
      .catch(err => console.log(err))
       
})
//create new restaurant page
app.get('/restaurants/new',(req,res)=>{
    return res.render('new')
})
//create new restaurant
app.post('/restaurants', (req, res) => {
    Restaurant.create(req.body)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
  })
//edit restaurant page
app.get('/restaurants/:restaurantId/edit', (req, res) => {
    const { restaurantId } = req.params
    Restaurant.findById(restaurantId)
      .lean()
      .then(restaurant => res.render("edit", { restaurant }))
      .catch(err => console.log(err))
  })
//edit restaurant
app.post('/restaurants/:restaurantId/edit', (req, res) => {
    const { restaurantId } = req.params
    return Restaurant.findById(restaurantId)
      .then(restaurant=>{
        Object.assign(restaurant, req.body)
        return restaurant.save()
        })
      .then(() => res.redirect(`/restaurants/${restaurantId}`))
      .catch(err => console.log(err))
  })
//delete restaurant
app.post('/restaurants/:restaurantId/delete', (req, res) => {
    const { restaurantId } = req.params
    Restaurant.findByIdAndRemove(restaurantId)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
  })

app.listen(port,()=>{
    console.log(`Express is listening on localhost:${port}`)
})