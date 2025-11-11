# 🚀 Natours 项目部署指南

本文档说明如何同时运行 Next.js 前端和 natours-backend 后端应用。

## 📋 前提条件

确保您已经安装了以下软件：

- Node.js 18+
- npm 或 yarn
- Git

## 🏗️ 项目结构

假设您的项目结构如下：

```
your-workspace/
├── natours/           # Next.js 前端 (当前项目)
└── natours-backend/   # 后端 API 应用
```

## 🔧 后端启动

### 1. 进入后端目录

```bash
cd natours-backend
```

### 2. 安装依赖（如果需要）

```bash
npm install
```

### 3. 启动后端服务器

```bash
npm start
# 或者
npm run dev
```

后端服务器应该运行在 `http://localhost:8000`

### 4. 验证后端 API

```bash
curl http://localhost:8000/api/v1/tours
```

应该返回旅游路线数据。

## 🎨 前端启动

### 1. 进入前端目录

```bash
cd natours
```

### 2. 安装依赖（如果需要）

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

前端服务器应该运行在 `http://localhost:3000`

## 🌐 同时运行前后端

### 方法一：分别启动两个终端

**终端 1 - 后端：**

```bash
cd natours-backend
npm start
```

**终端 2 - 前端：**

```bash
cd natours
npm run dev
```

### 方法二：使用 concurrently（推荐）

在前端项目中安装 concurrently：

```bash
cd natours
npm install --save-dev concurrently
```

然后在 `package.json` 中添加脚本：

```json
{
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "eslint",
		"dev:full": "concurrently \"cd ../natours-backend && npm start\" \"npm run dev\""
	}
}
```

然后运行：

```bash
npm run dev:full
```

## 🔗 API 连接配置

前端已经配置为连接到 `http://localhost:8000/api/v1`，通过环境变量管理：

### 环境变量文件 (`.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

### API 服务配置

前端通过 [`src/app/services/api.ts`](src/app/services/api.ts) 文件连接到后端：

```typescript
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
```

## 🧪 测试连接

### 1. 验证后端运行

访问 `http://localhost:8000/api/v1/tours` 应该返回 JSON 数据。

### 2. 验证前端运行

访问 `http://localhost:3000` 应该显示前端界面。

### 3. 测试完整流程

1. 在 `http://localhost:3000` 注册新用户
2. 登录系统
3. 浏览旅游路线
4. 查看旅游详情
5. 发表评论

## 🔍 常见问题解决

### 问题 1: CORS 错误

如果遇到 CORS 错误，需要在后端启用 CORS：

**后端解决方案：**

```javascript
// 在后端应用中添加 CORS 中间件
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
```

### 问题 2: 端口冲突

如果端口被占用，可以修改端口：

**修改后端端口：**

```bash
# 在后端 package.json 中修改启动脚本
"start": "node server.js --port 8001"
```

**修改前端 API 配置：**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api/v1
```

### 问题 3: API 连接失败

检查网络连接和后端服务状态：

```bash
# 检查后端是否运行
curl http://localhost:8000/api/v1/tours

# 检查前端环境变量
echo $NEXT_PUBLIC_API_BASE_URL
```

## 📊 生产环境部署

### 前端构建

```bash
npm run build
npm start
```

### 后端部署

确保后端服务运行在可访问的 URL，然后更新前端环境变量：

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api/v1
```

## 🔒 安全注意事项

1. **环境变量安全**：不要将 `.env.local` 提交到版本控制
2. **API 密钥**：在生产环境中使用安全的 API 密钥
3. **CORS 配置**：在生产环境中限制允许的域名

## 📞 技术支持

如果遇到问题：

1. 检查控制台错误信息
2. 验证网络连接
3. 确认端口没有被占用
4. 检查环境变量配置

---

**祝您部署顺利！** 🎉
