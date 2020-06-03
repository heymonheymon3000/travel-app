const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const fetch = require('node-fetch');

app.use(express.static(path.resolve('dist')))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors())

dotenv.config()

const DARK_SKY_URL = "https://api.darksky.net/forecast/"
const PIXABAY_API_URL = "https://pixabay.com/api/?key="+process.env.PIXABAY_API_KEY+"&q="

let projectData = {}

app.get('/', function (req, res) {
    res.sendFile(resolve('dist', 'index.html'))
})

app.post('/api/addTrip', function (req, res) {
    fetchData(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})

const fetchData = async (req) => {
    const departureWeather = await fetch(DARK_SKY_URL + process.env.DARK_SKY_API_KEY + "/" + req.body.departure.lat + "," + req.body.departure.lng + "," + (Date.parse(req.body.departure.date)/1000) + "?exclude=minutely,hourly,daily,flags")
    const departureView = await fetch(PIXABAY_API_URL + req.body.departure.city + "&image_type=photo&per_page=3")
    const arrivalWeather = await fetch(DARK_SKY_URL + process.env.DARK_SKY_API_KEY + "/" + req.body.arrival.lat + "," + req.body.arrival.lng + "," + (Date.parse(req.body.arrival.date)/1000) + "?exclude=minutely,hourly,daily,flags")
    const arrivalView =  await fetch(PIXABAY_API_URL + req.body.arrival.city + "&image_type=photo&per_page=3")

    return Promise.all([departureWeather.json(), departureView.json(), arrivalWeather.json(), arrivalView.json()])
    .then((results) => {
        projectData['depCity-city'] = req.body.departure.city
        projectData['depCity-date'] = new Date(req.body.departure.date+" ").toDateString()
        projectData['depCity-lat'] = req.body.departure.lat
        projectData['depCity-lng'] = req.body.departure.lng
        projectData['depCity-summary'] = results[0].currently.summary
        projectData['depCity-icon'] = results[0].currently.icon
        projectData['depCity-temperature'] = results[0].currently.temperature
        projectData['depCity-webformatURL'] = results[1].hits[0].webformatURL
        projectData['arrCity-city'] = req.body.arrival.city
        projectData['arrCity-date'] = new Date(req.body.arrival.date+" ").toDateString()
        projectData['arrCity-lat'] = req.body.arrival.lat
        projectData['arrCity-lng'] = req.body.arrival.lng
        projectData['arrCity-summary'] = results[2].currently.summary
        projectData['arrCity-icon'] = results[2].currently.icon
        projectData['arrCity-temperature'] = results[2].currently.temperature
        projectData['arrCity-webformatURL'] = results[3].hits[0].webformatURL
        return projectData
    })
    .catch((err) => {
        throw err
    })
}