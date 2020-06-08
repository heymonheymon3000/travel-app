const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const { v4: uuidv4 } = require('uuid'); 
const _ = require('lodash');

app.use(express.static(path.resolve('dist')))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors())

// local cache to store multiple trips
let tripData = [];

app.get('/', function (req, res) {
    res.status(200).sendFile(resolve('dist', 'index.html'))
})

app.post('/api/addTrip', function (req, res) {
    tripData.push(_.merge(req.body, {id: uuidv4()}));
    res.status(200).send(req.body);
})

app.get('/api/allTrips', function (req, res) {
    res.status(200).send(tripData);
})

app.delete('/api/removeTrip/:id', function (req, res) {
    tripData = tripData.filter((trip) => (trip.id !== req.params.id))
    res.sendStatus(200);
})

module.exports = app