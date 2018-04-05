const express = require('express')
const router = express.Router()

// controller
const ctrlAbsent = require('../app/controllers/absent.controllers')
const ctrlEmployee = require('../app/controllers/employee.controllers')

//routing 
router
    .route('/employee')
    .get( ctrlEmployee.getEmployee)
    .post( ctrlEmployee.addOneEmployee)
    

router
    .route('/employee/:id')
    .get(ctrlEmployee.getEmployeeById)
    .put(ctrlEmployee.updateOneEmployee)
    .delete(ctrlEmployee.deleteEmployeeById)

router 
    .route('/absent')
    .get( ctrlAbsent.getAbsent)

router
    .route('/absent/:id')
    .get(ctrlAbsent.getAbsentByTotal)

module.exports = router