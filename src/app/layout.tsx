import AppBar from './components/AppBar';
import AppFooter from './components/AppFooter';
import { AuthProvider } from './contexts/AuthContext';
import './globals.css'; // 确保导入全局样式文件

export const metadata = {
	title: 'Next.js 结构示例',
	description: 'App Router 布局和页面分离示例',
};

/**
 * 根布局组件 (Root Layout) - 必须包含 <html> 和 <body>
 * 所有的页面内容 ({children}) 都会被自动注入到这个 <body> 标签内部。
 */
export default function RootLayout({
	children, // Next.js 自动传递 page.tsx 的内容到这里
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="zh">
			<body className="font-sans antialiased">
				<AuthProvider>
					{/* 导航栏*/}
					<AppBar></AppBar>

					{/* 页面内容注入区：所有 page.tsx 的内容都会自动放在这里 */}
					<main>{children}</main>

					{/* 页脚 */}
					<AppFooter></AppFooter>
				</AuthProvider>
			</body>
		</html>
	);
}
