const Employee = require('../models/Employee')
const { Op } = require('sequelize')

const getAllEmployees = async (req, res) => {
  try {
    const { search, department } = req.query
    let where = {}
    
    if (search) {
      where = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { employeeId: { [Op.like]: `%${search}%` } }
        ]
      }
    }
    
    if (department) {
      where.department = { [Op.like]: `%${department}%` }
    }
    
    const employees = await Employee.findAll({ where })
    res.json(employees)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id)
    if (!employee) {
      return res.status(404).json({ error: '员工不存在' })
    }
    res.json(employee)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id)
    if (!employee) {
      return res.status(404).json({ error: '员工不存在' })
    }
    await employee.update(req.body)
    res.json(employee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id)
    if (!employee) {
      return res.status(404).json({ error: '员工不存在' })
    }
    await employee.destroy()
    res.json({ message: '删除成功' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getStatistics = async (req, res) => {
  try {
    const total = await Employee.count()
    const active = await Employee.count({ where: { status: '在职' } })
    const inactive = await Employee.count({ where: { status: '离职' } })
    
    const currentMonth = new Date().toISOString().slice(0, 7)
    const newHires = await Employee.count({
      where: {
        hireDate: {
          [Op.gte]: `${currentMonth}-01`
        }
      }
    })
    
    res.json({
      total,
      active,
      inactive,
      newHires,
      pending: 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getDepartmentDistribution = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ['department'],
      where: { status: '在职' }
    })
    
    const departmentCount = {}
    employees.forEach(emp => {
      const dept = emp.department
      departmentCount[dept] = (departmentCount[dept] || 0) + 1
    })
    
    const data = Object.keys(departmentCount).map(dept => ({
      name: dept,
      value: departmentCount[dept]
    }))
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPositionSalaryStats = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ['position', 'salary'],
      where: { status: '在职' }
    })
    
    const positionSalaries = {}
    employees.forEach(emp => {
      const position = emp.position
      const salary = parseFloat(emp.salary)
      if (!positionSalaries[position]) {
        positionSalaries[position] = { total: 0, count: 0 }
      }
      positionSalaries[position].total += salary
      positionSalaries[position].count += 1
    })
    
    const data = Object.keys(positionSalaries).map(position => ({
      name: position,
      value: Math.round(positionSalaries[position].total / positionSalaries[position].count)
    })).sort((a, b) => b.value - a.value)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getStatistics,
  getDepartmentDistribution,
  getPositionSalaryStats
}
