const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./../utils/geocode')
const forecast = require('./../utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// render index view
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jim Carroll'
  })
})

// render about view
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Jim Carroll'
  })
})

// render help view
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Jim Carroll',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
})

// weather page
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404 Page',
    msg: 'Help article not found'
  })
})

// 404 page
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    msg: 'Page not found'
  })
})

// run the server
app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
