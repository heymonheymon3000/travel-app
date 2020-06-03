const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(express.static(path.resolve('dist')))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors())

let tripData = [];

app.get('/', function (req, res) {
    res.sendFile(resolve('dist', 'index.html'))
})

app.post('/api/addTrip', function (req, res) {
    tripData.push(req.body);
    res.status(200).send(req.body);
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})