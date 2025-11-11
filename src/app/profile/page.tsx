'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import { UserUpdateData, PasswordUpdateData } from '../types/auth';

export default function ProfilePage() {
	const { user, logout } = useAuth();
	const [activeTab, setActiveTab] = useState('profile');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	// Profile update form
	const [profileForm, setProfileForm] = useState<UserUpdateData>({
		name: '',
		photo: '',
	});

	// Password update form
	const [passwordForm, setPasswordForm] = useState<PasswordUpdateData>({
		passwordCurrent: '',
		password: '',
		passwordConfirm: '',
	});

	useEffect(() => {
		if (user) {
			setProfileForm({
				name: user.name,
				photo: user.photo || '',
			});
		}
	}, [user]);

	const handleProfileUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		try {
			await userAPI.updateMe(profileForm);
			setMessage('个人信息更新成功');
			// 重新加载用户信息
			window.location.reload();
		} catch (err: any) {
			setError(err.response?.data?.message || '更新失败');
		} finally {
			setLoading(false);
		}
	};

	const handlePasswordUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		if (passwordForm.password !== passwordForm.passwordConfirm) {
			setError('新密码和确认密码不匹配');
			setLoading(false);
			return;
		}

		try {
			await userAPI.updatePassword(passwordForm);
			setMessage('密码修改成功');
			setPasswordForm({
				passwordCurrent: '',
				password: '',
				passwordConfirm: '',
			});
		} catch (err: any) {
			setError(err.response?.data?.message || '密码修改失败');
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteAccount = async () => {
		if (!confirm('确定要删除账户吗？此操作不可撤销！')) {
			return;
		}

		try {
			await userAPI.deleteMe();
			logout();
			window.location.href = '/';
		} catch (err: any) {
			setError(err.response?.data?.message || '删除账户失败');
		}
	};

	if (!user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-gray-600 mb-4">请先登录</p>
					<a href="/login" className="text-teal-600 hover:text-teal-700">
						前往登录
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					{/* Header */}
					<div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8 text-white">
						<div className="flex items-center">
							<div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mr-6">
								{user.photo ? (
									<img
										src={user.photo}
										alt={user.name}
										className="w-20 h-20 rounded-full object-cover"
									/>
								) : (
									<span className="text-teal-600 text-2xl font-bold">
										{user.name.charAt(0).toUpperCase()}
									</span>
								)}
							</div>
							<div>
								<h1 className="text-2xl font-bold">{user.name}</h1>
								<p className="text-teal-100">{user.email}</p>
								<p className="text-teal-100 capitalize">{user.role}</p>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="border-b border-gray-200">
						<nav className="flex -mb-px">
							<button
								onClick={() => setActiveTab('profile')}
								className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
									activeTab === 'profile'
										? 'border-teal-500 text-teal-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								个人信息
							</button>
							<button
								onClick={() => setActiveTab('password')}
								className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
									activeTab === 'password'
										? 'border-teal-500 text-teal-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								修改密码
							</button>
							<button
								onClick={() => setActiveTab('danger')}
								className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
									activeTab === 'danger'
										? 'border-red-500 text-red-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								危险操作
							</button>
						</nav>
					</div>

					{/* Content */}
					<div className="p-6">
						{message && (
							<div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4">
								{message}
							</div>
						)}

						{error && (
							<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
								{error}
							</div>
						)}

						{/* Profile Tab */}
						{activeTab === 'profile' && (
							<form onSubmit={handleProfileUpdate}>
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											姓名
										</label>
										<input
											type="text"
											value={profileForm.name}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													name: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											邮箱地址
										</label>
										<input
											type="email"
											value={user.email}
											disabled
											className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
										/>
										<p className="text-sm text-gray-500 mt-1">
											邮箱地址不可修改
										</p>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											头像URL
										</label>
										<input
											type="text"
											value={profileForm.photo}
											onChange={(e) =>
												setProfileForm((prev) => ({
													...prev,
													photo: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
											placeholder="请输入头像图片URL"
										/>
									</div>

									<div>
										<button
											type="submit"
											disabled={loading}
											className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
										>
											{loading ? '更新中...' : '更新个人信息'}
										</button>
									</div>
								</div>
							</form>
						)}

						{/* Password Tab */}
						{activeTab === 'password' && (
							<form onSubmit={handlePasswordUpdate}>
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											当前密码
										</label>
										<input
											type="password"
											value={passwordForm.passwordCurrent}
											onChange={(e) =>
												setPasswordForm((prev) => ({
													...prev,
													passwordCurrent: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											新密码
										</label>
										<input
											type="password"
											value={passwordForm.password}
											onChange={(e) =>
												setPasswordForm((prev) => ({
													...prev,
													password: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											确认新密码
										</label>
										<input
											type="password"
											value={passwordForm.passwordConfirm}
											onChange={(e) =>
												setPasswordForm((prev) => ({
													...prev,
													passwordConfirm: e.target.value,
												}))
											}
											className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
											required
										/>
									</div>

									<div>
										<button
											type="submit"
											disabled={loading}
											className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
										>
											{loading ? '更新中...' : '修改密码'}
										</button>
									</div>
								</div>
							</form>
						)}

						{/* Danger Tab */}
						{activeTab === 'danger' && (
							<div className="space-y-6">
								<div className="bg-red-50 border border-red-200 rounded-lg p-4">
									<h3 className="text-lg font-semibold text-red-800 mb-2">
										删除账户
									</h3>
									<p className="text-red-700 mb-4">
										此操作将永久删除您的账户和所有相关数据，此操作不可撤销。
									</p>
									<button
										onClick={handleDeleteAccount}
										className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
									>
										删除我的账户
									</button>
								</div>

								<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
									<h3 className="text-lg font-semibold text-yellow-800 mb-2">
										退出登录
									</h3>
									<p className="text-yellow-700 mb-4">
										退出当前登录状态，需要重新登录才能访问受保护的内容。
									</p>
									<button
										onClick={logout}
										className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors"
									>
										退出登录
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
