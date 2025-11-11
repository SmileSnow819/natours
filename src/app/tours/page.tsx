'use client';

import React, { useEffect, useState } from 'react';
import { toursAPI } from '../services/api';
import type { Tour } from '../types/tours';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getTourImages } from '../utils/imageMapping';

export default function ToursPage() {
	const [tours, setTours] = useState<Tour[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState({
		difficulty: '',
		priceRange: '',
		sort: 'name',
	});

	useEffect(() => {
		fetchTours();
	}, [filters]);

	const fetchTours = async () => {
		try {
			setLoading(true);
			const params: any = {};

			if (filters.difficulty) {
				params.difficulty = filters.difficulty;
			}

			if (filters.priceRange) {
				const [min, max] = filters.priceRange.split('-').map(Number);
				if (max) {
					params.price = { gte: min, lte: max };
				} else {
					params.price = { gte: min };
				}
			}

			if (filters.sort) {
				params.sort = filters.sort === 'price' ? 'price' : '-price';
			}

			const response = await toursAPI.getTours(params);
			setTours(response.data.data);
		} catch (err: any) {
			setError(err.response?.data?.message || '加载失败');
		} finally {
			setLoading(false);
		}
	};

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const clearFilters = () => {
		setFilters({
			difficulty: '',
			priceRange: '',
			sort: 'name',
		});
	};

	if (loading && tours.length === 0)
		return <p className="text-center mt-10">加载中...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						所有旅游路线
					</h1>
					<p className="text-gray-600">探索我们精心设计的旅游项目</p>
				</div>

				{/* Filters */}
				<div className="bg-white rounded-lg shadow p-6 mb-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								难度级别
							</label>
							<select
								value={filters.difficulty}
								onChange={(e) =>
									handleFilterChange('difficulty', e.target.value)
								}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
							>
								<option value="">全部</option>
								<option value="easy">简单</option>
								<option value="medium">中等</option>
								<option value="difficult">困难</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								价格范围
							</label>
							<select
								value={filters.priceRange}
								onChange={(e) =>
									handleFilterChange('priceRange', e.target.value)
								}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
							>
								<option value="">全部</option>
								<option value="0-1000">¥0 - ¥1000</option>
								<option value="1000-2000">¥1000 - ¥2000</option>
								<option value="2000-3000">¥2000 - ¥3000</option>
								<option value="3000-">¥3000以上</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								排序方式
							</label>
							<select
								value={filters.sort}
								onChange={(e) => handleFilterChange('sort', e.target.value)}
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
							>
								<option value="name">名称排序</option>
								<option value="price">价格从低到高</option>
								<option value="-price">价格从高到低</option>
							</select>
						</div>

						<div className="flex items-end">
							<button
								onClick={clearFilters}
								className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
							>
								清除筛选
							</button>
						</div>
					</div>
				</div>

				{/* Tours Grid */}
				{tours.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">没有找到符合条件的旅游路线</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{tours.map((tour) => (
							<Link key={tour._id} href={`/tours/${tour._id}`}>
								<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
									<div className="h-48 relative bg-gray-200">
										<Image
											src={getTourImages(tour._id).cover}
											alt={tour.name}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
									<div className="p-6">
										<div className="flex justify-between items-start mb-2">
											<h2 className="text-xl font-bold text-gray-900">
												{tour.name}
											</h2>
											<span className="bg-teal-100 text-teal-800 text-sm font-medium px-2 py-1 rounded">
												{tour.difficulty}
											</span>
										</div>
										<p className="text-gray-600 mb-4 line-clamp-2">
											{tour.summary}
										</p>

										<div className="flex justify-between items-center mb-4">
											<div className="flex items-center text-sm text-gray-500">
												<svg
													className="w-4 h-4 mr-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
														clipRule="evenodd"
													/>
												</svg>
												{tour.duration}天
											</div>
											<div className="flex items-center text-sm text-gray-500">
												<svg
													className="w-4 h-4 mr-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
												</svg>
												最多{tour.maxGroupSize}人
											</div>
										</div>

										<div className="flex justify-between items-center">
											<div className="flex items-center">
												<svg
													className="w-4 h-4 text-yellow-400 mr-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<span className="text-sm text-gray-600">
													{tour.ratingsAverage} ({tour.ratingsQuantity} 评价)
												</span>
											</div>
											<span className="text-2xl font-bold text-teal-600">
												¥{tour.price}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
