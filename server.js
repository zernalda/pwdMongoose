//add database
require('./config/db')

// add database mysql
// require('./config/dbMySql')

// calling library
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// we use express
const app = express()

// db mongose
const router = require('./config/routes')

// db mongose
// const router = require('./config/routesSql')

// define port to 3000 as example to run
app.set('port', 3000)

// logger for every request
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

// set static directory for frontend
app.use(express.static(path.join(__dirname, 'public')))

// enabled parsing posted form
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// add some routing
app.use('/api', router)

const server = app.listen(app.get('port'), () => {
    const port = server.address().port
    console.log('magic happens on port:  ' + port)
})

