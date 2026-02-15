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

// Admin - Dashboard
export const getDashboardStats = () => authApi.get("/admin/dashboard/stats");

// Admin - Prospects
export const getProspects = (page: number = 1, source?: string, search?: string) =>
	authApi.get(`/admin/prospects?page=${page}${source ? `&source=${source}` : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}`);

export const contactProspect = (id: string, data: { subject: string; message: string }) =>
	authApi.post(`/admin/prospects/${id}/contact`, data);

export const convertProspect = (id: string, role: string) =>
	authApi.post(`/admin/prospects/${id}/convert`, { role });

export const updateProspectStatus = (id: string, status: string) =>
	authApi.patch(`/admin/prospects/${id}/status`, { status });

// Admin - Training visibility
export const toggleTrainingVisibility = (id: string, isVisible: boolean) =>
	authApi.patch(`/admin/trainings/${id}/visibility`, { isVisible });

// Admin - Checklists
export const getChecklists = (page: number = 1) => authApi.get(`/admin/checklists?page=${page}`);

export const createChecklist = (data: any) => authApi.post("/admin/checklists", data);

export const updateChecklist = (id: string, data: any) => authApi.put(`/admin/checklists/${id}`, data);

export const toggleChecklistItem = (checklistId: string, itemId: string, data: { isChecked?: boolean; notes?: string }) =>
	authApi.patch(`/admin/checklists/${checklistId}/items/${itemId}`, data);

export const deleteChecklist = (id: string) => authApi.delete(`/admin/checklists/${id}`);
