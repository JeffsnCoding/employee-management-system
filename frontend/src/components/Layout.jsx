import { useState, useEffect } from 'react'
import { Layout as AntLayout, Menu, Tabs } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  TeamOutlined,
  PlusOutlined,
  BarChartOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = AntLayout

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('employees')

  const handleTabChange = (key) => {
    setActiveTab(key)
    if (key === 'employees') {
      navigate('/employees')
    } else if (key === 'analytics') {
      navigate('/analytics')
    }
  }

  useEffect(() => {
    const path = location.pathname
    if (path.startsWith('/employees')) {
      setActiveTab('employees')
    } else if (path.startsWith('/analytics')) {
      setActiveTab('analytics')
    } else if (path.startsWith('/dashboard')) {
      setActiveTab('dashboard')
    }
  }, [location.pathname])

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '数据概览',
      onClick: () => navigate('/dashboard')
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: '数据看板',
      onClick: () => navigate('/analytics')
    },
    {
      key: '/employees',
      icon: <TeamOutlined />,
      label: '员工列表',
      onClick: () => navigate('/employees')
    },
    {
      key: '/employees/add',
      icon: <PlusOutlined />,
      label: '添加员工',
      onClick: () => navigate('/employees/add')
    }
  ]

  const getSelectedKey = () => {
    const path = location.pathname
    if (path.startsWith('/employees/add')) return '/employees/add'
    if (path.startsWith('/employees/')) return '/employees'
    if (path.startsWith('/analytics')) return '/analytics'
    return path
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold'
        }}>
          {collapsed ? '员工' : '员工管理系统'}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[getSelectedKey()]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ margin: 0, marginRight: 'auto' }}>员工信息管理仪表盘</h2>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={[
              {
                key: 'employees',
                label: '员工管理',
                icon: <TeamOutlined />
              },
              {
                key: 'analytics',
                label: '数据看板',
                icon: <BarChartOutlined />
              }
            ]}
          />
        </Header>
        <Content style={{ margin: '24px', background: '#fff', padding: 24, borderRadius: 8 }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
