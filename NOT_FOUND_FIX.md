# 后端服务Not Found问题排查指南

## 问题现象
访问 `https://employee-backend.onrender.com/health` 返回 "Not Found"

---

## 排查步骤

### 步骤1：确认Render服务状态

1. 访问 https://dashboard.render.com
2. 找到 `employee-backend` 服务
3. 查看服务状态：

**状态说明：**
- **Live** - 服务正在运行
- **Deploying** - 正在部署中
- **Build failed** - 构建失败
- **Crashed** - 服务崩溃

---

### 步骤2：获取正确的服务URL

在Render Dashboard中：

1. 点击服务名称
2. 在页面顶部找到服务URL
3. 复制完整的URL

**可能的URL格式：**
- `https://employee-backend.onrender.com`
- `https://employee-backend-xxxx.onrender.com`
- `https://xxxx.onrender.com`

**重要：** 使用Render Dashboard中显示的实际URL，而不是假设的URL

---

### 步骤3：查看部署日志

在Render Dashboard中：

1. 点击服务名称
2. 点击"Logs"标签
3. 查找关键信息：

#### 成功启动的日志：
```
Building...
Installing dependencies...
> employee-backend@1.0.0 postinstall
> npm rebuild sqlite3
sqlite3@5.1.6 rebuild completed
Build completed
Starting server...
Creating database directory...
Database not found, initializing...
Database initialized successfully
Server is running on port 5000
```

#### 失败的日志：
```
Error: listen EADDRINUSE :::5000
Cannot find module 'xxx'
/opt/render/project/src/backend/...
```

#### 还在部署中的日志：
```
Building...
Installing dependencies...
```

---

## 常见问题和解决方案

### 问题1：服务还在部署中

**症状：**
- 服务状态显示 "Deploying" 或 "Building"
- 访问URL返回 "Not Found"

**解决：**
1. 等待3-5分钟
2. 刷新Render Dashboard查看状态
3. 查看日志确认部署进度

---

### 问题2：服务URL不正确

**症状：**
- 使用了错误的URL
- 访问返回 "Not Found"

**解决：**
1. 在Render Dashboard中找到正确的URL
2. 使用实际的URL，如：`https://employee-backend-abc123.onrender.com`
3. 不要使用假设的URL

---

### 问题3：服务启动失败

**症状：**
- 服务状态显示 "Crashed"
- 日志中有错误信息

**解决：**

#### 情况A：端口被占用
```
Error: listen EADDRINUSE :::5000
```

**解决：**
1. 在Render Dashboard中点击服务
2. 点击"Settings"
3. 找到"Environment Variables"
4. 确认 `PORT` 设置为 `5000`
5. 如果仍然失败，尝试其他端口（如 `3000`）

#### 情况B：数据库初始化失败
```
Database not found, initializing...
Error: ...
```

**解决：**
1. 查看详细的错误信息
2. 检查数据库路径配置
3. 确认数据库目录权限

#### 情况C：模块加载失败
```
Cannot find module 'xxx'
```

**解决：**
1. 检查package.json中的依赖
2. 确认Build Command是 `npm install`
3. 查看构建日志确认依赖已安装

---

### 问题4：Root Directory配置错误

**症状：**
- 日志显示错误路径：`/opt/render/project/src/backend/`
- 服务无法启动

**解决：**
1. 在Render Dashboard中点击服务
2. 点击"Settings"
3. 找到"Root Directory"
4. 确认设置为 `backend`
5. 如果不是，点击"Edit"修改为 `backend`
6. 保存后重新部署

---

### 问题5：路由配置问题

**症状：**
- 服务正常运行
- 但 `/health` 路由返回404

**解决：**

检查server.js中的路由配置：

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})
```

**确认：**
1. 路由定义在 `app.listen()` 之前
2. 路由路径正确（`/health`）
3. 没有中间件拦截请求

---

## 测试步骤

### 测试1：使用正确的URL

1. 在Render Dashboard中复制服务URL
2. 在浏览器中访问：`{服务URL}/health`
3. 例如：`https://employee-backend-abc123.onrender.com/health`

### 测试2：测试根路径

访问：`{服务URL}/`
- 如果返回 "Cannot GET /" - 说明服务正在运行，但没有根路由
- 如果返回其他内容 - 说明服务正常

### 测试3：测试API路由

访问：`{服务URL}/api/employees`
- 应该返回员工数据列表
- 如果返回404 - 检查路由配置

---

## 手动重新部署

如果以上方法都无效，尝试手动重新部署：

### 方法1：通过Dashboard

1. 访问 https://dashboard.render.com
2. 点击服务名称
3. 点击"Manual Deploy"
4. 选择"Deploy latest commit"
5. 等待部署完成

### 方法2：推送新代码

```bash
cd d:\TraeCode\week02\EmployeeManage
git add .
git commit -m "Trigger redeploy"
git push origin main
```

Render会自动检测到新提交并重新部署。

---

## 联系Render支持

如果问题仍未解决：

1. **查看Render文档**
   - https://render.com/docs
   - https://render.com/docs/troubleshooting

2. **提交支持请求**
   - 在Render Dashboard中点击"Support"
   - 提供详细的错误信息
   - 附上部署日志

3. **社区支持**
   - Render Community Discord
   - Stack Overflow

---

## 检查清单

在继续之前，请确认：

- [ ] 服务状态为 "Live"
- [ ] 使用了正确的服务URL
- [ ] 日志显示 "Server is running on port 5000"
- [ ] 数据库已初始化
- [ ] 无错误日志

---

## 下一步

一旦服务正常运行：

1. **测试所有API端点**
   - `/health` - 健康检查
   - `/api/employees` - 员工列表
   - `/api/employees/search?query=xxx` - 搜索
   - `/api/employees/department-distribution` - 部门分布
   - `/api/employees/position-salary-stats` - 薪资统计

2. **配置前端连接**
   - 更新Vercel环境变量
   - 使用正确的后端URL
   - 重新部署前端

3. **验证前后端集成**
   - 测试员工列表加载
   - 测试CRUD操作
   - 测试数据看板

---

**提示：** 最常见的问题是使用了错误的URL。请务必在Render Dashboard中复制实际的服务URL。
