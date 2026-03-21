# 数据格式化函数使用说明

本文件包含了一系列用于将员工数据转换为图表所需格式的工具函数。

## 函数列表

### 1. formatDepartmentDistribution(employees)
将员工数据转换为部门分布数据格式，用于饼图。

**参数:**
- `employees`: 员工数据数组

**返回值:**
```javascript
[
  { name: '技术部', value: 5 },
  { name: '产品部', value: 3 },
  { name: '市场部', value: 2 }
]
```

**使用示例:**
```javascript
import { formatDepartmentDistribution } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const departmentData = formatDepartmentDistribution(employees)
```

---

### 2. formatPositionSalaryStats(employees)
将员工数据转换为职位平均薪资数据格式，用于柱状图。

**参数:**
- `employees`: 员工数据数组

**返回值:**
```javascript
[
  { name: '高级工程师', value: 25000 },
  { name: '产品经理', value: 20000 },
  { name: '设计师', value: 15000 }
]
```

**使用示例:**
```javascript
import { formatPositionSalaryStats } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const salaryData = formatPositionSalaryStats(employees)
```

---

### 3. formatGenderDistribution(employees)
将员工数据转换为性别分布数据格式，用于饼图。

**参数:**
- `employees`: 员工数据数组

**返回值:**
```javascript
[
  { name: '男', value: 6 },
  { name: '女', value: 4 }
]
```

**使用示例:**
```javascript
import { formatGenderDistribution } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const genderData = formatGenderDistribution(employees)
```

---

### 4. formatStatusDistribution(employees)
将员工数据转换为状态分布数据格式，用于饼图。

**参数:**
- `employees`: 员工数据数组

**返回值:**
```javascript
[
  { name: '在职', value: 9 },
  { name: '离职', value: 1 }
]
```

**使用示例:**
```javascript
import { formatStatusDistribution } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const statusData = formatStatusDistribution(employees)
```

---

### 5. formatHireDateDistribution(employees)
将员工数据转换为入职年份分布数据格式，用于柱状图。

**参数:**
- `employees`: 员工数据数组

**返回值:**
```javascript
[
  { name: '2020', value: 2 },
  { name: '2021', value: 3 },
  { name: '2022', value: 5 }
]
```

**使用示例:**
```javascript
import { formatHireDateDistribution } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const hireDateData = formatHireDateDistribution(employees)
```

---

### 6. formatSalaryRangeDistribution(employees, ranges)
将员工数据转换为薪资范围分布数据格式，用于柱状图或饼图。

**参数:**
- `employees`: 员工数据数组
- `ranges`: 薪资范围配置数组（可选，默认为5个常用范围）

**返回值:**
```javascript
[
  { name: '5k以下', value: 1 },
  { name: '5k-10k', value: 3 },
  { name: '10k-15k', value: 4 },
  { name: '15k-20k', value: 1 },
  { name: '20k以上', value: 1 }
]
```

**使用示例:**
```javascript
import { formatSalaryRangeDistribution } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const salaryRangeData = formatSalaryRangeDistribution(employees)

// 自定义薪资范围
const customRanges = [
  { min: 0, max: 8000, label: '8k以下' },
  { min: 8000, max: 15000, label: '8k-15k' },
  { min: 15000, max: Infinity, label: '15k以上' }
]
const customData = formatSalaryRangeDistribution(employees, customRanges)
```

---

### 7. formatPieChartData(data, colors)
为饼图数据添加颜色样式。

**参数:**
- `data`: 图表数据数组
- `colors`: 颜色数组（可选，默认为ECharts默认配色）

**返回值:**
```javascript
[
  { name: '技术部', value: 5, itemStyle: { color: '#5470c6' } },
  { name: '产品部', value: 3, itemStyle: { color: '#91cc75' } }
]
```

**使用示例:**
```javascript
import { formatPieChartData, formatDepartmentDistribution } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const departmentData = formatDepartmentDistribution(employees)
const pieData = formatPieChartData(departmentData)
```

---

### 8. formatBarChartData(data, color)
为柱状图数据添加颜色样式。

