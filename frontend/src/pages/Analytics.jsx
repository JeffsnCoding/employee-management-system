import { useState, useEffect } from 'react'
import { Card, Row, Col, Spin, message } from 'antd'
import ReactECharts from 'echarts-for-react'
import api from '../services/api'
import { useIsMobile, useIsTablet, useIsDesktop } from '../hooks/useBreakpoint'

export default function Analytics() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const [loading, setLoading] = useState(false)
  const [departmentData, setDepartmentData] = useState([])
  const [salaryData, setSalaryData] = useState([])

  const fetchDepartmentData = async () => {
    try {
      const data = await api.get('/employees/department-distribution')
      setDepartmentData(data)
    } catch (error) {
      console.error('获取部门分布数据失败:', error)
      message.error('获取部门分布数据失败')
    }
  }

  const fetchSalaryData = async () => {
    try {
      const data = await api.get('/employees/position-salary-stats')
      setSalaryData(data)
    } catch (error) {
      console.error('获取薪资统计数据失败:', error)
      message.error('获取薪资统计数据失败')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([fetchDepartmentData(), fetchSalaryData()])
      setLoading(false)
    }
    fetchData()
  }, [])

  const pieOption = {
    title: {
      text: '各部门员工数量分布',
      left: 'center',
      top: isMobile ? 10 : 20,
      textStyle: {
        fontSize: isMobile ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: isMobile ? 'horizontal' : 'vertical',
      left: isMobile ? 'center' : 'left',
      top: isMobile ? 'bottom' : 'middle',
      textStyle: {
        fontSize: isMobile ? 10 : 12
      }
    },
    series: [
      {
        name: '员工数量',
        type: 'pie',
        radius: isMobile ? ['30%', '60%'] : ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: isMobile ? 14 : 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: departmentData
      }
    ]
  }

  const barOption = {
    title: {
      text: '各职位平均薪资',
      left: 'center',
      top: isMobile ? 10 : 20,
      textStyle: {
        fontSize: isMobile ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: ¥{c}'
    },
    grid: {
      left: isMobile ? '5%' : '3%',
      right: isMobile ? '8%' : '4%',
      bottom: isMobile ? '15%' : '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: salaryData.map(item => item.name),
      axisLabel: {
        interval: isMobile ? 0 : 'auto',
        rotate: isMobile ? 45 : 30,
        fontSize: isMobile ? 10 : 12
      }
    },
    yAxis: {
      type: 'value',
      name: '薪资（元）',
      axisLabel: {
        formatter: '¥{value}',
        fontSize: isMobile ? 10 : 12
      }
    },
    series: [
      {
        name: '平均薪资',
        type: 'bar',
        data: salaryData.map(item => item.value),
        itemStyle: {
          color: '#5470c6',
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: !isMobile,
          position: 'top',
          formatter: '¥{c}',
          fontSize: isMobile ? 10 : 12
        }
      }
    ]
  }

  return (
    <div style={{ padding: isMobile ? '12px' : '24px' }}>
      <Spin spinning={loading}>
        <Row gutter={[isMobile ? 12 : 16, isMobile ? 12 : 16]}>
          <Col xs={24} lg={12}>
            <Card>
              <ReactECharts option={pieOption} style={{ height: isMobile ? '300px' : '400px' }} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card>
              <ReactECharts option={barOption} style={{ height: isMobile ? '300px' : '400px' }} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}
