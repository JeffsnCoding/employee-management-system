# 员工管理系统保姆级部署教程

本教程专为零基础用户设计，手把手教您将员工管理系统部署到线上，无需任何编程基础，只需跟着步骤操作即可。

---

## 📋 目录

1. [前置准备](#前置准备)
2. [前端部署到Vercel](#前端部署到vercel)
3. [后端部署到Render](#后端部署到render)
4. [配置和测试](#配置和测试)
5. [常见问题解决](#常见问题解决)
6. [后续维护](#后续维护)

---

## 前置准备

### 步骤1：注册GitHub账号（必需）

**为什么需要GitHub？**

1. Vercel和Render都支持从GitHub自动部署
2. 代码需要存储在GitHub上
3. 免费且安全

**操作步骤：**

1. 访问 https://github.com
2. 点击右上角"Sign up"按钮
3. 选择注册方式：
   - **推荐**：使用邮箱注册
   - 也可以使用Google或Microsoft账号登录
4. 填写注册信息：
   - 用户名：建议用英文，如 `employee-system-2024`
   - 邮箱：填写真实邮箱
   - 密码：设置强密码（至少8位，包含字母和数字）
5. 验证邮箱（如果需要）
6. 完成注册

**✅ 完成标志：**

- 成功登录GitHub
- 看到GitHub首页

---

### 步骤2：注册Vercel账号（必需）

**什么是Vercel？**

- 免费的前端部署平台
- 自动HTTPS和CDN加速
- 每月100GB免费流量

**操作步骤：**

1. 访问 https://vercel.com
2. 点击右上角"Sign Up"
3. 选择"Continue with GitHub"
4. 授权Vercel访问您的GitHub账号
5. 填写用户信息：
   - 用户名：建议用英文
   - 邮箱：自动从GitHub获取
6. 点击"Create Account"

**✅ 完成标志：**

- 成功登录Vercel Dashboard
- 看到欢迎页面

---

### 步骤3：注册Render账号（必需）

**什么是Render？**

- 免费的后端部署平台
- 提供稳定的Web服务
- 每月750小时免费使用时间

**操作步骤：**

1. 访问 https://render.com
2. 点击右上角"Sign Up"
3. 选择"Continue with GitHub"
4. 授权Render访问您的GitHub账号
5. 确认用户信息
6. 点击"Create Account"

**✅ 完成标志：**

- 成功登录Render Dashboard
- 看到欢迎页面

---

### 步骤4：安装Git工具（可选但推荐）

**Windows用户：**

1. 访问 https://git-scm.com/download/win

2. 下载并安装Git

3. 安装时选择默认选项即可

4. 安装完成后，打开PowerShell或CMD

5. 输入以下命令验证：
   
   ```bash
   git --version
   ```

6. 如果看到版本号，说明安装成功

**Mac用户：**

1. 打开终端（Terminal）

2. 输入以下命令：
   
   ```bash
   git --version
   ```

3. 如果提示安装，按提示操作即可

**✅ 完成标志：**

- 终端能显示Git版本号

---

### 步骤5：上传代码到GitHub

**方法一：使用Git（推荐）**

1. 在项目文件夹打开终端：
   
   ```bash
   cd d:\TraeCode\week02\EmployeeManage
   ```

2. 初始化Git仓库：
   
   ```bash
   git init
   ```

3. 添加所有文件：
   
   ```bash
   git add .
   ```

4. 提交代码：
   
   ```bash
   git commit -m "Initial commit"
   ```

5. 在GitHub创建新仓库：
   
   - 访问 https://github.com/new
   - 仓库名称：`employee-management-system`
   - 设置为Public（公开）
   - 点击"Create repository"

6. 连接本地仓库到GitHub：
   
   ```bash
   git remote add origin https://github.com/你的用户名/employee-management-system.git
   ```

7. 推送代码：
   
   ```bash
   git branch -M main
   git push -u origin main
   ```

**方法二：使用GitHub网页（简单）**

1. 访问 https://github.com/new

2. 创建新仓库：
   
   - 仓库名称：`employee-management-system`
   - 设置为Public
   - 点击"Create repository"

3. 上传文件：
   
   - 点击"uploading an existing file"
   - 选择项目文件夹
   - 上传所有文件
   - 在底部填写提交信息
   - 点击"Commit changes"

**✅ 完成标志：**

- GitHub仓库包含所有项目文件
- 能在GitHub上看到代码

---

## 前端部署到Vercel

### 步骤1：安装Vercel CLI（可选但推荐）

**为什么安装CLI？**

- 命令行部署更快
- 可以查看部署日志
- 方便后续更新

**操作步骤：**

1. 打开PowerShell或CMD

2. 输入以下命令：
   
   ```bash
   npm install -g vercel
   ```

3. 等待安装完成（可能需要1-2分钟）

4. 验证安装：
   
   ```bash
   vercel --version
   ```

**✅ 完成标志：**

- 终端显示Vercel版本号

---

### 步骤2：登录Vercel

**操作步骤：**

1. 在终端输入：
   
   ```bash
   vercel login
   ```

2. 选择登录方式：
   
   - 输入 `y` 选择GitHub登录
   - 浏览器会自动打开
   - 点击"Authorize Vercel"

3. 等待登录成功提示

**✅ 完成标志：**

- 终端显示"Logged in as..."
- Vercel Dashboard显示已登录状态

---

### 步骤3：部署前端

**重要提示：**

- 确保当前在项目根目录
- 确保已连接到GitHub

**操作步骤：**

1. 进入前端目录：
   
   ```bash
   cd d:\TraeCode\week02\EmployeeManage\frontend
   ```

2. 构建项目：
   
   ```bash
   npm run build
   ```

3. 等待构建完成（可能需要2-5分钟）
   
   - 看到"dist"文件夹生成
   - 看到"Build completed"提示

4. 部署到Vercel：
   
   ```bash
   vercel --prod
   ```

5. 按照提示操作：
   
   - 问"Set up and deploy..."？输入 `Y`
   - 问"Link to existing project"？输入 `N`
   - 问"What's your project's name？"输入项目名（如：employee-frontend）
   - 问"In which directory is your code located？"输入 `./`
   - 问"Want to modify these settings"？输入 `N`

6. 等待部署完成（可能需要3-5分钟）
   
   - 看到"Deployed to Production"提示
   - 会提供一个URL，如：https://employee-frontend.vercel.app

**✅ 完成标志：**

- 终端显示部署成功的URL
- Vercel Dashboard显示部署状态为"Ready"

---

### 步骤4：配置前端环境变量

**为什么需要环境变量？**

- 前端需要知道后端的地址
- 开发环境和生产环境地址不同

**操作步骤：**

1. 访问Vercel Dashboard
2. 找到你的项目（employee-frontend）
3. 点击"Settings"标签
4. 点击"Environment Variables"
5. 点击"Add New"
6. 添加以下变量：
   - **Name**: `VITE_API_URL`
   - **Value**: 暂时留空，等后端部署后再填写
   - **Environment**: 选择"Production", "Preview", "Development"三个都勾选
7. 点击"Save"

**✅ 完成标志：**

- 环境变量列表中显示 `VITE_API_URL`

---

### 步骤5：验证前端部署

**操作步骤：**

1. 打开浏览器
2. 访问Vercel提供的URL（如：https://employee-frontend.vercel.app）
3. 检查页面：
   - 能看到页面标题
   - 能看到导航菜单
   - 可能会看到API错误（正常，因为后端还未部署）

**✅ 完成标志：**

- 页面能正常打开
- 界面显示正常

---

## 后端部署到Render

### 步骤1：准备后端代码

**重要：需要修改后端代码以适配Render**

**修改1：创建 `backend/vercel.json` 文件**

创建文件 `d:\TraeCode\week02\EmployeeManage\backend\vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/server.js"
    }
  ]
}
```

**修改2：确保package.json正确**

检查 `backend/package.json` 文件，确保包含：

```json
{
  "name": "employee-backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "sequelize": "^6.35.0",
    "sqlite3": "^5.1.6"
  }
}
```

**修改3：更新后端代码以支持Render**

修改 `backend/src/server.js` 文件：

```javascript
const express = require('express')
const cors = require('cors')
const employeeRoutes = require('./routes/employees')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: '*'  // 允许所有来源访问
}))

app.use(express.json())

app.use('/api/employees', employeeRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})
```

**✅ 完成标志：**

- 后端代码已修改完成
- package.json配置正确

---

### 步骤2：在GitHub创建后端仓库（可选）

**如果前后端在同一个仓库，跳过此步骤**

**操作步骤：**

1. 访问 https://github.com/new

2. 创建新仓库：
   
   - 仓库名称：`employee-backend`
   - 设置为Public
   - 点击"Create repository"

3. 上传后端代码：
   
   - 复制backend文件夹内容
   - 上传到新仓库
   - 或使用Git推送

**✅ 完成标志：**

- 后端代码在GitHub仓库中

---

### 步骤3：在Render创建Web Service

**操作步骤：**

1. 访问 https://dashboard.render.com

2. 点击右上角"New +"

3. 选择"Web Service"

4. 连接GitHub：
   
   - 点击"Connect GitHub"
   - 如果首次连接，点击"Configure GitHub App"
   - 授权Render访问GitHub
   - 选择后端仓库（employee-backend或employee-management-system）
   - 点击"Connect"

5. 配置服务：
   
   - **Name**: `employee-backend`
   - **Region**: 选择`Singapore`（新加坡，亚洲访问快）
   - **Branch**: 选择`main`
   - **Root Directory**: 如果前后端在同一仓库，输入`backend`
   - **Runtime**: 选择`Node`
   - **Build Command**: 输入`npm install`
   - **Start Command**: 输入`node src/server.js`
   - **Instance Type**: 选择`Free`

6. 点击"Create Web Service"

**✅ 完成标志：**

- Render开始部署
- 看到部署进度条

---

### 步骤4：配置环境变量

**操作步骤：**

1. 在部署页面，找到"Environment"部分

2. 点击"Add Environment Variable"

3. 添加以下变量：
   
   **变量1：PORT**
   
   - Key: `PORT`
   - Value: `5000`
   
   **变量2：NODE_ENV**
   
   - Key: `NODE_ENV`
   - Value: `production`

4. 点击"Save"

5. 等待服务重新部署

**✅ 完成标志：**

- 环境变量列表显示添加的变量
- 服务自动重新部署

---

### 步骤5：获取后端URL

**操作步骤：**

1. 在Render Dashboard找到你的服务

2. 点击服务名称（employee-backend）

3. 在顶部找到URL，格式如：
   
   - `https://employee-backend.onrender.com`

4. 复制这个URL

**✅ 完成标志：**

- 已复制后端URL
- URL格式正确

---

### 步骤6：更新前端环境变量

**操作步骤：**

1. 回到Vercel Dashboard

2. 进入前端项目设置

3. 点击"Environment Variables"

4. 找到 `VITE_API_URL`

5. 点击编辑

6. 修改Value为：
   
   ```
   https://employee-backend.onrender.com/api
   ```
   
   - 注意：加上`/api`后缀

7. 点击"Save"

8. 等待前端重新部署

**✅ 完成标志：**

- VITE_API_URL已更新
- 前端自动重新部署

---

## 配置和测试

### 步骤1：测试后端API

**操作步骤：**

1. 打开浏览器

2. 访问：`https://employee-backend.onrender.com/health`

3. 应该看到：
   
   ```json
   {
     "status": "ok",
     "message": "Server is running"
   }
   ```

4. 测试员工API：
   
   - 访问：`https://employee-backend.onrender.com/api/employees`
   - 应该看到员工数据列表

**✅ 完成标志：**

- API返回正确的JSON数据
- 无错误提示

---

### 步骤2：测试前端应用

**操作步骤：**

1. 打开浏览器
2. 访问：`https://employee-frontend.vercel.app`
3. 检查功能：
   - **数据概览**：能看到统计数字
   - **员工列表**：能看到员工数据
   - **添加员工**：能打开添加表单
   - **编辑员工**：能打开编辑表单
   - **删除员工**：能删除员工
   - **数据看板**：能看到图表

**✅ 完成标志：**

- 所有功能正常工作
- 无错误提示
- 数据能正常加载

---

### 步骤3：测试跨域访问

**操作步骤：**

1. 在前端页面打开浏览器开发者工具（F12）
2. 切换到"Console"标签
3. 检查是否有CORS错误
4. 如果没有错误，说明配置正确

**✅ 完成标志：**

- 控制台无CORS错误
- API请求成功

---

## 常见问题解决

### 问题1：前端显示"无法连接到服务器"

**可能原因：**

1. 后端URL配置错误
2. 后端服务未启动
3. CORS配置问题

**解决步骤：**

1. 检查Vercel环境变量：
   
   - 确认`VITE_API_URL`正确
   - 格式应该是：`https://employee-backend.onrender.com/api`

2. 检查Render服务状态：
   
   - 访问Render Dashboard
   - 查看服务是否为"Live"状态
   - 如果不是，查看日志找出问题

3. 检查浏览器控制台：
   
   - 按F12打开开发者工具
   - 查看Console标签的错误信息
   - 根据错误提示解决问题

---

### 问题2：后端部署失败

**可能原因：**

1. 代码语法错误
2. 依赖安装失败
3. 端口配置错误

**解决步骤：**

1. 查看Render日志：
   
   - 在Render Dashboard点击服务
   - 点击"Logs"标签
   - 查看错误信息

2. 常见错误及解决：
   
   - **Module not found**: 检查package.json中的依赖
   - **Port in use**: 确认PORT环境变量设置为5000
   - **Syntax error**: 检查代码语法

3. 重新部署：
   
   - 在Render Dashboard点击"Manual Deploy"
   - 选择"Deploy latest commit"

---

### 问题3：前端构建失败

**可能原因：**

1. 依赖版本冲突
2. 代码错误
3. 环境变量缺失

**解决步骤：**

1. 查看Vercel构建日志：
   
   - 在Vercel Dashboard点击项目
   - 点击"Deployments"标签
   - 点击失败的部署查看日志

2. 常见错误及解决：
   
   - **Dependency conflict**: 运行`npm install --legacy-peer-deps`
   - **Build error**: 检查代码错误
   - **Missing env var**: 添加缺失的环境变量

3. 重新部署：
   
   - 推送新代码到GitHub
   - Vercel会自动重新部署

---

### 问题4：数据库文件丢失

**可能原因：**

1. Render每次部署会重置文件系统
2. SQLite数据库文件会被删除

**解决步骤：**

**方案一：使用外部数据库服务（推荐）**

1. 注册Supabase（免费）：
   
   - 访问 https://supabase.com
   - 创建新项目
   - 创建PostgreSQL数据库
   - 获取连接字符串

2. 修改后端代码使用PostgreSQL：
   
   ```bash
   cd backend
   npm install pg
   ```

3. 更新数据库配置：
   创建 `backend/src/database/config.js`：
   
   ```javascript
   const { Pool } = require('pg')
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL
   })
   
   module.exports = pool
   ```

4. 在Render添加环境变量：
   
   - Key: `DATABASE_URL`
   - Value: Supabase提供的连接字符串

**方案二：使用持久化存储（临时方案）**

1. 修改后端代码，在启动时检查数据库文件：
   
   ```javascript
   const fs = require('fs')
   const path = require('path')
   
   const dbPath = path.join(__dirname, '../../database/employees.db')
   if (!fs.existsSync(dbPath)) {
     // 初始化数据库
   }
   ```

2. 注意：这个方案在服务重启后仍可能丢失数据

---

### 问题5：访问速度慢

**可能原因：**

1. 服务器位置远
2. 数据库查询慢
3. 资源限制

**解决步骤：**

1. 检查服务器位置：
   
   - Render Dashboard查看Region
   - 如果选择的是美国，改为新加坡

2. 优化数据库查询：
   
   - 添加索引
   - 使用分页

3. 升级服务计划：
   
   - Render付费计划提供更多资源
   - Vercel付费计划提供更多带宽

---

## 后续维护

### 如何更新代码

**更新前端：**

1. 修改本地代码

2. 提交到GitHub：
   
   ```bash
   git add .
   git commit -m "Update frontend"
   git push
   ```

3. Vercel会自动检测到更新并重新部署

**更新后端：**

1. 修改本地代码

2. 提交到GitHub：
   
   ```bash
   git add .
   git commit -m "Update backend"
   git push
   ```

3. Render会自动检测到更新并重新部署

---

### 如何查看日志

**Vercel日志：**

1. 访问Vercel Dashboard
2. 点击项目
3. 点击"Logs"标签
4. 可以查看实时日志

**Render日志：**

1. 访问Render Dashboard
2. 点击服务
3. 点击"Logs"标签
4. 可以查看实时日志

---

### 如何回滚版本

**Vercel回滚：**

1. 访问Vercel Dashboard
2. 点击项目
3. 点击"Deployments"标签
4. 找到之前的成功版本
5. 点击"..."菜单
6. 选择"Promote to Production"

**Render回滚：**

1. 访问Render Dashboard
2. 点击服务
3. 点击"Events"标签
4. 找到之前的成功部署
5. 点击"Redeploy"

---

## 费用说明

### 免费额度

**Vercel免费计划：**

- 带宽：100GB/月
- 构建时间：6000分钟/月
- Serverless Functions：100GB执行时间/月
- 无限项目数量

**Render免费计划：**

- Web Service：750小时/月
- 内存：512MB
- CPU：共享
- 无限带宽

### 超出免费额度

**Vercel：**

- 超出带宽：$20/100GB
- 超出构建时间：$10/1000分钟

**Render：**

- 超出750小时：$7/月
- 升级到Standard：$25/月

---

## 成功标志

当您完成以下所有步骤，说明部署成功：

✅ **前端部署成功**

- 能访问 https://employee-frontend.vercel.app
- 页面显示正常
- 无构建错误

✅ **后端部署成功**

- 能访问 https://employee-backend.onrender.com
- API返回正确数据
- 服务状态为"Live"

✅ **功能测试通过**

- 员工列表能正常显示
- 添加/编辑/删除功能正常
- 数据看板图表正常显示
- 搜索和筛选功能正常

✅ **跨域配置正确**

- 前端能正常调用后端API
- 无CORS错误

---

## 获取帮助

如果遇到问题：

1. **查看日志**
   
   - Vercel: https://vercel.com/dashboard
   - Render: https://dashboard.render.com

2. **官方文档**
   
   - Vercel: https://vercel.com/docs
   - Render: https://render.com/docs

3. **社区支持**
   
   - GitHub Issues
   - Stack Overflow
   - Vercel Discord
   - Render Community

---

## 恭喜！

🎉 您已经成功将员工管理系统部署到线上！

现在您可以：

- 通过任何设备访问您的应用
- 分享链接给他人使用
- 继续开发和添加新功能

**下一步建议：**

1. 设置自定义域名
2. 配置HTTPS证书（如果使用自定义域名）
3. 设置监控告警
4. 定期备份数据
5. 建立CI/CD流程

祝您使用愉快！🚀
