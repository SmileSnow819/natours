# 🖼️ Natours 图片配置指南

本文档说明如何在 Natours 项目中管理和显示图片。

## 📁 图片存储结构

### 后端图片目录 (`natours-backend/public/img/`)

```
img/
├── tours/                    # 旅游相关图片
│   ├── tour-1-cover.jpg     # 旅游封面图
│   ├── tour-1-1.jpg         # 旅游详情图片
│   ├── tour-1-2.jpg
│   └── ...
├── users/                   # 用户头像
│   ├── default.jpg
│   ├── user-1.jpg
│   └── ...
└── logos/                   # 品牌标识
    ├── logo-green.png
    ├── logo-white.png
    └── ...
```

## 🔗 前端图片显示

### 1. Next.js 图片配置

在 [`next.config.ts`](next.config.ts) 中配置允许从后端加载图片：

```typescript
images: {
  domains: ['localhost'],
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '8000',
      pathname: '/img/**',
    },
  ],
},
```

### 2. 图片映射系统

由于图片信息没有存储在数据库中，我们使用前端映射系统来管理旅游ID与图片文件的对应关系。

#### 配置位置

- 图片映射配置：[`src/app/utils/imageMapping.ts`](src/app/utils/imageMapping.ts)
- 包含所有旅游路线的封面图和详情图片映射

#### 使用方法

```typescript
import { getTourImages } from '../utils/imageMapping';

// 获取旅游图片信息
const images = getTourImages(tourId);
// 返回：{ cover: string, images: string[] }
```

#### 当前支持的旅游路线

- 森林探险 (ID: 5c88fa8cf4afda39709c2955)
- 海滩度假 (ID: 5c88fa8cf4afda39709c2956)
- 山地徒步 (ID: 5c88fa8cf4afda39709c2957)
- 城市观光 (ID: 5c88fa8cf4afda39709c2958)
- 文化探索 (ID: 5c88fa8cf4afda39709c2959)
- 冒险之旅 (ID: 5c88fa8cf4afda39709c2960)
- 自然风光 (ID: 5c88fa8cf4afda39709c2961)
- 历史遗迹 (ID: 5c88fa8cf4afda39709c2962)
- 美食之旅 (ID: 5c88fa8cf4afda39709c2963)

### 3. 前端组件使用

```tsx
import Image from 'next/image';
import { getTourImages } from '../utils/imageMapping';

// 旅游封面图（使用图片映射）
<Image
	src={getTourImages(tour._id).cover}
	alt={tour.name}
	fill
	className="object-cover"
/>;

// 旅游详情图片画廊
{
	getTourImages(tour._id).images.map((image, index) => (
		<Image
			key={index}
			src={image}
			alt={`${tour.name} - 图片 ${index + 1}`}
			fill
			className="object-cover"
		/>
	));
}

// 用户头像
<Image
	src={`http://localhost:8000/img/users/${user.photo || 'default.jpg'}`}
	alt={user.name}
	width={40}
	height={40}
	className="rounded-full"
/>;
```

## 🗄️ 数据库图片字段

### 旅游路线模型

```javascript
{
  imageCover: "tour-1-cover.jpg",    // 封面图片
  images: ["tour-1-1.jpg", "tour-1-2.jpg", "tour-1-3.jpg"]  // 详情图片数组
}
```

### 用户模型

```javascript
{
	photo: 'user-1.jpg'; // 用户头像
}
```

## 🎨 图片命名规范

### 旅游图片

- **封面图**: `tour-{id}-cover.jpg`
- **详情图**: `tour-{id}-{sequence}.jpg`
- 示例: `tour-1-cover.jpg`, `tour-1-1.jpg`, `tour-1-2.jpg`

### 用户头像

- `user-{id}.jpg`
- 默认头像: `default.jpg`

## 🔧 图片管理最佳实践

### 1. 图片优化

- 使用适当的图片格式 (JPEG for photos, PNG for graphics)
- 优化图片大小 (封面图: 800x600, 详情图: 1200x800)
- 使用 WebP 格式以获得更好的性能

### 2. 错误处理

```tsx
<Image
	src={imageUrl}
	alt={altText}
	onError={(e) => {
		e.currentTarget.src = '/fallback-image.jpg';
	}}
/>
```

### 3. 加载状态

```tsx
<Image
	src={imageUrl}
	alt={altText}
	placeholder="blur"
	blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🚀 生产环境配置

### 1. 更新图片域名

在生产环境中，更新 `next.config.ts`：

```typescript
remotePatterns: [
	{
		protocol: 'https',
		hostname: 'your-backend-domain.com',
		pathname: '/img/**',
	},
];
```

### 2. CDN 配置

考虑使用 CDN 来提供图片：

```typescript
images: {
  domains: ['cdn.yourdomain.com'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.yourdomain.com',
      pathname: '/natours/**',
    },
  ],
},
```

## 🛠️ 开发工具

### 1. 图片压缩工具

- [TinyPNG](https://tinypng.com/) - 在线图片压缩
- [ImageOptim](https://imageoptim.com/) - 桌面图片优化工具

### 2. 图片转换工具

- [Squoosh](https://squoosh.app/) - 在线图片编辑和转换
- [Convertio](https://convertio.co/) - 格式转换工具

## 🛠️ 图片问题修复

### 常见问题及解决方案

#### 1. 图片显示404错误

**问题**: 图片无法加载，显示404错误
**原因**: 路径重复拼接或后端静态文件服务未正确配置
**解决方案**:

- 检查图片映射配置是否正确
- 确保后端在 `http://localhost:8000` 运行
- 验证静态文件服务配置

#### 2. 图片映射系统

**已修复的问题**:

- ✅ 旅游列表页面图片显示
- ✅ 旅游详情页面封面图显示
- ✅ 旅游详情页面图片画廊显示
- ✅ 默认图片处理

### 添加新的旅游图片

1. 将图片文件放入 `natours-backend/public/img/tours/` 目录
2. 在 [`src/app/utils/imageMapping.ts`](src/app/utils/imageMapping.ts) 中添加新的映射
3. 确保图片文件名与旅游ID对应

## 📝 注意事项

1. **CORS 配置**: 确保后端允许前端域名访问图片
2. **图片大小**: 监控图片文件大小，避免影响加载性能
3. **缓存策略**: 配置适当的缓存头以提高性能
4. **备份**: 定期备份图片资源
5. **图片映射**: 使用图片映射系统管理旅游ID与图片文件的对应关系

---

**享受使用 Natours 的图片功能！** 📸
