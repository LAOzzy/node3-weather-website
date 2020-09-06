const path = require('path')
const express = require('express')
const hbs = require('hbs', )
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const {
    dirname
} = require('path')
const {
    response
} = require('express')


console.log(__dirname)
console.log(path.join(__dirname, '../src'))


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath) //set the views path for handlebar
app.set('view engine', 'hbs') //Set view engine to hbs. "view engine" is a key
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andy Osland'
    }) //Render gets the handlebars file and renders it
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andy Osland'
    }) //Render gets the handlebars file and renders it
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        name: 'Andy Osland'
    }) //Render gets the handlebars file and renders it
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please supply an address!'
        })
    }

    geocode(req.query.address,(error, {latitude=0, longitude=0, location='Somewhere'} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        console.log(req.query.address)
        forecast(latitude, longitude,(error, {current_temp,feels_like_temp,description}) => {
            res.send({
                location: location,
                current_temp:current_temp,
                feels_like_temp: feels_like_temp,
                description: description
            })
        })
        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ //Return makes sure the function exits instead of continuing on to do another send.
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Help', {
        title: '404: Help page not found',
        name: 'Andy Osland'
    }) //Render gets the handlebars file and renders it
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page not found',
        name: 'Andy Osland'
    }) //Render gets the handlebars file and renders it
})

app.listen(port, () => {
    //runs while the server runs
    console.log('Server is up on port ' + port)
})