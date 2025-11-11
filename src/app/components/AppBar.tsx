'use client';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

// 使用 Lucide 风格的 SVG 图标作为 Logo 占位
const GlobeIcon = (props: any) => (
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		<path d="M2 12h20" />
	</svg>
);

// 导航按钮组件
interface NavButtonProps {
	children: React.ReactNode;
	primary?: boolean;
	onClick: () => void;
}

const NavButton = ({ children, primary = false, onClick }: NavButtonProps) => (
	<button
		onClick={onClick}
		className={`
            px-8 py-2 font-semibold transition-colors duration-200 rounded-lg cursor-pointer
            ${
							primary
								? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg'
								: 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-300'
						}
        `}
	>
		{children}
	</button>
);

const AppBar = () => {
	const { user, logout, isAuthenticated } = useAuth();

	const handleLogin = () => {
		window.location.href = '/login';
	};

	const handleSignup = () => {
		window.location.href = '/signup';
	};

	const handleLogout = () => {
		logout();
		window.location.href = '/';
	};

	return (
		<>
			{/* 导航条 (Header) */}
			<header className="h-20 sticky top-0 bg-white shadow-lg z-10 w-full px-4 sm:px-8 flex items-center justify-between">
				{/* 1. 左侧 - 导航链接 */}
				<div className="flex items-center space-x-4">
					<Link href={'/'}>
						<button className="text-teal-600 hover:text-teal-800 font-medium transition-colors text-sm sm:text-base p-2 rounded-md cursor-pointer">
							首页
						</button>
					</Link>
					<Link href={'/tours'}>
						<button className="text-teal-600 hover:text-teal-800 font-medium transition-colors text-sm sm:text-base p-2 rounded-md cursor-pointer">
							所有旅游
						</button>
					</Link>
				</div>

				{/* 2. 中间 - Logo */}
				{/* 使用绝对定位和 transform 确保 Logo 在视觉上完全居中，不受左右元素宽度影响 */}
				<div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
					<GlobeIcon className="w-6 h-6 text-teal-600" />
					<span className="text-xl sm:text-2xl font-black tracking-wider text-gray-800">
						NATOURS
					</span>
				</div>

				{/* 3. 右侧 - 用户操作按钮 */}
				<div className="flex items-center space-x-3">
					{isAuthenticated ? (
						<>
							<Link href="/profile">
								<button className="text-teal-600 hover:text-teal-800 font-medium transition-colors text-sm sm:text-base p-2 rounded-md cursor-pointer">
									{user?.name}
								</button>
							</Link>
							<NavButton onClick={handleLogout}>退出</NavButton>
						</>
					) : (
						<>
							<NavButton onClick={handleLogin}>登录</NavButton>
							<NavButton primary onClick={handleSignup}>
								注册
							</NavButton>
						</>
					)}
				</div>
			</header>
		</>
	);
};

export default AppBar;
