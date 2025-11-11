import Link from 'next/link';

export function GoToHome() {
	return (
		<Link href="/home" passHref>
			<div className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 cursor-pointer">
				点击跳转到 /home 路由
			</div>
		</Link>
	);
}

export function GoBack() {
	return (
		<Link href="/" passHref>
			<div className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 cursor-pointer">
				点击跳回 / 路由
			</div>
		</Link>
	);
}
