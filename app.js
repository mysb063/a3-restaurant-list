const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurants.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/',(req, res) => {
    res.render('index', {restaurants: restaurants.results})
})

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.results.filter(restaurant => {
        return restaurant.id == req.params.id
    })
    res.render('show', {restaurant: restaurant[0]})
})

app.get('/search',(req, res) => {
    const searchResults = restaurants.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(req.query.keyword.toLocaleLowerCase())
    })  
    res.render('index', {searchResults, keyword: req.query.keyword})
})

app.listen(port, () => {
    console.log(`server from http://localhost:${port}`)
})