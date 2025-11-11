'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toursAPI, reviewsAPI } from '../../services/api';
import type { Tour } from '../../types/tours';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { getTourImages } from '../../utils/imageMapping';

interface Review {
	_id: string;
	review: string;
	rating: number;
	createdAt: string;
	user: {
		_id: string;
		name: string;
		photo: string;
	};
}

export default function TourDetailPage() {
	const params = useParams();
	const tourId = params.id as string;

	const [tour, setTour] = useState<Tour | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [reviewForm, setReviewForm] = useState({ review: '', rating: 5 });
	const [submittingReview, setSubmittingReview] = useState(false);

	const { user, isAuthenticated } = useAuth();

	useEffect(() => {
		fetchTourData();
	}, [tourId]);

	const fetchTourData = async () => {
		try {
			setLoading(true);
			const [tourResponse, reviewsResponse] = await Promise.all([
				toursAPI.getTour(tourId),
				reviewsAPI.getReviews(tourId),
			]);

			setTour(tourResponse.data.document);
			setReviews(reviewsResponse.data.data || []);
		} catch (err: any) {
			setError(err.response?.data?.message || '加载失败');
		} finally {
			setLoading(false);
		}
	};

	const handleReviewSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isAuthenticated) {
			alert('请先登录后再发表评论');
			return;
		}

		try {
			setSubmittingReview(true);
			await reviewsAPI.createReview(reviewForm, tourId);
			setReviewForm({ review: '', rating: 5 });
			// 重新加载评论
			const reviewsResponse = await reviewsAPI.getReviews(tourId);
			setReviews(reviewsResponse.data.data || []);
		} catch (err: any) {
			alert(err.response?.data?.message || '发表评论失败');
		} finally {
			setSubmittingReview(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<LoadingSpinner size="lg" text="正在加载旅游详情..." />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="max-w-md w-full">
					<ErrorMessage
						message={error}
						onRetry={fetchTourData}
						showRetry={true}
					/>
				</div>
			</div>
		);
	}

	if (!tour) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-8 h-8 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						旅游路线不存在
					</h3>
					<p className="text-gray-600 mb-4">
						您查找的旅游路线可能已被删除或不存在。
					</p>
					<Link
						href="/tours"
						className="text-teal-600 hover:text-teal-700 font-medium"
					>
						返回旅游列表
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="relative h-96">
				<div className="absolute inset-0">
					<Image
						src={getTourImages(tour._id).cover}
						alt={tour.name}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black bg-opacity-40"></div>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white">
					<h1 className="text-4xl font-bold mb-4">{tour.name}</h1>
					<p className="text-xl mb-6">{tour.summary}</p>
					<div className="flex flex-wrap gap-4">
						<div className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
									clipRule="evenodd"
								/>
							</svg>
							{tour.duration} 天行程
						</div>
						<div className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
							</svg>
							最多 {tour.maxGroupSize} 人
						</div>
						<div className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							{tour.ratingsAverage} ({tour.ratingsQuantity} 评价)
						</div>
						<div className="flex items-center">
							<span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
								{tour.difficulty}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Description */}
						<section className="bg-white rounded-lg shadow-md p-6 mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								行程介绍
							</h2>
							<p className="text-gray-700 leading-relaxed mb-6">
								{tour.description}
							</p>

							{/* Tour Images Gallery */}
							{getTourImages(tour._id).images.length > 0 && (
								<div className="mt-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										更多图片
									</h3>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
										{getTourImages(tour._id).images.map((image, index) => (
											<div
												key={index}
												className="relative h-40 rounded-lg overflow-hidden"
											>
												<Image
													src={image}
													alt={`${tour.name} - 图片 ${index + 1}`}
													fill
													className="object-cover hover:scale-105 transition-transform"
													sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
												/>
											</div>
										))}
									</div>
								</div>
							)}
						</section>

						{/* Tour Details */}
						<section className="bg-white rounded-lg shadow-md p-6 mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								行程详情
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">出发日期</h3>
									<ul className="space-y-1">
										{tour.startDates?.map((date, index) => (
											<li key={index} className="text-gray-600">
												{new Date(date).toLocaleDateString('zh-CN')}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 mb-2">导游团队</h3>
									<ul className="space-y-1">
										{tour.guides?.map((guide) => (
											<li key={guide._id} className="text-gray-600">
												{guide.name} - {guide.role}
											</li>
										))}
									</ul>
								</div>
							</div>
						</section>

						{/* Reviews Section */}
						<section className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								用户评价 ({reviews.length})
							</h2>

							{/* Review Form */}
							{isAuthenticated && (
								<form
									onSubmit={handleReviewSubmit}
									className="mb-8 p-4 border rounded-lg"
								>
									<h3 className="font-semibold text-gray-900 mb-3">
										发表您的评价
									</h3>
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											评分
										</label>
										<select
											value={reviewForm.rating}
											onChange={(e) =>
												setReviewForm((prev) => ({
													...prev,
													rating: Number(e.target.value),
												}))
											}
											className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
										>
											{[5, 4, 3, 2, 1].map((rating) => (
												<option key={rating} value={rating}>
													{rating} 星
												</option>
											))}
										</select>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											评价内容
										</label>
										<textarea
											value={reviewForm.review}
											onChange={(e) =>
												setReviewForm((prev) => ({
													...prev,
													review: e.target.value,
												}))
											}
											rows={4}
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
											placeholder="分享您的旅游体验..."
											required
										/>
									</div>
									<button
										type="submit"
										disabled={submittingReview}
										className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
									>
										{submittingReview ? '提交中...' : '提交评价'}
									</button>
								</form>
							)}

							{/* Reviews List */}
							<div className="space-y-6">
								{reviews.length === 0 ? (
									<p className="text-gray-500 text-center py-4">暂无评价</p>
								) : (
									reviews.map((review) => (
										<div
											key={review._id}
											className="border-b pb-6 last:border-b-0"
										>
											<div className="flex items-center mb-3">
												<div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
													<span className="text-teal-600 font-semibold">
														{review.user.name.charAt(0)}
													</span>
												</div>
												<div>
													<h4 className="font-semibold text-gray-900">
														{review.user.name}
													</h4>
													<div className="flex items-center text-sm text-gray-500">
														<div className="flex text-yellow-400 mr-2">
															{'★'.repeat(review.rating)}
															{'☆'.repeat(5 - review.rating)}
														</div>
														<span>
															{new Date(review.createdAt).toLocaleDateString(
																'zh-CN',
															)}
														</span>
													</div>
												</div>
											</div>
											<p className="text-gray-700">{review.review}</p>
										</div>
									))
								)}
							</div>
						</section>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
							<div className="text-center mb-6">
								<div className="text-3xl font-bold text-teal-600 mb-2">
									¥{tour.price}
								</div>
								<div className="text-gray-600">每人</div>
							</div>

							<button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mb-4">
								立即预订
							</button>

							<div className="space-y-3 text-sm text-gray-600">
								<div className="flex justify-between">
									<span>行程天数</span>
									<span>{tour.duration} 天</span>
								</div>
								<div className="flex justify-between">
									<span>团队规模</span>
									<span>最多 {tour.maxGroupSize} 人</span>
								</div>
								<div className="flex justify-between">
									<span>难度级别</span>
									<span className="capitalize">{tour.difficulty}</span>
								</div>
								<div className="flex justify-between">
									<span>平均评分</span>
									<span>{tour.ratingsAverage} / 5</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
