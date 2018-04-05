const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')
const Absent = mongoose.model('Absent')

module.exports.getAbsent = (req, res) =>
Absent
    .find() 
    .exec((err, result) => {
        console.log(err)
        console.log(result)

        if(err) {
            console.log('error finding absent')
            res
                .status(500)
                .json({message: 'Error finding absent'})
        } else if (result.length == 0 ){
            res
                .status(404)
                .json({message : 'Data not Found'})
            } else{
                console.log(`Found absent: ${result.length}`)
                res
                    .status(200)
                    .json(result)
            }
    })

    module.exports.getAbsentByTotal = (req, res) => {
        const { id } = req.params
        console.log("total absen", id)

        return Absent
        .find({total_absent : id})
        .exec((err, result) =>{
        console.log(err)
        console.log(result)

        if(err){
            console.log('error finding absent')
            res
                .status(500)
                .json({message: 'error finding absent'})
        } else if(result.length == 0){
            res
                .status(404)
                .json({message: 'data employee not found'})
        }else {
            console.log(`found Employee: with total absent ${id}`)
            res
                .status(200)
                .json(result)
        }
        })
    }

