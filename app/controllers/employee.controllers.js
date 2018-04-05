const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

//buat function get employee
module.exports.getEmployee = (req, res) =>
Employee
    .find() 
    .exec((err, result) => {
        console.log(err)
        console.log(result)

        if(err) {
            console.log('error finding employee')
            res
                .status(500)
                .json({message: 'Error finding employee'})
        } else if (result.length == 0 ){
            res
                .status(404)
                .json({message : 'Data not Found'})
            } else{
                console.log(`Found Employee: ${result.length}`)
                res
                    .status(200)
                    .json(result)
            }
    })

    // get employee data by Id
    module.exports.getEmployeeById = (req, res) => {
        const { id } = req.params

        return Employee
        .findById(id) 
        .exec((err, result) => {
        console.log(err)
        console.log(result)

        // filter respond dari server
        // error dari server
        if(err) {
            console.log('error finding employee')
            res
                .status(500)
                .json({message: 'Error finding employee'})
        // data tidak ditemukan
        } else if (result.length == 0 ){
            res
                .status(404)
                .json({message : 'Data Employee not Found'})
                //data ditemukan
            } else{
                console.log(`Found Employee: with ID ${id}`)
                res
                    .status(200)
                    .json(result)
            }
    })

    }

    // insert an employee
    module.exports.addOneEmployee= (req, res) => {
        const {title, name, age, address} = req.body
        console.log(`post new employee`)
        console.log(`trying to add new employee`)

        return Employee
            .create({
                title, name, age, address
            }, (err, result) => {
                if(err){
                    console.log('error creating employee')
                    res
                        .status(500)
                        .json({err})
                }else{
                    console.log(`Employee created ${result}`)
                    res
                        .status(201)
                        .json({
                            message: 'Employee successfully created.',
                            data: result,
                        })
                }
            })
    }

    module.exports.updateOneEmployee= (req, res) => {
        const {id} = req.params
        const {title, name, age, address} = req.body

        Employee
            .findById(id)
            .exec((err, employee) => {
                if (err) {
                    console.log(`error finding employee with id: ${id}`)

                    employee
                        .status(500)
                        .json(err)
                }else if(!employee){
                    console.log('data employee not found')
                    res
                        .status(404)
                        .json({message: 'Data not found'})
                }else{
                    if (title)
                        employee.title = title
                    if (name)
                        employee.name = name
                    if (age)
                        employee.age = age
                    if (address)
                        employee.address = address

                //save to database
                employee
                    .save((err, updateOneEmployee) => {
                        if(err)
                            res
                                .status(500)
                                .json(err)
                        else
                            res
                                .status(201)
                                .json(updateOneEmployee)
                    })
                    
                    
                }
            })
    }

    

    module.exports.deleteEmployeeById = (req, res) => {
        const {id} = req.params
        console.log(`delete user by ID ${id}`)

        return Employee
            .findByIdAndRemove(id)
            .exec((err, result) => {
                if(err)
                    res
                        .status(500)
                        .json(err)
                else
                    res
                        .status(204)
                        .json()
            })
    }

    