**参数:**
- `data`: 图表数据数组
- `color`: 柱子颜色（可选，默认为 '#5470c6'）

**返回值:**
```javascript
[
  { name: '高级工程师', value: 25000, itemStyle: { color: '#5470c6', borderRadius: [4, 4, 0, 0] } }
]
```

**使用示例:**
```javascript
import { formatBarChartData, formatPositionSalaryStats } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const salaryData = formatPositionSalaryStats(employees)
const barData = formatBarChartData(salaryData)
```

---

### 9. calculateStatistics(employees)
计算员工薪资统计数据。

**参数:**
- `employees`: 员工数据数组

**返回值:**
```javascript
{
  total: 10,           // 总人数
  averageSalary: 18000, // 平均薪资
  maxSalary: 25000,     // 最高薪资
  minSalary: 12000,     // 最低薪资
  salaryRange: 13000    // 薪资范围
}
```

**使用示例:**
```javascript
import { calculateStatistics } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const stats = calculateStatistics(employees)
console.log(`平均薪资: ¥${stats.averageSalary}`)
```

---

### 10. filterEmployeesByStatus(employees, status)
根据状态筛选员工。

**参数:**
- `employees`: 员工数据数组
- `status`: 状态值（可选，默认为 '在职'）

**返回值:**
```javascript
[
  { id: 1, name: '张三', status: '在职', ... },
  { id: 2, name: '李四', status: '在职', ... }
]
```

**使用示例:**
```javascript
import { filterEmployeesByStatus } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const activeEmployees = filterEmployeesByStatus(employees, '在职')
const inactiveEmployees = filterEmployeesByStatus(employees, '离职')
```

---

### 11. groupEmployeesByField(employees, field)
根据指定字段对员工进行分组。

**参数:**
- `employees`: 员工数据数组
- `field`: 分组字段名（如 'department', 'position' 等）

**返回值:**
```javascript
{
  '技术部': [
    { id: 1, name: '张三', department: '技术部', ... },
    { id: 2, name: '李四', department: '技术部', ... }
  ],
  '产品部': [
    { id: 3, name: '王五', department: '产品部', ... }
  ]
}
```

**使用示例:**
```javascript
import { groupEmployeesByField } from '../utils/dataFormatter'

const employees = await employeeService.getAll()
const groupedByDept = groupEmployeesByField(employees, 'department')
const groupedByPosition = groupEmployeesByField(employees, 'position')
```

---

## 完整使用示例

### 在Analytics页面中使用

```javascript
import { useState, useEffect } from 'react'
import { Card, Row, Col, Spin, message } from 'antd'
import ReactECharts from 'echarts-for-react'
import api from '../services/api'
import { 
  formatDepartmentDistribution, 
  formatPositionSalaryStats,
  formatPieChartData,
  formatBarChartData
} from '../utils/dataFormatter'

export default function Analytics() {
  const [loading, setLoading] = useState(false)
  const [departmentData, setDepartmentData] = useState([])
  const [salaryData, setSalaryData] = useState([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const employees = await api.get('/employees')
      
      const deptData = formatDepartmentDistribution(employees)
      const salaryStats = formatPositionSalaryStats(employees)
      
      setDepartmentData(formatPieChartData(deptData))
      setSalaryData(formatBarChartData(salaryStats))
    } catch (error) {
      console.error('获取数据失败:', error)
      message.error('获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const pieOption = {
    series: [{
      type: 'pie',
      data: departmentData
    }]
  }

  const barOption = {
    xAxis: { type: 'category', data: salaryData.map(item => item.name) },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: salaryData
    }]
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts option={pieOption} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts option={barOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}
```

---

## 注意事项

1. 所有函数都是纯函数，不修改原始数据
2. 薪资字段会被转换为数字类型进行计算
3. 日期字段格式应为 'YYYY-MM-DD' 或 ISO 8601 格式
4. 颜色数组会循环使用，支持任意数量的数据项
5. 排序函数使用从大到小排序，便于展示重要数据
