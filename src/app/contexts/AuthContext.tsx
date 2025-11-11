'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { authAPI, userAPI } from '../services/api';
import { User, LoginCredentials, SignupData } from '../types/auth';

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (credentials: LoginCredentials) => Promise<void>;
	signup: (userData: SignupData) => Promise<void>;
	logout: () => void;
	loading: boolean;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 检查本地存储中的认证信息
		const storedToken = localStorage.getItem('authToken');
		const storedUser = localStorage.getItem('user');

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));

			// 验证token是否仍然有效
			validateToken(storedToken);
		} else {
			setLoading(false);
		}
	}, []);

	const validateToken = async (token: string) => {
		try {
			const response = await userAPI.getMe();
			setUser(response.data.document);
			localStorage.setItem('user', JSON.stringify(response.data.document));
		} catch (error) {
			// Token无效，清除本地存储
			localStorage.removeItem('authToken');
			localStorage.removeItem('user');
			setToken(null);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (credentials: LoginCredentials) => {
		try {
			const response = await authAPI.login(credentials);
			const { token, data } = response;

			setToken(token);
			setUser(data?.user || null);

			localStorage.setItem('authToken', token);
			if (data?.user) {
				localStorage.setItem('user', JSON.stringify(data.user));
			}
		} catch (error) {
			throw error;
		}
	};

	const signup = async (userData: SignupData) => {
		try {
			const response = await authAPI.signup(userData);
			const { token, data } = response;

			setToken(token);
			setUser(data?.user || null);

			localStorage.setItem('authToken', token);
			if (data?.user) {
				localStorage.setItem('user', JSON.stringify(data.user));
			}
		} catch (error) {
			throw error;
		}
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem('authToken');
		localStorage.removeItem('user');
	};

	const value: AuthContextType = {
		user,
		token,
		login,
		signup,
		logout,
		loading,
		isAuthenticated: !!token && !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
