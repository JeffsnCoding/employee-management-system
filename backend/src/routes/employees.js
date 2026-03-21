const express = require('express')
const router = express.Router()
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getStatistics,
  getDepartmentDistribution,
  getPositionSalaryStats
} = require('../controllers/employeeController')

router.get('/stats', getStatistics)
router.get('/department-distribution', getDepartmentDistribution)
router.get('/position-salary-stats', getPositionSalaryStats)
router.get('/', getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router
