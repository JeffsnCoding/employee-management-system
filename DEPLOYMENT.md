# 员工管理系统部署指南

本指南提供将员工管理系统部署到Vercel的详细步骤。

## 部署方案

### 方案一：前后端都部署到Vercel（推荐用于演示）

**优点：**
- 统一部署平台
- 免费额度充足
- 自动HTTPS和CDN

**缺点：**
- 后端需要改用云数据库（PostgreSQL/MySQL）
- SQLite在Serverless环境中不可用

### 方案二：前端Vercel + 后端其他平台（推荐用于生产）

**优点：**
- 前端享受Vercel的快速部署
- 后端可以使用SQLite或其他数据库
- 更灵活的架构选择

**缺点：**
- 需要管理两个平台
- 可能产生额外费用

---

## 方案一：完整部署到Vercel

### 前置要求

1. **准备Git仓库**
   ```bash
   cd d:\TraeCode\week02\EmployeeManage
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **创建GitHub仓库**
   - 访问 https://github.com/new
   - 创建新仓库（例如：employee-management-system）
   - 按照GitHub提示推送本地代码

3. **准备云数据库**
   - 推荐使用：Supabase（免费）、Neon（免费）、PlanetScale（免费）
   - 创建PostgreSQL数据库
   - 记录连接字符串

### 步骤1：后端改造

#### 1.1 安装数据库依赖
```bash
cd backend
npm install pg dotenv
```

#### 1.2 创建环境变量文件
创建 `backend/.env` 文件：
```env
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
```

#### 1.3 修改数据库配置
创建 `backend/src/database/config.js`：
```javascript
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

module.exports = pool
```

#### 1.4 创建数据库初始化脚本
创建 `backend/src/database/init.sql`：
```sql
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  department VARCHAR(50) NOT NULL,
  position VARCHAR(100) NOT NULL,
  hire_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT '在职',
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 1.5 创建Vercel API路由
创建 `backend/api/index.js`：
```javascript
const express = require('express')
const cors = require('cors')
const employeeRoutes = require('../src/routes/employees')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/employees', employeeRoutes)

module.exports = app
```

#### 1.6 更新package.json
```json
{
  "name": "employee-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "pg": "^8.11.0",
    "dotenv": "^16.3.0"
  }
}
```

### 步骤2：前端配置

#### 2.1 配置生产环境API地址
修改 `frontend/vite.config.js`：
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
```

#### 2.2 创建API配置文件
创建 `frontend/src/config/api.js`：
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const getApiUrl = (path) => {
  return `${API_BASE_URL}${path}`
}
```

#### 2.3 更新API服务
修改 `frontend/src/services/api.js`：
```javascript
import axios from 'axios'
import { getApiUrl } from '../config/api'

const api = axios.create({
  baseURL: getApiUrl(''),
  timeout: 10000
})

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default api
```

### 步骤3：部署到Vercel

#### 3.1 安装Vercel CLI
```bash
npm install -g vercel
```

#### 3.2 登录Vercel
```bash
vercel login
```

#### 3.3 部署后端
```bash
cd backend
vercel --prod
```

#### 3.4 配置环境变量
在Vercel Dashboard中添加环境变量：
- `DATABASE_URL`: 你的PostgreSQL连接字符串
- `NODE_ENV`: `production`

#### 3.5 部署前端
```bash
cd frontend
vercel --prod
```

#### 3.6 配置前端环境变量
在Vercel Dashboard中添加：
- `VITE_API_URL`: 后端部署后的URL（例如：https://employee-backend.vercel.app/api）

---

## 方案二：前端Vercel + 后端Render

### 前端部署到Vercel

#### 步骤1：准备前端
```bash
cd frontend
npm run build
```

#### 步骤2：部署到Vercel
```bash
vercel --prod
```

#### 步骤3：配置环境变量
在Vercel Dashboard中添加：
- `VITE_API_URL`: 后端部署后的URL

### 后端部署到Render

#### 步骤1：准备Render账户
- 访问 https://render.com
- 注册并创建账户

#### 步骤2：创建Web Service
1. 点击 "New +"
2. 选择 "Web Service"
3. 连接GitHub仓库
4. 选择后端目录

