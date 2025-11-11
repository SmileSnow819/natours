import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
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
	// 异步函数，用于定义重定向规则
	async redirects() {
		return [
			{
				// 匹配的源路径 (用户访问的路径)
				source: '/',
				// 目标路径 (重定向到的路径)
				destination: '/tours',
				// permanent: true 表示永久重定向 (HTTP 状态码 308)，对 SEO 友好且浏览器会缓存此跳转。
				// 如果只是临时跳转，请设置为 false (HTTP 状态码 307)。
				permanent: true,
			},
		];
	},
};

export default nextConfig;
