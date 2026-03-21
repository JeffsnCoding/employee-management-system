import { useState, useEffect, useCallback } from 'react'
import { Table, Button, Input, Space, message, Popconfirm, Select, Card, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { employeeService } from '../services/employeeService'

const { Option } = Select

export default function EmployeeList() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const [searchText, setSearchText] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')

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

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space size="middle">
          <Input
            placeholder="搜索员工姓名或工号"
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Select
            placeholder="选择部门"
            style={{ width: 150 }}
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
        >
          添加员工
        </Button>
      </div>
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
    </Card>
  )
}
