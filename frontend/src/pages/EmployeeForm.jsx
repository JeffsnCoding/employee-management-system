import { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, Button, message, Card, Spin, Space, Row, Col, Divider } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { employeeService } from '../services/employeeService'
import { UserOutlined, TeamOutlined, PhoneOutlined, MailOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons'
import { useIsMobile, useIsTablet, useIsDesktop } from '../hooks/useBreakpoint'

const { Option } = Select

export default function EmployeeForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isEdit = !!id

  const fetchEmployee = async () => {
    try {
      setFetchLoading(true)
      const data = await employeeService.getById(id)
      form.setFieldsValue({
        ...data,
        hireDate: data.hireDate ? dayjs(data.hireDate) : null
      })
    } catch (error) {
      console.error('获取员工信息失败:', error)
      message.error('获取员工信息失败')
    } finally {
      setFetchLoading(false)
    }
  }

  useEffect(() => {
    if (isEdit) {
      fetchEmployee()
    }
  }, [id, isEdit])

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const formData = {
        ...values,
        hireDate: values.hireDate ? values.hireDate.format('YYYY-MM-DD') : null
      }
      if (isEdit) {
        await employeeService.update(id, formData)
      } else {
        await employeeService.create(formData)
      }
      message.success(isEdit ? '更新成功' : '添加成功')
      navigate('/employees')
    } catch (error) {
      console.error('操作失败:', error)
      message.error(isEdit ? '更新失败' : '添加失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: isMobile ? '12px' : '24px', 
      maxWidth: isMobile ? '100%' : '1200px', 
      margin: '0 auto' 
    }}>
      <Card>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: isMobile ? 20 : 24, 
            fontWeight: 600 
          }}>
            {isEdit ? '编辑员工' : '添加员工'}
          </h2>
          <p style={{ 
            margin: '8px 0 0 0', 
            color: '#999',
            fontSize: isMobile ? 14 : 16
          }}>
            {isEdit ? '修改员工信息' : '填写员工基本信息'}
          </p>
        </div>

        <Spin spinning={fetchLoading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              status: '在职',
              gender: '男'
            }}
          >
            <Divider orientation="left">基本信息</Divider>
            
            <Row gutter={isMobile ? 12 : 24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="工号"
                  name="employeeId"
                  rules={[{ required: true, message: '请输入工号' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="请输入工号" 
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入姓名' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="请输入姓名" 
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="性别"
                  name="gender"
                  rules={[{ required: true, message: '请选择性别' }]}
                >
                  <Select placeholder="请选择性别" size="large">
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={isMobile ? 12 : 24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="部门"
                  name="department"
                  rules={[{ required: true, message: '请选择部门' }]}
                >
                  <Select 
                    placeholder="请选择部门" 
                    size="large"
                    prefix={<TeamOutlined />}
                  >
                    <Option value="技术部">技术部</Option>
                    <Option value="产品部">产品部</Option>
                    <Option value="市场部">市场部</Option>
                    <Option value="销售部">销售部</Option>
                    <Option value="人力资源部">人力资源部</Option>
                    <Option value="财务部">财务部</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="职位"
                  name="position"
                  rules={[{ required: true, message: '请输入职位' }]}
                >
                  <Input 
                    prefix={<TeamOutlined />} 
                    placeholder="请输入职位" 
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="入职日期"
                  name="hireDate"
                  rules={[{ required: true, message: '请选择入职日期' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }} 
                    size="large"
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">联系信息</Divider>

            <Row gutter={isMobile ? 12 : 24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="联系电话"
                  name="phone"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input 
                    prefix={<PhoneOutlined />} 
                    placeholder="请输入联系电话" 
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="请输入邮箱" 
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="薪资"
                  name="salary"
                  rules={[{ required: true, message: '请输入薪资' }]}
                >
                  <Input 
                    prefix={<DollarOutlined />} 
                    type="number" 
                    placeholder="请输入薪资" 
                    size="large"
                    addonAfter="元"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">状态信息</Divider>

            <Row gutter={isMobile ? 12 : 24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="状态"
                  name="status"
                  rules={[{ required: true, message: '请选择状态' }]}
                >
                  <Select placeholder="请选择状态" size="large">
                    <Option value="在职">在职</Option>
                    <Option value="离职">离职</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Form.Item style={{ marginBottom: 0 }}>
              <Space 
                size="large" 
                direction={isMobile ? 'vertical' : 'horizontal'}
                style={{ width: isMobile ? '100%' : 'auto' }}
              >
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  size="large"
                  style={{ 
                    minWidth: isMobile ? '100%' : 120,
                    height: isMobile ? 48 : 'auto'
                  }}
                >
                  {isEdit ? '更新' : '添加'}
                </Button>
                <Button 
                  onClick={() => navigate('/employees')}
                  size="large"
                  style={{ 
                    minWidth: isMobile ? '100%' : 120,
                    height: isMobile ? 48 : 'auto'
                  }}
                >
                  取消
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}
