import { useState, useEffect, useCallback } from 'react'
import { Table, Button, Input, Space, message, Popconfirm, Select, Card, Tag, Row, Col, Drawer } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, PhoneOutlined, MailOutlined, DollarOutlined, TeamOutlined, UserOutlined, CalendarOutlined, MenuOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { employeeService } from '../services/employeeService'
import { useIsMobile, useIsTablet, useIsDesktop } from '../hooks/useBreakpoint'

const { Option } = Select

export default function EmployeeList() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const [searchText, setSearchText] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchText) params.search = searchText
      if (departmentFilter) params.department = departmentFilter
      const data = await employeeService.getAll(params)
      setEmployees(data)
    } catch (error) {
      console.error('获取员工列表失败:', error)
      message.error('获取员工列表失败')
    } finally {
      setLoading(false)
    }
  }, [searchText, departmentFilter])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const columns = [
    {
      title: '工号',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 120
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender) => (
        <Tag color={gender === '男' ? 'blue' : 'pink'}>{gender}</Tag>
      )
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 150
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      key: 'salary',
      width: 120,
      render: (salary) => `¥${Number(salary).toLocaleString()}`
    },
    {
      title: '入职日期',
      dataIndex: 'hireDate',
      key: 'hireDate',
      width: 120,
      render: (date) => date ? date.split('T')[0] : '-'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '在职' ? 'green' : 'red'}>
          {status}
        </Tag>
      )
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/employees/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除该员工吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleDelete = async (id) => {
    try {
      await employeeService.delete(id)
      message.success('删除成功')
      fetchEmployees()
    } catch (error) {
      console.error('删除失败:', error)
      message.error('删除失败')
    }
  }

  const handleReset = () => {
    setSearchText('')
    setDepartmentFilter('')
  }

  const renderMobileCard = (employee) => (
    <Card
      key={employee.id}
      style={{ marginBottom: 16 }}
      hoverable
      onClick={() => {
        setSelectedEmployee(employee)
        setDrawerVisible(true)
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>{employee.name}</span>
        </div>
        <Tag color={employee.status === '在职' ? 'green' : 'red'}>{employee.status}</Tag>
      </div>
      
      <div style={{ marginBottom: 8 }}>
        <TeamOutlined style={{ marginRight: 8 }} />
        <span>{employee.department} - {employee.position}</span>
      </div>
      
      <div style={{ marginBottom: 8 }}>
        <DollarOutlined style={{ marginRight: 8 }} />
        <span style={{ color: '#52c41a', fontWeight: 600 }}>
          ¥{Number(employee.salary).toLocaleString()}
        </span>
      </div>
      
      <div style={{ marginBottom: 8 }}>
        <PhoneOutlined style={{ marginRight: 8 }} />
        <span>{employee.phone}</span>
      </div>
      
      <div style={{ marginBottom: 8 }}>
        <MailOutlined style={{ marginRight: 8 }} />
        <span style={{ fontSize: 12 }}>{employee.email}</span>
      </div>
      
      <div>
        <CalendarOutlined style={{ marginRight: 8 }} />
        <span>{employee.hireDate ? employee.hireDate.split('T')[0] : '-'}</span>
      </div>
    </Card>
  )

  const renderDrawerContent = () => {
    if (!selectedEmployee) return null
    
    return (
      <div>
        <Card>
          <h3 style={{ marginBottom: 16 }}>员工详情</h3>
          <div style={{ marginBottom: 12 }}>
            <strong>工号：</strong> {selectedEmployee.employeeId}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>姓名：</strong> {selectedEmployee.name}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>性别：</strong> 
            <Tag color={selectedEmployee.gender === '男' ? 'blue' : 'pink'}>
              {selectedEmployee.gender}
            </Tag>
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>部门：</strong> {selectedEmployee.department}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>职位：</strong> {selectedEmployee.position}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>薪资：</strong> ¥{Number(selectedEmployee.salary).toLocaleString()}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>入职日期：</strong> {selectedEmployee.hireDate ? selectedEmployee.hireDate.split('T')[0] : '-'}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>状态：</strong>
            <Tag color={selectedEmployee.status === '在职' ? 'green' : 'red'}>
              {selectedEmployee.status}
            </Tag>
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>联系电话：</strong> {selectedEmployee.phone}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>邮箱：</strong> {selectedEmployee.email}
          </div>
          
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setDrawerVisible(false)
                navigate(`/employees/edit/${selectedEmployee.id}`)
              }}
              block
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除"
              description="确定要删除该员工吗？"
              onConfirm={() => {
                handleDelete(selectedEmployee.id)
                setDrawerVisible(false)
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button danger icon={<DeleteOutlined />} block>
                删除
              </Button>
            </Popconfirm>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div style={{ padding: isMobile ? '12px' : '24px' }}>
      <Card>
        <div style={{ 
          marginBottom: 16, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 12 : 0
        }}>
          <Space size="middle" style={{ width: isMobile ? '100%' : 'auto' }}>
            <Input
              placeholder="搜索员工姓名或工号"
              prefix={<SearchOutlined />}
              style={{ width: isMobile ? '100%' : 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select
              placeholder="选择部门"
              style={{ width: isMobile ? '100%' : 150 }}
              value={departmentFilter}
              onChange={setDepartmentFilter}
              allowClear
            >
              <Option value="技术部">技术部</Option>
              <Option value="产品部">产品部</Option>
              <Option value="市场部">市场部</Option>
              <Option value="销售部">销售部</Option>
              <Option value="人力资源部">人力资源部</Option>
              <Option value="财务部">财务部</Option>
            </Select>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/employees/add')}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            添加员工
          </Button>
        </div>

        {isMobile ? (
          <div>
            {employees.map(renderMobileCard)}
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={employees}
            loading={loading}
            rowKey="id"
            scroll={{ x: 1500 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条记录`,
              showQuickJumper: true
            }}
          />
        )}
      </Card>

      <Drawer
        title="员工详情"
        placement="right"
        width={isMobile ? '100%' : 400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {renderDrawerContent()}
      </Drawer>
    </div>
  )
}
