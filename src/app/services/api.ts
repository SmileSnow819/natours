import axios from 'axios';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

// 创建axios实例
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 请求拦截器 - 添加认证token
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 响应拦截器 - 处理错误
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token过期，清除本地存储并重定向到登录页
			localStorage.removeItem('authToken');
			localStorage.removeItem('user');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

// 认证相关API
export const authAPI = {
	// 用户注册
	signup: async (userData: {
		name: string;
		email: string;
		password: string;
		passwordConfirm: string;
		photo?: string;
	}) => {
		const response = await apiClient.post('/users/signup', userData);
		return response.data;
	},

	// 用户登录
	login: async (credentials: { email: string; password: string }) => {
		const response = await apiClient.post('/users/login', credentials);
		return response.data;
	},

	// 忘记密码
	forgotPassword: async (email: string) => {
		const response = await apiClient.post('/users/forgotPassword', { email });
		return response.data;
	},

	// 重置密码
	resetPassword: async (
		token: string,
		passwords: { password: string; passwordConfirm: string },
	) => {
		const response = await apiClient.patch(
			`/users/resetPassword/${token}`,
			passwords,
		);
		return response.data;
	},
};

// 用户管理API
export const userAPI = {
	// 获取当前用户信息
	getMe: async () => {
		const response = await apiClient.get('/users/getMe');
		return response.data;
	},

	// 更新用户信息
	updateMe: async (userData: { name?: string; photo?: string }) => {
		const response = await apiClient.patch('/users/updateMe', userData);
		return response.data;
	},

	// 注销账户
	deleteMe: async () => {
		const response = await apiClient.delete('/users/deleteMe');
		return response.data;
	},

	// 更新密码
	updatePassword: async (passwords: {
		passwordCurrent: string;
		password: string;
		passwordConfirm: string;
	}) => {
		const response = await apiClient.patch(
			'/users/updateMyPassword',
			passwords,
		);
		return response.data;
	},
};

// 旅游路线API
export const toursAPI = {
	// 获取所有旅游路线
	getTours: async (params?: {
		page?: number;
		limit?: number;
		sort?: string;
		fields?: string;
		difficulty?: string;
		price?: { lt?: number; lte?: number; gt?: number; gte?: number };
	}) => {
		const response = await apiClient.get('/tours', { params });
		return response.data;
	},

	// 获取单个旅游路线
	getTour: async (id: string) => {
		const response = await apiClient.get(`/tours/${id}`);
		return response.data;
	},

	// 创建旅游路线
	createTour: async (tourData: any) => {
		const response = await apiClient.post('/tours', tourData);
		return response.data;
	},

	// 更新旅游路线
	updateTour: async (id: string, tourData: any) => {
		const response = await apiClient.patch(`/tours/${id}`, tourData);
		return response.data;
	},

	// 删除旅游路线
	deleteTour: async (id: string) => {
		const response = await apiClient.delete(`/tours/${id}`);
		return response.data;
	},

	// 旅游统计
	getTourStats: async () => {
		const response = await apiClient.get('/tours/tours-stats');
		return response.data;
	},

	// 月度计划
	getMonthlyPlan: async (year: number) => {
		const response = await apiClient.get(`/tours/monthly-plan/${year}`);
		return response.data;
	},
};

// 评论API
export const reviewsAPI = {
	// 获取所有评论
	getReviews: async (tourId?: string) => {
		const url = tourId ? `/tours/${tourId}/reviews` : '/reviews';
		const response = await apiClient.get(url);
		return response.data;
	},

	// 创建评论
	createReview: async (
		reviewData: { review: string; rating: number },
		tourId?: string,
	) => {
		const url = tourId ? `/tours/${tourId}/reviews` : '/reviews';
		const response = await apiClient.post(url, reviewData);
		return response.data;
	},

	// 更新评论
	updateReview: async (
		id: string,
		reviewData: { review?: string; rating?: number },
	) => {
		const response = await apiClient.patch(`/reviews/${id}`, reviewData);
		return response.data;
	},

	// 删除评论
	deleteReview: async (id: string) => {
		const response = await apiClient.delete(`/reviews/${id}`);
		return response.data;
	},
};

export default apiClient;
