# Render部署错误修复指南

## 错误信息

```
Cannot find module '/opt/render/project/src/src/server.js'
```

## 问题原因

Render在错误的路径中查找 `server.js` 文件。路径中多了一个 `src` 目录，这是因为：

1. Render将代码部署到 `/opt/render/project/` 目录
2. 如果Root Directory设置为 `src`，Render会在 `/opt/render/project/src/` 中查找
3. package.json中的main字段是 `src/server.js`
4. 最终路径变成：`/opt/render/project/src/src/server.js`（错误）

## 解决方案

### 方案一：修改Render配置（推荐）

**适用于：前后端在同一个GitHub仓库**

#### 步骤1：登录Render Dashboard

1. 访问 https://dashboard.render.com
2. 找到你的后端服务（employee-backend）
3. 点击服务名称

#### 步骤2：修改Root Directory

1. 点击"Settings"标签
2. 找到"Root Directory"设置
3. 将其修改为：`backend`
4. 点击"Save Changes"

**说明：**

- 如果前后端在同一个仓库，Root Directory应该指向后端文件夹
- 这样Render会在 `/opt/render/project/backend/` 中查找
- package.json中的 `src/server.js` 就会正确解析为 `/opt/render/project/backend/src/server.js`

#### 步骤3：重新部署

1. 点击"Manual Deploy"
2. 选择"Deploy latest commit"
3. 等待部署完成

---

### 方案二：修改package.json（备选）

**适用于：后端单独在一个仓库**

#### 步骤1：修改package.json

将 `main` 字段修改为：

```json
{
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### 步骤2：移动server.js

将 `backend/src/server.js` 移动到 `backend/server.js`：

**Windows PowerShell:**

```powershell
cd d:\TraeCode\week02\EmployeeManage\backend
Move-Item -Path src\server.js -Destination server.js
```

**Mac/Linux:**

```bash
cd d:\TraeCode\week02\EmployeeManage\backend
mv src/server.js server.js
```

#### 步骤3：更新所有导入路径

需要更新所有引用server.js的文件：

**backend/src/controllers/employeeController.js:**

```javascript
// 如果有引用server.js的代码，需要更新路径
```

**backend/src/routes/employees.js:**

```javascript
// 如果有引用server.js的代码，需要更新路径
```

#### 步骤4：提交并推送

```bash
cd d:\TraeCode\week02\EmployeeManage
git add .
git commit -m "Fix server.js path"
git push
```

#### 步骤5：Render自动重新部署

Render会检测到新的提交并自动重新部署。

---

### 方案三：创建render.yaml配置文件（推荐）

**适用于：需要更精确控制部署配置**

#### 步骤1：创建render.yaml文件

在项目根目录（`d:\TraeCode\week02\EmployeeManage`）创建 `render.yaml` 文件：

```yaml
services:
  - type: web
    name: employee-backend
    env: node
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && node src/server.js
    envVars:
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production
```

#### 步骤2：提交并推送

```bash
cd d:\TraeCode\week02\EmployeeManage
git add render.yaml
git commit -m "Add render.yaml configuration"
git push
```

#### 步骤3：在Render中重新创建服务

1. 删除现有的employee-backend服务
2. 创建新的Web Service
3. Render会自动检测并使用render.yaml配置

---

## 验证修复

### 检查部署日志

1. 访问Render Dashboard
2. 点击服务名称
3. 点击"Logs"标签
4. 查找以下成功信息：

**成功标志：**

```
Server is running on port 5000
```

**失败标志：**

```
Cannot find module 'xxx'
Error: listen EADDRINUSE
```

### 测试API

1. 访问：`https://employee-backend.onrender.com/health`

2. 应该看到：
   
   ```json
   {
   "status": "ok",
   "message": "Server is running"
   }
   ```

3. 访问：`https://employee-backend.onrender.com/api/employees`

4. 应该看到员工数据列表

---

## 常见问题

### 问题1：修改Root Directory后仍然失败

**原因：** Render缓存了旧的配置

**解决：**

1. 删除现有服务
2. 重新创建服务
3. 正确设置Root Directory为 `backend`

---

### 问题2：找不到依赖模块

**原因：** 依赖安装失败

**解决：**

1. 检查package.json是否正确
2. 确保所有依赖都在dependencies中
3. 查看构建日志找出具体错误

---

### 问题3：数据库文件丢失

**原因：** Render每次部署会重置文件系统

**解决：**

**临时方案：** 在server.js中添加数据库初始化

```javascript
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../database/employees.db')

// 如果数据库文件不存在，初始化数据库
if (!fs.existsSync(dbPath)) {
  console.log('Database not found, initializing...')
  require('./database/init')
}
```

**永久方案：** 使用外部数据库（如Supabase）

---

## 推荐方案总结

### 如果前后端在同一个仓库：

**使用方案一（修改Render配置）：**

1. Root Directory设置为 `backend`
2. Build Command: `npm install`
3. Start Command: `node src/server.js`

### 如果前后端在不同仓库：

**使用方案二（修改package.json）：**

1. 将server.js移到backend根目录
2. 修改main字段为 `server.js`
3. Root Directory保持为空或 `./`

### 如果需要精确控制：

**使用方案三（render.yaml）：**

1. 创建render.yaml配置文件
2. 重新创建服务
3. Render自动应用配置

---

## 下一步

修复后端部署后，记得：

1. ✅ 更新前端的VITE_API_URL环境变量
2. ✅ 测试前端是否能正常调用后端API
3. ✅ 验证所有功能是否正常工作

---

## 获取帮助

如果问题仍未解决：

1. **查看Render日志**：https://dashboard.render.com
2. **查看Render文档**：https://render.com/docs
3. **联系Render支持**：support@render.com

---

**提示：** 修复后，建议使用方案一（修改Render配置），这是最简单和最可靠的方法。
