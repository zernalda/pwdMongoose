const mongoose = require('mongoose')

const absentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    total_absent: {
        type: String,
        required: true
    }
})

mongoose.model('Absent', absentSchema, 'absent')