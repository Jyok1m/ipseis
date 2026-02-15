import axios from "axios";

const authApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
});

// Auth
export const register = (data: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
	company: string;
	position: string;
	address: string;
	activationCode: string;
}) => authApi.post("/auth/register", data);

export const login = (email: string, password: string) => authApi.post("/auth/login", { email, password });

export const logout = () => authApi.post("/auth/logout");

export const getMe = () => authApi.get("/auth/me");

export const forgotPassword = (email: string) => authApi.post("/auth/forgot-password", { email });

export const resetPassword = (token: string, password: string, confirmPassword: string) =>
	authApi.post("/auth/reset-password", { token, password, confirmPassword });

// Admin
export const createActivationCode = (targetEmail: string, role: string) =>
	authApi.post("/admin/activation-codes", { targetEmail, role });

export const getActivationCodes = (page: number = 1) => authApi.get(`/admin/activation-codes?page=${page}`);

export const getUsers = (page: number = 1, role?: string) =>
	authApi.get(`/admin/users?page=${page}${role ? `&role=${role}` : ""}`);

// Admin - Formations
export const getAdminThemes = () => authApi.get("/admin/themes");

export const getAdminTrainings = () => authApi.get("/admin/trainings");

export const createTraining = (data: any) => authApi.post("/admin/trainings", data);

export const updateTraining = (id: string, data: any) => authApi.put(`/admin/trainings/${id}`, data);

export const deleteTraining = (id: string) => authApi.delete(`/admin/trainings/${id}`);
