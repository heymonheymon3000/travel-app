const fetch = require('node-fetch')
const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(express.static(path.resolve('dist')))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors())

dotenv.config()

const DARK_SKY_URL = "https://api.darksky.net/forecast/";
const PIXABAY_API_URL = "https://pixabay.com/api/?key="+process.env.PIXABAY_API_KEY+"&q="; 

let projectData = {};

app.get('/', function (req, res) {
    res.sendFile(resolve('dist', 'index.html'))
})

app.post('/api/addTrip', function (req, res) {
    projectData['depCity-city'] = req.body.departure.city;
    projectData['depCity-timestamp'] = req.body.departure.timestamp;
    projectData['depCity-lat'] = req.body.departure.lat;
    projectData['depCity-lng'] = req.body.departure.lng;

    projectData['arrCity-city'] = req.body.arrival.city;
    projectData['arrCity-timestamp'] = req.body.arrival.timestamp;
    projectData['arrCity-lat'] = req.body.arrival.lat;
    projectData['arrCity-lng'] = req.body.arrival.lng;

    getWeatherData(DARK_SKY_URL + process.env.DARK_SKY_API_KEY + "/" + req.body.departure.lat + "," + req.body.departure.lng + "," + req.body.departure.timestamp + "?exclude=minutely,hourly,daily,flags")
    .then((departureWeather) => {
        projectData['depCity-summary'] = departureWeather.currently.summary;
        projectData['depCity-icon'] = departureWeather.currently.icon;
        projectData['depCity-temperature'] = departureWeather.currently.temperature;
        return getWeatherData(DARK_SKY_URL + process.env.DARK_SKY_API_KEY + "/" + req.body.arrival.lat + "," + req.body.arrival.lng + "," + req.body.arrival.timestamp + "?exclude=minutely,hourly,daily,flags");
    })
    .then((arrivalWeather) => {
        projectData['arrCity-summary'] = arrivalWeather.currently.summary;
        projectData['arrCity-icon'] = arrivalWeather.currently.icon;
        projectData['arrCity-temperature'] = arrivalWeather.currently.temperature;
        return getLocationView(PIXABAY_API_URL + req.body.departure.city + "&image_type=photo&per_page=3");
    })
    .then((departureView) => {
        projectData['depCity-webformatURL'] = departureView.hits[0].webformatURL;
        return getLocationView(PIXABAY_API_URL + req.body.arrival.city + "&image_type=photo&per_page=3");
    })
    .then((arrivalView) => {
        projectData['arrCity-webformatURL'] = arrivalView.hits[0].webformatURL;
        res.send(projectData);
    })
    .catch((err) => {
        console.log("ERROR");
        console.log(JSON.stringify(err));

    })
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})

const getWeatherData = async (url = '') => {
    const res = await fetch(url);

    if (res.ok) {
        return await res.json();
    } else {
        let error = new Error(res.statusText);
        error.res = res;
        throw error;
    }
}

const getLocationView = async (url = '') => {
    const res = await fetch(url);

    if (res.ok) {
        return await res.json();
    } else {
        let error = new Error(res.statusText);
        error.res = res;
        throw error;
    }
}