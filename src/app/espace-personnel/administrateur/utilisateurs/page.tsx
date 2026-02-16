"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUsers, adminUpdateUser, adminDeleteUser, sendInternalMessage } from "@/lib/authApi";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon, UsersIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type NotificationType = "success" | "error";

const inputClass =
	"block w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm placeholder:text-gray-400 text-sm font-medium transition-all duration-200";
const selectClass = inputClass + " pr-10";

export default function UtilisateursPage() {
	const { user: currentUser } = useAuth();
	const [api, contextHolder] = notification.useNotification();

	// Users list
	const [users, setUsers] = useState<any[]>([]);
	const [usersLoading, setUsersLoading] = useState(false);
	const [usersPagination, setUsersPagination] = useState<any>(null);
	const [usersRoleFilter, setUsersRoleFilter] = useState("");
	const [usersSearch, setUsersSearch] = useState("");

	// Edit modal
	const [editUser, setEditUser] = useState<any | null>(null);
	const [editForm, setEditForm] = useState({ firstName: "", lastName: "", phone: "", company: "", position: "", address: "", role: "", isActive: true });
	const [editSaving, setEditSaving] = useState(false);

	// Delete modal
	const [deleteUser, setDeleteUser] = useState<any | null>(null);
	const [deleting, setDeleting] = useState(false);

	// Message modal
	const [messageUser, setMessageUser] = useState<any | null>(null);
	const [messageSubject, setMessageSubject] = useState("");
	const [messageContent, setMessageContent] = useState("");
	const [messageSending, setMessageSending] = useState(false);

	const openNotification = (type: NotificationType, title: string, message: string) => {
		api[type]({
			message: title,
			description: message,
			icon:
				type === "success" ? (
					<CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
				) : (
					<XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />
				),
		});
	};

	const loadUsers = useCallback(async (page: number, roleFilter?: string, search?: string) => {
		setUsersLoading(true);
		try {
			const role = roleFilter && roleFilter !== "all" ? roleFilter : undefined;
			const excludeRole = !roleFilter ? "administrateur" : undefined;
			const response = await getUsers(page, role, search, excludeRole);
			setUsers(response.data.users);
			setUsersPagination(response.data.pagination);
		} catch {
			// silently fail on initial load
		} finally {
			setUsersLoading(false);
		}
	}, []);

	useEffect(() => {
		loadUsers(1);
	}, [loadUsers]);

	useEffect(() => {
		const timer = setTimeout(() => {
			loadUsers(1, usersRoleFilter, usersSearch);
		}, 300);
		return () => clearTimeout(timer);
	}, [usersSearch, usersRoleFilter, loadUsers]);

	const openEditModal = (u: any) => {
		setEditUser(u);
		setEditForm({
			firstName: u.firstName || "",
			lastName: u.lastName || "",
			phone: u.phone || "",
			company: u.company || "",
			position: u.position || "",
			address: u.address || "",
			role: u.role || "",
			isActive: u.isActive !== false,
		});
	};

	const handleEditSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editUser) return;
		setEditSaving(true);
		try {
			await adminUpdateUser(editUser._id, editForm);
			openNotification("success", "Succès", "Utilisateur mis à jour.");
			setEditUser(null);
			loadUsers(usersPagination?.page || 1, usersRoleFilter, usersSearch);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la mise à jour.");
		} finally {
			setEditSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!deleteUser) return;
		setDeleting(true);
		try {
			await adminDeleteUser(deleteUser._id);
			openNotification("success", "Succès", "Utilisateur supprimé.");
			setDeleteUser(null);
			loadUsers(usersPagination?.page || 1, usersRoleFilter, usersSearch);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la suppression.");
		} finally {
			setDeleting(false);
		}
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!messageUser || !messageSubject.trim() || !messageContent.trim()) {
			openNotification("error", "Erreur", "Veuillez remplir tous les champs.");
			return;
		}
		setMessageSending(true);
		try {
			await sendInternalMessage({ recipientUser: messageUser._id, subject: messageSubject, content: messageContent });
			openNotification("success", "Envoyé", "Message envoyé avec succès.");
			setMessageUser(null);
			setMessageSubject("");
			setMessageContent("");
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'envoi.");
		} finally {
			setMessageSending(false);
		}
	};

	return (
		<div>
			<ConfigProvider
				theme={{
					token: {
						colorBgElevated: "#ffffff",
						colorTextHeading: "#1a1a1a",
						colorText: "#374151",
						fontFamily: "Halibut",
					},
					components: {
						Modal: {
							titleFontSize: 18,
							titleColor: "#1a1a1a",
							headerBg: "#ffffff",
							contentBg: "#ffffff",
						},
					},
				}}
			>
				{contextHolder}

				<h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
					<UsersIcon className="h-7 w-7 text-gray-400" />
					Gestion des utilisateurs
				</h1>
				<p className="text-gray-500 mb-8">Consultez et gérez les comptes des utilisateurs inscrits.</p>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-4">
						<select
							value={usersRoleFilter}
							onChange={(e) => setUsersRoleFilter(e.target.value)}
							className="rounded-lg px-3 py-1.5 pr-10 text-sm text-gray-700 bg-white border border-gray-300 focus:border-univers"
						>
							<option value="">Apprenants & Professionnels</option>
							<option value="all">Tous les rôles</option>
							<option value="administrateur">Administrateur</option>
							<option value="apprenant">Apprenant</option>
							<option value="professionnel">Professionnel</option>
						</select>
					</div>

					{/* Search - sticky */}
					<div className="relative mb-4 sticky top-0 z-10 bg-white py-1">
						<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							value={usersSearch}
							onChange={(e) => setUsersSearch(e.target.value)}
							placeholder="Rechercher par nom, email, entreprise..."
							className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:border-univers focus:ring-2 focus:ring-univers/20 transition-all duration-200"
						/>
					</div>

					{usersLoading ? (
						<div className="flex justify-center py-8">
							<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
						</div>
					) : users.length > 0 ? (
						<>
							<div className="overflow-x-auto">
								<table className="w-full text-left text-sm">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Nom</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Email</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Rôle</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Entreprise</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Inscrit le</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
										</tr>
									</thead>
									<tbody>
										{users.map((u: any) => (
											<tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => openEditModal(u)}>
												<td className="py-3 px-2 font-medium text-gray-900">{u.firstName} {u.lastName}</td>
												<td className="py-3 px-2 text-gray-700">{u.email}</td>
												<td className="py-3 px-2">
													<span className={clsx(
														"px-2 py-0.5 rounded-full text-xs font-semibold capitalize",
														u.role === "administrateur" ? "bg-univers/10 text-univers" :
														u.role === "apprenant" ? "bg-maitrise/10 text-maitrise" : "bg-cohesion/10 text-cohesion"
													)}>
														{u.role}
													</span>
												</td>
												<td className="py-3 px-2 text-gray-700">{u.company}</td>
												<td className="py-3 px-2 text-gray-500">{new Date(u.createdAt).toLocaleDateString("fr-FR")}</td>
												<td className="py-3 px-2">
													<div className="flex items-center gap-1">
														<button
															onClick={(e) => { e.stopPropagation(); openEditModal(u); }}
															className="p-1.5 rounded-lg text-gray-500 hover:text-univers hover:bg-gray-100 transition-colors"
															title="Modifier"
														>
															<PencilSquareIcon className="h-4 w-4" />
														</button>
														{u._id !== currentUser?._id && (
															<>
																<button
																	onClick={(e) => { e.stopPropagation(); setMessageUser(u); setMessageSubject(""); setMessageContent(""); }}
																	className="p-1.5 rounded-lg text-gray-500 hover:text-maitrise hover:bg-gray-100 transition-colors"
																	title="Envoyer un message"
																>
																	<ChatBubbleLeftRightIcon className="h-4 w-4" />
																</button>
																<button
																	onClick={(e) => { e.stopPropagation(); setDeleteUser(u); }}
																	className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
																	title="Supprimer"
																>
																	<TrashIcon className="h-4 w-4" />
																</button>
															</>
														)}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							{usersPagination && usersPagination.pages > 1 && (
								<div className="flex justify-center gap-2 mt-4">
									{Array.from({ length: usersPagination.pages }, (_, i) => (
										<button
											key={i + 1}
											onClick={() => loadUsers(i + 1, usersRoleFilter, usersSearch)}
											className={clsx(
												"px-3 py-1 rounded text-sm font-medium",
												usersPagination.page === i + 1 ? "bg-univers text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
											)}
										>
											{i + 1}
										</button>
									))}
								</div>
							)}
						</>
					) : (
						<p className="text-gray-500 text-center py-4">Aucun utilisateur trouvé.</p>
					)}
				</div>

				{/* Edit User Modal */}
				<Modal
					title={`Modifier ${editUser?.firstName} ${editUser?.lastName}`}
					open={!!editUser}
					onCancel={() => !editSaving && setEditUser(null)}
					footer={null}
					width={600}
					centered
					destroyOnClose
				>
					<form onSubmit={handleEditSave} className="space-y-4 mt-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Prénom</label>
								<input type="text" value={editForm.firstName} onChange={(e) => setEditForm((p) => ({ ...p, firstName: e.target.value }))} disabled={editSaving} className={inputClass} />
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Nom</label>
								<input type="text" value={editForm.lastName} onChange={(e) => setEditForm((p) => ({ ...p, lastName: e.target.value }))} disabled={editSaving} className={inputClass} />
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Téléphone</label>
								<input type="text" value={editForm.phone} onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))} disabled={editSaving} className={inputClass} />
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Entreprise</label>
								<input type="text" value={editForm.company} onChange={(e) => setEditForm((p) => ({ ...p, company: e.target.value }))} disabled={editSaving} className={inputClass} />
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Poste</label>
								<input type="text" value={editForm.position} onChange={(e) => setEditForm((p) => ({ ...p, position: e.target.value }))} disabled={editSaving} className={inputClass} />
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Adresse</label>
								<input type="text" value={editForm.address} onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))} disabled={editSaving} className={inputClass} />
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Rôle</label>
								<select value={editForm.role} onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))} disabled={editSaving} className={selectClass}>
									<option value="administrateur">Administrateur</option>
									<option value="apprenant">Apprenant</option>
									<option value="professionnel">Professionnel</option>
								</select>
							</div>
							<div>
								<label className="text-sm font-semibold text-gray-700 mb-1 block">Statut</label>
								<select value={editForm.isActive ? "true" : "false"} onChange={(e) => setEditForm((p) => ({ ...p, isActive: e.target.value === "true" }))} disabled={editSaving} className={selectClass}>
									<option value="true">Actif</option>
									<option value="false">Désactivé</option>
								</select>
							</div>
						</div>
						<p className="text-xs text-gray-400">Email : {editUser?.email} (non modifiable)</p>
						<div className="flex justify-end gap-3 pt-2">
							<button type="button" onClick={() => setEditUser(null)} disabled={editSaving} className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
								Annuler
							</button>
							<button type="submit" disabled={editSaving} className={clsx(editSaving ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90", "px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2")}>
								{editSaving ? <Spin indicator={<LoadingOutlined spin className="text-base text-white" />} /> : "Enregistrer"}
							</button>
						</div>
					</form>
				</Modal>

				{/* Delete User Modal */}
				<Modal
					title="Confirmer la suppression"
					open={!!deleteUser}
					onCancel={() => !deleting && setDeleteUser(null)}
					footer={null}
					width={480}
					centered
				>
					<div className="py-4">
						<p className="text-gray-700 mb-2">
							Êtes-vous sûr de vouloir supprimer le compte de :
						</p>
						<p className="font-bold text-gray-900 mb-1">
							{deleteUser?.firstName} {deleteUser?.lastName}
						</p>
						<p className="text-sm text-gray-500 mb-4">{deleteUser?.email}</p>
						<p className="text-sm text-red-600 mb-6">
							Cette action est irréversible. L&apos;utilisateur ne pourra plus se connecter et toutes ses données seront perdues.
						</p>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => setDeleteUser(null)}
								disabled={deleting}
								className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								Annuler
							</button>
							<button
								onClick={handleDelete}
								disabled={deleting}
								className={clsx(
									deleting ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-red-700",
									"px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-red-600 shadow-sm transition-all duration-200 flex items-center gap-2"
								)}
							>
								{deleting ? <Spin indicator={<LoadingOutlined spin className="text-base text-white" />} /> : "Supprimer"}
							</button>
						</div>
					</div>
				</Modal>

				{/* Send Message Modal */}
				<Modal
					title={`Envoyer un message à ${messageUser?.firstName} ${messageUser?.lastName}`}
					open={!!messageUser}
					onCancel={() => !messageSending && setMessageUser(null)}
					footer={null}
					width={600}
					centered
					destroyOnClose
				>
					<form onSubmit={handleSendMessage} className="space-y-4 mt-4">
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">Destinataire</label>
							<p className="text-sm text-gray-500">{messageUser?.firstName} {messageUser?.lastName} ({messageUser?.email})</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Sujet<span className="text-red-400 ml-1">*</span>
							</label>
							<input
								type="text"
								value={messageSubject}
								onChange={(e) => setMessageSubject(e.target.value)}
								placeholder="Sujet du message"
								disabled={messageSending}
								className={inputClass}
							/>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Message<span className="text-red-400 ml-1">*</span>
							</label>
							<textarea
								value={messageContent}
								onChange={(e) => setMessageContent(e.target.value)}
								placeholder="Votre message..."
								rows={6}
								disabled={messageSending}
								className={clsx(inputClass, "resize-none")}
							/>
						</div>
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setMessageUser(null)}
								disabled={messageSending}
								className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								Annuler
							</button>
							<button
								type="submit"
								disabled={messageSending || !messageSubject.trim() || !messageContent.trim()}
								className={clsx(
									messageSending || !messageSubject.trim() || !messageContent.trim() ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
									"px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2"
								)}
							>
								{messageSending ? (
									<Spin indicator={<LoadingOutlined spin className="text-base text-white" />} />
								) : (
									<>
										<PaperAirplaneIcon className="h-4 w-4" />
										Envoyer
									</>
								)}
							</button>
						</div>
					</form>
				</Modal>
			</ConfigProvider>
		</div>
	);
}
