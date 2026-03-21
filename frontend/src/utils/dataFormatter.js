export const formatDepartmentDistribution = (employees) => {
  const departmentCount = {}
  
  employees.forEach(emp => {
    const dept = emp.department
    if (!departmentCount[dept]) {
      departmentCount[dept] = 0
    }
    departmentCount[dept] += 1
  })
  
  return Object.keys(departmentCount).map(dept => ({
    name: dept,
    value: departmentCount[dept]
  }))
}

export const formatPositionSalaryStats = (employees) => {
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
  
  return Object.keys(positionSalaries).map(position => ({
    name: position,
    value: Math.round(positionSalaries[position].total / positionSalaries[position].count)
  })).sort((a, b) => b.value - a.value)
}

export const formatGenderDistribution = (employees) => {
  const genderCount = { '男': 0, '女': 0 }
  
  employees.forEach(emp => {
    if (genderCount[emp.gender] !== undefined) {
      genderCount[emp.gender] += 1
    }
  })
  
  return Object.keys(genderCount).map(gender => ({
    name: gender,
    value: genderCount[gender]
  }))
}

export const formatStatusDistribution = (employees) => {
  const statusCount = { '在职': 0, '离职': 0 }
  
  employees.forEach(emp => {
    if (statusCount[emp.status] !== undefined) {
      statusCount[emp.status] += 1
    }
  })
  
  return Object.keys(statusCount).map(status => ({
    name: status,
    value: statusCount[status]
  }))
}

export const formatHireDateDistribution = (employees) => {
  const yearCount = {}
  
  employees.forEach(emp => {
    if (emp.hireDate) {
      const year = emp.hireDate.substring(0, 4)
      if (!yearCount[year]) {
        yearCount[year] = 0
      }
      yearCount[year] += 1
    }
  })
  
  return Object.keys(yearCount).sort().map(year => ({
    name: year,
    value: yearCount[year]
  }))
}

export const formatSalaryRangeDistribution = (employees, ranges = [
  { min: 0, max: 5000, label: '5k以下' },
  { min: 5000, max: 10000, label: '5k-10k' },
  { min: 10000, max: 15000, label: '10k-15k' },
  { min: 15000, max: 20000, label: '15k-20k' },
  { min: 20000, max: Infinity, label: '20k以上' }
]) => {
  const rangeCount = {}
  
  ranges.forEach(range => {
    rangeCount[range.label] = 0
  })
  
  employees.forEach(emp => {
    const salary = parseFloat(emp.salary)
    ranges.forEach(range => {
      if (salary >= range.min && salary < range.max) {
        rangeCount[range.label] += 1
      }
    })
  })
  
  return ranges.map(range => ({
    name: range.label,
    value: rangeCount[range.label]
  }))
}

export const formatPieChartData = (data, colors = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'
]) => {
  return data.map((item, index) => ({
    ...item,
    itemStyle: {
      color: colors[index % colors.length]
    }
  }))
}

export const formatBarChartData = (data, color = '#5470c6') => {
  return data.map(item => ({
    ...item,
    itemStyle: {
      color: color,
      borderRadius: [4, 4, 0, 0]
    }
  }))
}

export const calculateStatistics = (employees) => {
  if (employees.length === 0) {
    return {
      total: 0,
      averageSalary: 0,
      maxSalary: 0,
      minSalary: 0,
      salaryRange: 0
    }
  }
  
  const salaries = employees.map(emp => parseFloat(emp.salary))
  const total = salaries.reduce((sum, salary) => sum + salary, 0)
  const averageSalary = Math.round(total / salaries.length)
  const maxSalary = Math.max(...salaries)
  const minSalary = Math.min(...salaries)
  
  return {
    total: employees.length,
    averageSalary,
    maxSalary,
    minSalary,
    salaryRange: maxSalary - minSalary
  }
}

export const filterEmployeesByStatus = (employees, status = '在职') => {
  return employees.filter(emp => emp.status === status)
}

export const groupEmployeesByField = (employees, field) => {
  const grouped = {}
  
  employees.forEach(emp => {
    const key = emp[field]
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(emp)
  })
  
  return grouped
}
