'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
					<div className="text-center">
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							探索世界
							<span className="block text-teal-200">发现自然之美</span>
						</h1>
						<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
							Natours
							带您体验最精彩的户外冒险，从森林徒步到海滩度假，发现大自然的无限魅力
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/tours">
								<button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
									浏览旅游路线
								</button>
							</Link>
							<Link href="/signup">
								<button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-colors">
									开始您的旅程
								</button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							为什么选择 Natours
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							我们提供最优质的旅游体验，让您的每一次旅行都成为难忘的回忆
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-teal-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								精选目的地
							</h3>
							<p className="text-gray-600">
								精心挑选全球最美景点，确保您体验到最纯粹的自然风光
							</p>
						</div>

						<div className="text-center p-6">
							<div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-teal-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								安全保障
							</h3>
							<p className="text-gray-600">
								专业导游团队，完善的安全措施，让您安心享受每一次冒险
							</p>
						</div>

						<div className="text-center p-6">
							<div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-teal-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								灵活安排
							</h3>
							<p className="text-gray-600">
								多种行程选择，可根据您的需求定制专属旅游计划
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Popular Tours Preview */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							热门旅游路线
						</h2>
						<p className="text-xl text-gray-600">探索我们最受欢迎的旅游项目</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Tour Preview Cards */}
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									森林探险
								</h3>
								<p className="text-gray-600 mb-4">
									深入神秘森林，体验大自然的原始魅力
								</p>
								<div className="flex justify-between items-center">
									<span className="text-teal-600 font-bold">¥1497</span>
									<Link href="/tours">
										<button className="text-teal-600 hover:text-teal-700 font-medium">
											了解更多 →
										</button>
									</Link>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									海滩度假
								</h3>
								<p className="text-gray-600 mb-4">
									放松身心，享受阳光沙滩的惬意时光
								</p>
								<div className="flex justify-between items-center">
									<span className="text-teal-600 font-bold">¥1999</span>
									<Link href="/tours">
										<button className="text-teal-600 hover:text-teal-700 font-medium">
											了解更多 →
										</button>
									</Link>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									山地徒步
								</h3>
								<p className="text-gray-600 mb-4">挑战自我，征服壮丽山峰</p>
								<div className="flex justify-between items-center">
									<span className="text-teal-600 font-bold">¥1299</span>
									<Link href="/tours">
										<button className="text-teal-600 hover:text-teal-700 font-medium">
											了解更多 →
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="text-center mt-12">
						<Link href="/tours">
							<button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors">
								查看所有旅游路线
							</button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
