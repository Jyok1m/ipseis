import axios from "axios";

const authApi = axios.create({
	baseURL: "/api/proxy",
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

export const updateMyProfile = (data: { firstName?: string; lastName?: string; phone?: string; company?: string; position?: string; address?: string }) =>
	authApi.put("/auth/profile", data);

export const changeMyPassword = (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) =>
	authApi.put("/auth/change-password", data);

export const forgotPassword = (email: string) => authApi.post("/auth/forgot-password", { email });

export const resetPassword = (token: string, password: string, confirmPassword: string) =>
	authApi.post("/auth/reset-password", { token, password, confirmPassword });

// Admin
export const createActivationCode = (targetEmail: string, role: string) =>
	authApi.post("/admin/activation-codes", { targetEmail, role });

export const getActivationCodes = (page: number = 1, archived?: boolean) =>
	authApi.get(`/admin/activation-codes?page=${page}${archived ? "&archived=true" : ""}`);

export const cancelActivationCode = (id: string) => authApi.patch(`/admin/activation-codes/${id}/cancel`);

export const archiveActivationCode = (id: string) => authApi.patch(`/admin/activation-codes/${id}/archive`);

export const getUsers = (page: number = 1, role?: string, search?: string, excludeRole?: string) =>
	authApi.get(`/admin/users?page=${page}${role ? `&role=${role}` : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}${excludeRole ? `&excludeRole=${excludeRole}` : ""}`);

export const adminUpdateUser = (id: string, data: { firstName?: string; lastName?: string; phone?: string; company?: string; position?: string; address?: string; role?: string; isActive?: boolean }) =>
	authApi.put(`/admin/users/${id}`, data);

export const adminDeleteUser = (id: string) => authApi.delete(`/admin/users/${id}`);

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

// Admin - Contracts
export const getAdminContracts = (page: number = 1, status?: string) =>
	authApi.get(`/contracts/admin?page=${page}${status ? `&status=${status}` : ""}`);

export const createContract = (data: FormData) =>
	authApi.post("/contracts/admin", data, { headers: { "Content-Type": "multipart/form-data" } });

export const updateContract = (id: string, data: FormData) =>
	authApi.put(`/contracts/admin/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

export const sendContract = (id: string) => authApi.patch(`/contracts/admin/${id}/send`);

export const cancelContract = (id: string) => authApi.patch(`/contracts/admin/${id}/cancel`);

export const deleteContract = (id: string) => authApi.delete(`/contracts/admin/${id}`);

// User - Contracts
export const getMyContracts = (page: number = 1) => authApi.get(`/contracts/my?page=${page}`);

export const signContract = (id: string) => authApi.patch(`/contracts/my/${id}/sign`);

export const rejectContract = (id: string) => authApi.patch(`/contracts/my/${id}/reject`);

export const downloadContractPdf = (id: string) =>
	authApi.get(`/contracts/download/${id}`, { responseType: "blob" });

// Admin - Resources
export const getAdminResources = (page: number = 1, trainingId?: string) =>
	authApi.get(`/resources/admin?page=${page}${trainingId ? `&trainingId=${trainingId}` : ""}`);

export const createResource = (data: FormData) =>
	authApi.post("/resources/admin", data, { headers: { "Content-Type": "multipart/form-data" } });

export const updateResource = (id: string, data: FormData) =>
	authApi.put(`/resources/admin/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteResource = (id: string) => authApi.delete(`/resources/admin/${id}`);

// Internal Messages
export const getConversations = (page?: number) => authApi.get(`/internal-messages/conversations?page=${page || 1}`);
export const getInboxMessages = (page?: number) => authApi.get(`/internal-messages/inbox?page=${page || 1}`);
export const getSentMessages = (page?: number) => authApi.get(`/internal-messages/sent?page=${page || 1}`);
export const sendInternalMessage = (data: { recipientUser: string; subject: string; content: string; parentMessage?: string }) =>
	authApi.post("/internal-messages/send", data);
export const markMessageRead = (id: string) => authApi.patch(`/internal-messages/${id}/read`);
export const getUnreadCount = () => authApi.get("/internal-messages/unread-count");
export const getConversation = (conversationId: string) => authApi.get(`/internal-messages/conversation/${conversationId}`);
export const archiveConversation = (id: string) => authApi.post(`/internal-messages/conversation/${id}/archive`);
export const unarchiveConversation = (id: string) => authApi.delete(`/internal-messages/conversation/${id}/archive`);
export const getArchivedConversations = (page?: number) => authApi.get(`/internal-messages/conversations/archived?page=${page || 1}`);

// Contact Messages (admin)
export const getContactMessages = (page?: number) => authApi.get(`/messages/admin?page=${page || 1}`);
export const getContactMessage = (id: string) => authApi.get(`/messages/admin/${id}`);
export const markContactMessageRead = (id: string) => authApi.patch(`/messages/admin/${id}/read`);
export const replyToContactMessage = (id: string, content: string) => authApi.post(`/messages/admin/${id}/reply`, { content });
export const getContactUnreadCount = () => authApi.get("/messages/admin/unread-count");

// User - Resources
export const getMyResources = () => authApi.get("/resources/my");

export const downloadResourcePdf = (id: string) =>
	authApi.get(`/resources/download/${id}`, { responseType: "blob" });
