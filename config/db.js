//database connection 
const mongoose = require('mongoose')

// employee database url
const DB_URL = 'mongodb://localhost:27017/employees'

// connect to database
mongoose.connect(DB_URL)

// event handling on database connection
// es 6
mongoose.connection.on('connect', () => 
    console.log(`Mongoose connected to ${DB_URL}`))

//es <6
mongoose.connection.on('connect', function() {
    console.log('Mongoose connected to' + DB_URL)
})

mongoose.connection.on('error', (err)=>
console.log(`mongoose connection error: ${err}`))

mongoose.connection.on('dissconnect', ()=>
console.log('Mongoose Disconnect'))

const gracefullShutdown = (msg, callback) =>
mongoose.connection.close(() => {
    console.log(`mongoose disconnect trough ${msg}`)
})

// for app termination
process.on('SIGINT', () =>
gracefullShutdown('app termination (SIGINT)', ()=>
process.exit(0)))

//bring your schema and model
require('../app/models/employee.model')
require('../app/models/absent.model')