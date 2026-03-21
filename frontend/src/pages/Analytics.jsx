import { useState, useEffect } from 'react'
import { Card, Row, Col, Spin, message } from 'antd'
import ReactECharts from 'echarts-for-react'
import api from '../services/api'

export default function Analytics() {
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
      top: 20
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '员工数量',
        type: 'pie',
        radius: ['40%', '70%'],
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
            fontSize: 20,
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
      top: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: ¥{c}'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: salaryData.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: '薪资（元）',
      axisLabel: {
        formatter: '¥{value}'
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
          show: true,
          position: 'top',
          formatter: '¥{c}'
        }
      }
    ]
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