#### 步骤3：配置服务
- **Name**: employee-backend
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`
- **Instance Type**: Free

#### 步骤4：添加环境变量
- `PORT`: `5000`
- `NODE_ENV`: `production`

#### 步骤5：部署
点击 "Create Web Service" 开始部署

---

## 部署检查清单

### 前端检查
- [ ] 构建成功无错误
- [ ] 环境变量配置正确
- [ ] API地址指向正确的后端URL
- [ ] 路由配置正确
- [ ] 静态资源加载正常

### 后端检查
- [ ] 数据库连接正常
- [ ] API端点可访问
- [ ] CORS配置正确
- [ ] 环境变量加载正确
- [ ] 错误处理完善

### 功能检查
- [ ] 员工列表加载正常
- [ ] 添加员工功能正常
- [ ] 编辑员工功能正常
- [ ] 删除员工功能正常
- [ ] 数据看板显示正常
- [ ] 搜索和筛选功能正常

---

## 常见问题解决

### 问题1：CORS错误
**解决方案：**
在后端添加CORS配置：
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}))
```

### 问题2：数据库连接失败
**解决方案：**
- 检查环境变量是否正确设置
- 确认数据库白名单包含Vercel IP
- 验证数据库连接字符串格式

### 问题3：API请求失败
**解决方案：**
- 检查前端环境变量 `VITE_API_URL`
- 确认后端服务正常运行
- 查看浏览器控制台错误信息

### 问题4：构建失败
**解决方案：**
- 检查依赖版本兼容性
- 确认所有必需文件存在
- 查看Vercel构建日志

---

## 性能优化建议

### 前端优化
1. **代码分割**
   ```javascript
   const Analytics = lazy(() => import('./pages/Analytics'))
   ```

2. **图片优化**
   - 使用WebP格式
   - 压缩图片大小

3. **缓存策略**
   - 配置Vercel缓存头
   - 使用Service Worker

### 后端优化
1. **数据库索引**
   ```sql
   CREATE INDEX idx_department ON employees(department);
   CREATE INDEX idx_status ON employees(status);
   ```

2. **API响应缓存**
   - 使用Redis缓存常用数据
   - 设置合理的缓存过期时间

3. **连接池**
   ```javascript
   const pool = new Pool({
     max: 20,
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 2000
   })
   ```

---

## 监控和日志

### Vercel监控
- 访问Vercel Dashboard
- 查看"Analytics"标签
- 监控访问量和错误率

### 日志查看
```bash
# 查看部署日志
vercel logs

# 查看实时日志
vercel logs --follow
```

---

## 成本估算

### Vercel免费额度
- 带宽：100GB/月
- 构建时间：6000分钟/月
- Serverless Functions：100GB执行时间/月

### Render免费额度
- Web Service：750小时/月
- 内存：512MB
- CPU：共享

### 预估月度成本
- 小型应用：$0（免费额度足够）
- 中型应用：$5-20（超出免费额度）
- 大型应用：$50+（需要升级计划）

---

## 安全建议

1. **环境变量保护**
   - 不要在代码中硬编码敏感信息
   - 使用Vercel环境变量存储密钥

2. **API安全**
   - 实施速率限制
   - 添加认证机制
   - 验证输入数据

3. **数据库安全**
   - 使用强密码
   - 限制数据库访问IP
   - 定期备份数据

---

## 更新和维护

### 持续集成
```bash
# 每次推送自动部署
git push origin main
```

### 手动部署
```bash
# 前端
cd frontend && vercel --prod

# 后端
cd backend && vercel --prod
```

### 回滚部署
在Vercel Dashboard中：
1. 进入项目设置
2. 选择"Deployments"
3. 点击旧版本旁边的"..."菜单
4. 选择"Promote to Production"

---

## 联系和支持

- **Vercel文档**: https://vercel.com/docs
- **Render文档**: https://render.com/docs
- **React文档**: https://react.dev
- **Ant Design文档**: https://ant.design

---

## 下一步

部署完成后，建议：
1. 设置自定义域名
2. 配置SSL证书
3. 设置监控告警
4. 配置自动备份
5. 建立CI/CD流程
