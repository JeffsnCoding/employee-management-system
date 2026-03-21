# 员工管理 API 文档

## 基础信息

- **基础URL**: `http://localhost:5000/api/employees`
- **Content-Type**: `application/json`

## API 接口列表

### 1. 获取员工列表

**接口**: `GET /api/employees`

**描述**: 获取所有员工列表，支持搜索和筛选

**查询参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|--------|------|
| search | string | 否 | 搜索关键词（姓名或工号）|
| department | string | 否 | 部门名称筛选 |

**请求示例**:
```bash
# 获取所有员工
GET /api/employees

# 搜索员工
GET /api/employees?search=张三

# 按部门筛选
GET /api/employees?department=技术部

# 组合搜索
GET /api/employees?search=张&department=技术部
```

**响应示例**:
```json
[
  {
    "id": 1,
    "employeeId": "EMP001",
    "name": "张三",
    "gender": "男",
    "department": "技术部",
    "position": "前端工程师",
    "hireDate": "2024-01-15T00:00:00.000Z",
    "status": "在职",
    "phone": "13800138001",
    "email": "zhangsan@example.com",
    "salary": 15000.00,
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
]
```

---

### 2. 获取员工详情

**接口**: `GET /api/employees/:id`

**描述**: 根据ID获取单个员工详情

**路径参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|--------|------|
| id | number | 是 | 员工ID |

**请求示例**:
```bash
GET /api/employees/1
```

**响应示例**:
```json
{
  "id": 1,
  "employeeId": "EMP001",
  "name": "张三",
  "gender": "男",
  "department": "技术部",
  "position": "前端工程师",
  "hireDate": "2024-01-15T00:00:00.000Z",
  "status": "在职",
  "phone": "13800138001",
  "email": "zhangsan@example.com",
  "salary": 15000.00,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

**错误响应**:
```json
{
  "error": "员工不存在"
}
```

---

### 3. 新增员工

**接口**: `POST /api/employees`

**描述**: 创建新的员工记录

**请求体**:
```json
{
  "employeeId": "EMP011",
  "name": "赵六",
  "gender": "男",
  "department": "技术部",
  "position": "后端工程师",
  "hireDate": "2024-06-15",
  "status": "在职",
  "phone": "13800138011",
  "email": "zhaoliu@example.com",
  "salary": 17000.00
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 描述 |
|------|------|--------|------|
| employeeId | string | 是 | 工号（唯一）|
| name | string | 是 | 姓名 |
| gender | string | 是 | 性别（男/女）|
| department | string | 是 | 部门 |
| position | string | 是 | 职位 |
| hireDate | string | 是 | 入职日期（YYYY-MM-DD）|
| status | string | 否 | 状态（默认：在职）|
| phone | string | 是 | 联系电话 |
| email | string | 是 | 邮箱 |
| salary | number | 是 | 薪资 |

**响应示例**:
```json
{
  "id": 11,
  "employeeId": "EMP011",
  "name": "赵六",
  "gender": "男",
  "department": "技术部",
  "position": "后端工程师",
  "hireDate": "2024-06-15T00:00:00.000Z",
  "status": "在职",
  "phone": "13800138011",
  "email": "zhaoliu@example.com",
  "salary": 17000.00,
  "createdAt": "2024-06-15T00:00:00.000Z",
  "updatedAt": "2024-06-15T00:00:00.000Z"
}
```

---

### 4. 更新员工

**接口**: `PUT /api/employees/:id`

**描述**: 更新指定员工的信息

**路径参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|--------|------|
| id | number | 是 | 员工ID |

**请求体**:
```json
{
  "name": "赵六",
  "position": "高级后端工程师",
  "salary": 18000.00
}
```

**响应示例**:
```json
{
  "id": 11,
  "employeeId": "EMP011",
  "name": "赵六",
  "gender": "男",
  "department": "技术部",
  "position": "高级后端工程师",
  "hireDate": "2024-06-15T00:00:00.000Z",
  "status": "在职",
  "phone": "13800138011",
  "email": "zhaoliu@example.com",
  "salary": 18000.00,
  "createdAt": "2024-06-15T00:00:00.000Z",
  "updatedAt": "2024-06-15T00:00:00.000Z"
}
```

---

### 5. 删除员工

**接口**: `DELETE /api/employees/:id`

**描述**: 删除指定的员工记录

**路径参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|--------|------|
| id | number | 是 | 员工ID |

**请求示例**:
```bash
DELETE /api/employees/11
```

**响应示例**:
```json
{
  "message": "删除成功"
}
```

**错误响应**:
```json
{
  "error": "员工不存在"
}
```

---

### 6. 获取统计数据

**接口**: `GET /api/employees/stats`

**描述**: 获取员工统计数据

**请求示例**:
```bash
GET /api/employees/stats
```

**响应示例**:
```json
{
  "total": 10,
  "active": 10,
  "inactive": 0,
  "newHires": 3,
  "pending": 0
}
```

**字段说明**:
| 字段 | 描述 |
|------|------|
| total | 员工总数 |
| active | 在职员工数 |
| inactive | 离职员工数 |
| newHires | 本月入职人数 |
| pending | 待审批人数 |

---

## HTTP 状态码

| 状态码 | 描述 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 测试示例

### 使用 curl 测试

```bash
# 获取所有员工
curl http://localhost:5000/api/employees

# 搜索员工
curl "http://localhost:5000/api/employees?search=张三"

# 新增员工
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

# 更新员工
curl -X PUT http://localhost:5000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "salary": 16000.00
  }'

# 删除员工
curl -X DELETE http://localhost:5000/api/employees/1
```

### 使用 Postman 测试

1. 创建新的请求
2. 选择请求方法（GET/POST/PUT/DELETE）
3. 输入URL：`http://localhost:5000/api/employees`
4. 添加必要的Headers：`Content-Type: application/json`
5. 对于POST/PUT请求，在Body中添加JSON数据
6. 发送请求查看响应
