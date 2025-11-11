'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Tour, ToursResponse } from '@/app/types/tours';
// import Image from 'next/image';

export default function ToursPage() {
	const [tours, setTours] = useState<Tour[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTours = async () => {
			try {
				const res = await axios.get<ToursResponse>(
					'http://localhost:8000/api/v1/tours',
				);
				console.log(res);
				setTours(res.data.data.data); // 注意：接口嵌套了两层 data
			} catch (err: any) {
				setError(err.message || '加载失败');
			} finally {
				setLoading(false);
			}
		};

		fetchTours();
	}, []);

	if (loading) return <p className="text-center mt-10">加载中...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">可选旅游项目</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{tours.map((tour) => (
					<div
						key={tour.id}
						className="border rounded-lg shadow p-4 hover:shadow-lg transition"
					>
						{/* <Image
							src={`/img/tours/${tour.imageCover}`}
							alt={tour.name}
							fill={true}
							className="object-cover"
						/> */}
						<h2 className="font-bold text-lg mb-2">{tour.name}</h2>
						<p className="text-gray-600 mb-2">{tour.summary}</p>
						<p className="text-sm text-gray-500">
							难度：{tour.difficulty} | 时长：{tour.duration}天
						</p>
						<p className="font-semibold mt-2 text-green-600">￥{tour.price}</p>
					</div>
				))}
			</div>
		</div>
	);
}
