const sequelize = require('./config')
const Employee = require('../models/Employee')

async function initDatabase() {
  try {
    await sequelize.sync({ force: true })
    console.log('数据库表已创建')

    const employees = [
      {
        employeeId: 'EMP001',
        name: '张三',
        gender: '男',
        department: '技术部',
        position: '前端工程师',
        hireDate: '2024-01-15',
        status: '在职',
        phone: '13800138001',
        email: 'zhangsan@example.com',
        salary: 15000.00
      },
      {
        employeeId: 'EMP002',
        name: '李四',
        gender: '女',
        department: '产品部',
        position: '产品经理',
        hireDate: '2024-02-20',
        status: '在职',
        phone: '13800138002',
        email: 'lisi@example.com',
        salary: 18000.00
      },
      {
        employeeId: 'EMP003',
        name: '王五',
        gender: '男',
        department: '技术部',
        position: '后端工程师',
        hireDate: '2024-03-10',
        status: '在职',
        phone: '13800138003',
        email: 'wangwu@example.com',
        salary: 16000.00
      },
      {
        employeeId: 'EMP004',
        name: '赵六',
        gender: '女',
        department: '市场部',
        position: '市场专员',
        hireDate: '2024-04-05',
        status: '在职',
        phone: '13800138004',
        email: 'zhaoliu@example.com',
        salary: 12000.00
      },
      {
        employeeId: 'EMP005',
        name: '钱七',
        gender: '男',
        department: '销售部',
        position: '销售经理',
        hireDate: '2024-01-20',
        status: '在职',
        phone: '13800138005',
        email: 'qianqi@example.com',
        salary: 20000.00
      },
      {
        employeeId: 'EMP006',
        name: '孙八',
        gender: '女',
        department: '人力资源部',
        position: 'HR专员',
        hireDate: '2024-05-12',
        status: '在职',
        phone: '13800138006',
        email: 'sunba@example.com',
        salary: 11000.00
      },
      {
        employeeId: 'EMP007',
        name: '周九',
        gender: '男',
        department: '财务部',
        position: '会计',
        hireDate: '2024-02-28',
        status: '在职',
        phone: '13800138007',
        email: 'zhoujiu@example.com',
        salary: 13000.00
      },
      {
        employeeId: 'EMP008',
        name: '吴十',
        gender: '女',
        department: '技术部',
        position: '测试工程师',
        hireDate: '2024-06-01',
        status: '在职',
        phone: '13800138008',
        email: 'wushi@example.com',
        salary: 14000.00
      },
      {
        employeeId: 'EMP009',
        name: '郑十一',
        gender: '男',
        department: '产品部',
        position: 'UI设计师',
        hireDate: '2024-03-25',
        status: '在职',
        phone: '13800138009',
        email: 'zhengshiyi@example.com',
        salary: 15500.00
      },
      {
        employeeId: 'EMP010',
        name: '王十二',
        gender: '女',
        department: '销售部',
        position: '销售代表',
        hireDate: '2024-04-18',
        status: '在职',
        phone: '13800138010',
        email: 'wangshier@example.com',
        salary: 10000.00
      }
    ]

    await Employee.bulkCreate(employees)
    console.log('已插入10条员工数据')
    
    await sequelize.close()
    console.log('数据库初始化完成')
  } catch (error) {
    console.error('数据库初始化失败:', error)
    process.exit(1)
  }
}

initDatabase()
