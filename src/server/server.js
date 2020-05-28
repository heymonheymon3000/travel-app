const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

const app = express()
app.use(express.static(path.resolve('dist')))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist', 'index.html'))
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})