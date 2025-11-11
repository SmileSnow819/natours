# 🚀 Natours 快速启动指南

## 📋 快速开始

### 步骤 1: 启动后端服务

```bash
cd natours-backend
npm start
```

后端将在 `http://localhost:8000` 启动

### 步骤 2: 启动前端服务

```bash
npm run dev
```

前端将在 `http://localhost:3000` 启动

### 步骤 3: 验证连接

1. 访问 `http://localhost:3000` 查看前端界面
2. 访问 `http://localhost:8000/api/v1/tours` 验证后端 API

## 🔧 问题解决

### 如果端口 3000 被占用

```bash
# 杀死占用端口的进程
npx kill-port 3000
# 然后重新启动
npm run dev
```

### 如果遇到 CORS 错误

确保后端已启用 CORS：

```javascript
// 在 natours-backend 中检查 CORS 配置
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
```

## 🎯 测试完整功能

1. **注册用户** → 在首页点击"注册"
2. **登录系统** → 使用注册的账户登录
3. **浏览旅游** → 点击"所有旅游"查看路线
4. **查看详情** → 点击任意旅游卡片查看详细信息
5. **发表评论** → 登录后在详情页发表评论
6. **个人中心** → 点击用户名管理个人信息

## 📞 技术支持

如果遇到问题：

- 检查控制台错误信息
- 确认后端服务正在运行
- 验证网络连接
- 查看 [DEPLOYMENT.md](DEPLOYMENT.md) 获取详细说明

---

**开始您的 Natours 之旅！** 🌟
