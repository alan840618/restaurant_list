const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))
// set template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// set static file
app.use(express.static('public'))
//route setting
// index page
app.use(methodOverride('_method'))
app.use(routes)
app.listen(port,()=>{
    console.log(`Express is listening on localhost:${port}`)
})