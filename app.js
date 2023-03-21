const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
// set template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// set static file
app.use(express.static('public'))
//route setting
// index page
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})
// show page
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.filter((restaurant) => {
        return restaurant.id === Number(req.params.restaurant_id)
    })
    res.render('show', { restaurant: restaurant[0] })
})
// search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword //查詢字串
    const filteredRestaurant = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: filteredRestaurant, keyword: keyword })
})
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})