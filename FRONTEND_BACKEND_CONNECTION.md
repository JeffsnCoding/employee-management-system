# 前后端连接说明

## 架构说明

本项目采用前后端分离架构，前端通过 HTTP API 与后端进行通信。

### 技术栈

**前端**:

- React 18
- Vite (开发服务器）
- Axios (HTTP客户端）
- Ant Design (UI组件）

**后端**:

- Node.js + Express
- SQLite (数据库）
- Sequelize ORM (数据库操作）

## API 配置

### 1. 前端 API 配置

**文件位置**: `frontend/src/services/api.js`

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',      // API基础路径
  timeout: 10000        // 请求超时时间
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data  // 自动提取响应数据
  },
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default api
```

### 2. Vite 代理配置

**文件位置**: `frontend/vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 代理到后端服务器
        changeOrigin: true
      }
    }
  }
})
```

**代理说明**:

- 前端运行在端口 3000
- 后端运行在端口 5000
- Vite 开发服务器将 `/api/*` 请求代理到 `http://localhost:5000/api/*`
- 这样可以避免跨域问题

### 3. 员工服务封装

**文件位置**: `frontend/src/services/employeeService.js`

```javascript
import api from './api'

export const employeeService = {
  // 获取员工列表（支持搜索和筛选）
  getAll: (params) => api.get('/employees', { params }),

  // 根据ID获取员工详情
  getById: (id) => api.get(`/employees/${id}`),

  // 创建新员工
  create: (data) => api.post('/employees', data),

  // 更新员工信息
  update: (id, data) => api.put(`/employees/${id}`, data),

  // 删除员工
  delete: (id) => api.delete(`/employees/${id}`),

  // 获取统计数据
  getStats: () => api.get('/employees/stats')
}
```

## 前后端通信流程

### 1. 获取员工列表

**前端代码** (EmployeeList.jsx):

```javascript
const fetchEmployees = async () => {
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
}
```

**请求流程**:

1. 用户输入搜索关键词或选择部门
2. 前端调用 `employeeService.getAll(params)`
3. Axios 发送 GET 请求到 `/api/employees?search=xxx&department=xxx`
4. Vite 代理将请求转发到 `http://localhost:5000/api/employees?search=xxx&department=xxx`
5. 后端处理请求并返回数据
6. 前端接收数据并更新表格

### 2. 搜索员工

**前端代码** (EmployeeList.jsx):

```javascript
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
  ...
</Select>
```

**请求流程**:

1. 用户在搜索框输入关键词或选择部门
2. `useEffect` 检测到 `searchText` 或 `departmentFilter` 变化
3. 自动调用 `fetchEmployees()`
4. 发送带查询参数的 GET 请求
5. 后端使用 Sequelize 的模糊搜索返回结果

### 3. 新增员工

**前端代码** (EmployeeForm.jsx):

```javascript
const onFinish = async (values) => {
  try {
    setLoading(true)
    const formData = {
      ...values,
      hireDate: values.hireDate ? values.hireDate.format('YYYY-MM-DD') : null
    }
    await employeeService.create(formData)
    message.success('添加成功')
    navigate('/employees')
  } catch (error) {
    console.error('操作失败:', error)
    message.error('添加失败')
  } finally {
    setLoading(false)
  }
}
```

**请求流程**:

1. 用户填写员工信息并提交表单
2. 前端调用 `employeeService.create(formData)`
3. Axios 发送 POST 请求到 `/api/employees`
4. 后端验证数据并插入数据库
5. 返回新创建的员工数据
6. 前端跳转到员工列表页

### 4. 编辑员工

**前端代码** (EmployeeForm.jsx):

```javascript
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

const onFinish = async (values) => {
  try {
    setLoading(true)
    const formData = {
      ...values,
      hireDate: values.hireDate ? values.hireDate.format('YYYY-MM-DD') : null
    }
    await employeeService.update(id, formData)
    message.success('更新成功')
    navigate('/employees')
  } catch (error) {
    console.error('操作失败:', error)
    message.error('更新失败')
  } finally {
    setLoading(false)
  }
}
```

**请求流程**:

1. 用户点击"编辑"按钮
2. 前端调用 `employeeService.getById(id)` 获取员工详情
3. 表单自动填充员工数据
4. 用户修改信息并提交
5. 前端调用 `employeeService.update(id, formData)`
6. Axios 发送 PUT 请求到 `/api/employees/:id`
7. 后端更新数据库记录
8. 返回更新后的员工数据
9. 前端跳转到员工列表页

### 5. 删除员工

**前端代码** (EmployeeList.jsx):

```javascript
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

// 在表格中
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
```

**请求流程**:

1. 用户点击"删除"按钮
2. 显示确认对话框
3. 用户确认后调用 `employeeService.delete(id)`
4. Axios 发送 DELETE 请求到 `/api/employees/:id`
5. 后端删除数据库记录
6. 返回成功消息
7. 前端刷新员工列表

### 6. 获取统计数据

**前端代码** (Dashboard.jsx):

```javascript
const fetchStats = async () => {
  try {
    setLoading(true)
    const data = await employeeService.getStats()
    setStats(data)
  } catch (error) {
    console.error('获取统计数据失败:', error)
  } finally {
    setLoading(false)
  }
}
```

**请求流程**:

1. 页面加载时自动调用
2. 前端调用 `employeeService.getStats()`
3. Axios 发送 GET 请求到 `/api/employees/stats`
4. 后端计算统计数据并返回
5. 前端更新仪表盘显示

## API 端点映射

| 前端调用                             | HTTP 方法 | 后端路由                 | 功能     |
| -------------------------------- | ------- | -------------------- | ------ |
| employeeService.getAll()         | GET     | /api/employees       | 获取员工列表 |
| employeeService.getById(id)      | GET     | /api/employees/:id   | 获取员工详情 |
| employeeService.create(data)     | POST    | /api/employees       | 创建员工   |
| employeeService.update(id, data) | PUT     | /api/employees/:id   | 更新员工   |
| employeeService.delete(id)       | DELETE  | /api/employees/:id   | 删除员工   |
| employeeService.getStats()       | GET     | /api/employees/stats | 获取统计   |

## 数据流向

```
用户操作
    ↓
前端组件 (React)
    ↓
employeeService (封装层）
    ↓
Axios (HTTP客户端）
    ↓
Vite 代理
    ↓
后端 API (Express)
    ↓
Sequelize ORM
    ↓
SQLite 数据库
```

## 错误处理

### 前端错误处理

1. **网络错误**: Axios 拦截器捕获并记录
2. **业务错误**: try-catch 捕获并显示提示
3. **用户提示**: 使用 Ant Design 的 message 组件显示

### 后端错误处理

1. **参数验证**: Sequelize 自动验证
2. **资源不存在**: 返回 404 状态码
3. **服务器错误**: 返回 500 状态码和错误信息

## 测试方法

### 1. 测试 API 连接

**使用浏览器**:

- 访问 http://localhost:5000/api/health
- 应该返回: `{"status":"ok","message":"Server is running"}`

**使用 curl**:

```bash
curl http://localhost:5000/api/health
```

### 2. 测试员工列表

**使用浏览器**:

- 访问 http://localhost:3000/employees
- 应该看到员工列表表格

**使用 curl**:

```bash
curl http://localhost:5000/api/employees
```

### 3. 测试搜索功能

**使用浏览器**:

- 在搜索框输入"张三"
- 表格应该只显示匹配的员工

**使用 curl**:

```bash
curl "http://localhost:5000/api/employees?search=张三"
```

### 4. 测试新增员工

**使用浏览器**:

1. 点击"添加员工"按钮
2. 填写表单并提交
3. 应该成功添加并跳转到列表页

**使用 curl**:

```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP011",
    "name": "测试员工",
    "gender": "男",
    "department": "技术部",
    "position": "测试工程师",
    "hireDate": "2024-06-15",
    "status": "在职",
    "phone": "13800138011",
    "email": "test@example.com",
    "salary": 15000.00
  }'
```

## 常见问题

### 1. 跨域问题

**问题**: 浏览器控制台显示 CORS 错误

**解决**: 

- 后端已配置 `cors()` 中间件
- 前端使用 Vite 代理
- 确保 `vite.config.js` 中的代理配置正确

### 2. 端口占用

**问题**: `EADDRINUSE: address already in use :::5000`

**解决**:

```powershell
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | 
  Select-Object -ExpandProperty OwningProcess | 
  ForEach-Object { Stop-Process -Id $_ -Force }
```

### 3. API 请求失败

**问题**: 前端无法调用后端 API

**检查清单**:

- [ ] 后端服务是否启动 (http://localhost:5000)
- [ ] 前端服务是否启动 (http://localhost:3000)
- [ ] Vite 代理配置是否正确
- [ ] API 路径是否正确
- [ ] 浏览器控制台是否有错误

## 总结

前端已正确配置并连接到后端 API：

✅ **API 配置**: Axios 实例配置正确
✅ **代理配置**: Vite 代理到后端服务器
✅ **服务封装**: employeeService 封装所有 API 方法
✅ **页面集成**: 所有页面都正确调用 API
✅ **错误处理**: 完善的错误处理和用户提示
✅ **数据流**: 清晰的前后端数据流向

所有功能（搜索、新增、编辑、删除）都已正确连接到后端 API！
