"use client";

import { useState, useEffect, useCallback } from "react";
import { getChecklists, createChecklist, updateChecklist, toggleChecklistItem, deleteChecklist, getUsers, getProspects } from "@/lib/authApi";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	CheckCircleIcon,
	XCircleIcon,
	PlusIcon,
	PencilSquareIcon,
	TrashIcon,
	ClipboardDocumentListIcon,
	XMarkIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type NotificationType = "success" | "error";

interface ChecklistItem {
	_id: string;
	text: string;
	isChecked: boolean;
	notes: string;
}

interface Checklist {
	_id: string;
	title: string;
	description: string;
	items: ChecklistItem[];
	linkedUserId: { _id: string; firstName: string; lastName: string; email: string } | null;
	linkedProspectId: { _id: string; firstName: string; lastName: string; email: string } | null;
	createdBy: { _id: string; firstName: string; lastName: string } | null;
	createdAt: string;
}

interface FormItem {
	text: string;
	notes: string;
}

const emptyForm = {
	title: "",
	description: "",
	items: [{ text: "", notes: "" }] as FormItem[],
	linkedUserId: "",
	linkedProspectId: "",
};

const inputClass =
	"block w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm placeholder:text-gray-400 text-sm font-medium transition-all duration-200";
const selectClass = inputClass + " pr-10";
const labelClass = "text-sm font-semibold text-gray-700 mb-1 block";

export default function ChecklistsPage() {
	const [api, contextHolder] = notification.useNotification();

	const [checklists, setChecklists] = useState<Checklist[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [pagination, setPagination] = useState<any>(null);

	// Modal
	const [modalOpen, setModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [form, setForm] = useState(emptyForm);

	// Delete
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);

	// Linked entities for selects
	const [allUsers, setAllUsers] = useState<any[]>([]);
	const [allProspects, setAllProspects] = useState<any[]>([]);
	const [entitiesLoaded, setEntitiesLoaded] = useState(false);

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

	const loadChecklists = useCallback(async (page: number = 1) => {
		setLoading(true);
		try {
			const response = await getChecklists(page);
			setChecklists(response.data.checklists);
			setPagination(response.data.pagination);
		} catch {
			openNotification("error", "Erreur", "Impossible de charger les checklists.");
		} finally {
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadEntities = async () => {
		if (entitiesLoaded) return;
		try {
			const [usersRes, prospectsRes] = await Promise.all([
				getUsers(1, undefined),
				getProspects(1),
			]);
			setAllUsers(usersRes.data.users || []);
			setAllProspects(prospectsRes.data.prospects || []);
			setEntitiesLoaded(true);
		} catch {
			// silently fail, selects will be empty
		}
	};

	useEffect(() => {
		loadChecklists(1);
	}, [loadChecklists]);

	const openCreateModal = () => {
		setEditingId(null);
		setForm({ ...emptyForm, items: [{ text: "", notes: "" }] });
		loadEntities();
		setModalOpen(true);
	};

	const openEditModal = (checklist: Checklist) => {
		setEditingId(checklist._id);
		setForm({
			title: checklist.title,
			description: checklist.description || "",
			items: checklist.items.length > 0
				? checklist.items.map((item) => ({ text: item.text, notes: item.notes || "" }))
				: [{ text: "", notes: "" }],
			linkedUserId: checklist.linkedUserId?._id || "",
			linkedProspectId: checklist.linkedProspectId?._id || "",
		});
		loadEntities();
		setModalOpen(true);
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.title) {
			openNotification("error", "Erreur", "Le titre est obligatoire.");
			return;
		}

		const cleanItems = form.items.filter((item) => item.text.trim());
		if (cleanItems.length === 0) {
			openNotification("error", "Erreur", "Ajoutez au moins un item.");
			return;
		}

		setSaving(true);
		try {
			const payload = {
				title: form.title,
				description: form.description,
				items: cleanItems.map((item) => ({ text: item.text.trim(), notes: item.notes })),
				linkedUserId: form.linkedUserId || null,
				linkedProspectId: form.linkedProspectId || null,
			};

			if (editingId) {
				await updateChecklist(editingId, payload);
				openNotification("success", "Succès", "Checklist modifiée.");
			} else {
				await createChecklist(payload);
				openNotification("success", "Succès", "Checklist créée.");
			}

			setModalOpen(false);
			await loadChecklists(pagination?.page || 1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la sauvegarde.");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleting(true);
		try {
			await deleteChecklist(deleteId);
			openNotification("success", "Succès", "Checklist supprimée.");
			setDeleteId(null);
			await loadChecklists(pagination?.page || 1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la suppression.");
		} finally {
			setDeleting(false);
		}
	};

	const handleToggleItem = async (checklistId: string, itemId: string, currentChecked: boolean) => {
		try {
			const response = await toggleChecklistItem(checklistId, itemId, { isChecked: !currentChecked });
			// Update in-place
			setChecklists((prev) =>
				prev.map((cl) => (cl._id === checklistId ? response.data.checklist : cl))
			);
		} catch {
			openNotification("error", "Erreur", "Impossible de mettre à jour l'item.");
		}
	};

	// Form helpers
	const updateFormItem = (index: number, field: "text" | "notes", value: string) => {
		setForm((prev) => {
			const items = [...prev.items];
			items[index] = { ...items[index], [field]: value };
			return { ...prev, items };
		});
	};

	const addFormItem = () => {
		setForm((prev) => ({ ...prev, items: [...prev.items, { text: "", notes: "" }] }));
	};

	const removeFormItem = (index: number) => {
		if (form.items.length <= 1) return;
		setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
	};

	const checklistToDelete = deleteId ? checklists.find((c) => c._id === deleteId) : null;

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

				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
							<ClipboardDocumentListIcon className="h-7 w-7 text-gray-400" />
							Checklists
						</h1>
						<p className="text-gray-500 mt-1">Suivi des apprenants et professionnels</p>
					</div>
					<button
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-univers px-5 py-3 text-white font-bold shadow-sm hover:bg-univers/90 transition-all duration-200 whitespace-nowrap"
					>
						<PlusIcon className="h-5 w-5" />
						Nouvelle checklist
					</button>
				</div>

				{/* List */}
				{loading ? (
					<div className="flex justify-center py-16">
						<Spin indicator={<LoadingOutlined spin className="text-3xl text-gray-400" />} />
					</div>
				) : checklists.length === 0 ? (
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
						<ClipboardDocumentListIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
						<p className="text-gray-500">Aucune checklist pour le moment.</p>
					</div>
				) : (
					<div className="space-y-4">
						{checklists.map((checklist) => {
							const checked = checklist.items.filter((item) => item.isChecked).length;
							const total = checklist.items.length;
							const progress = total > 0 ? Math.round((checked / total) * 100) : 0;

							return (
								<div key={checklist._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
									{/* Card header */}
									<div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
										<div className="flex-1 min-w-0">
											<h3 className="font-bold text-gray-900">{checklist.title}</h3>
											{checklist.description && (
												<p className="text-sm text-gray-500 mt-1 line-clamp-2">{checklist.description}</p>
											)}
											<div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
												{checklist.linkedUserId && (
													<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
														<UserIcon className="h-3 w-3" />
														{checklist.linkedUserId.firstName} {checklist.linkedUserId.lastName}
													</span>
												)}
												{checklist.linkedProspectId && (
													<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
														<UserIcon className="h-3 w-3" />
														{checklist.linkedProspectId.firstName} {checklist.linkedProspectId.lastName} (prospect)
													</span>
												)}
												<span>Créée le {new Date(checklist.createdAt).toLocaleDateString("fr-FR")}</span>
											</div>
										</div>
										<div className="flex items-center gap-2 flex-shrink-0">
											<button
												onClick={() => openEditModal(checklist)}
												className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
											>
												<PencilSquareIcon className="h-4 w-4" />
												Modifier
											</button>
											<button
												onClick={() => setDeleteId(checklist._id)}
												className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
											>
												<TrashIcon className="h-4 w-4" />
											</button>
										</div>
									</div>

									{/* Progress bar */}
									<div className="mb-3">
										<div className="flex items-center justify-between text-xs text-gray-500 mb-1">
											<span>{checked}/{total} complétés</span>
											<span>{progress}%</span>
										</div>
										<div className="w-full bg-gray-100 rounded-full h-2">
											<div
												className="bg-maitrise h-2 rounded-full transition-all duration-300"
												style={{ width: `${progress}%` }}
											/>
										</div>
									</div>

									{/* Items */}
									<div className="space-y-1">
										{checklist.items.map((item) => (
											<div
												key={item._id}
												className="flex items-start gap-3 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
											>
												<input
													type="checkbox"
													checked={item.isChecked}
													onChange={() => handleToggleItem(checklist._id, item._id, item.isChecked)}
													className="mt-0.5 rounded border-gray-300 text-maitrise focus:ring-maitrise cursor-pointer"
												/>
												<div className="flex-1 min-w-0">
													<span
														className={clsx(
															"text-sm",
															item.isChecked ? "line-through text-gray-400" : "text-gray-700"
														)}
													>
														{item.text}
													</span>
													{item.notes && (
														<p className="text-xs text-gray-400 mt-0.5">{item.notes}</p>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							);
						})}

						{/* Pagination */}
						{pagination && pagination.pages > 1 && (
							<div className="flex justify-center gap-2 mt-4">
								{Array.from({ length: pagination.pages }, (_, i) => (
									<button
										key={i + 1}
										onClick={() => loadChecklists(i + 1)}
										className={clsx(
											"px-3 py-1 rounded text-sm font-medium",
											pagination.page === i + 1 ? "bg-univers text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
										)}
									>
										{i + 1}
									</button>
								))}
							</div>
						)}
					</div>
				)}

				{/* Create/Edit Modal */}
				<Modal
					title={editingId ? "Modifier la checklist" : "Nouvelle checklist"}
					open={modalOpen}
					onCancel={() => !saving && setModalOpen(false)}
					footer={null}
					width={640}
					centered
					destroyOnClose
				>
					<form onSubmit={handleSave} className="space-y-5 mt-4 max-h-[70vh] overflow-y-auto pr-2">
						<div>
							<label className={labelClass}>
								Titre<span className="text-red-400 ml-1">*</span>
							</label>
							<input
								type="text"
								value={form.title}
								onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
								placeholder="Titre de la checklist"
								disabled={saving}
								className={inputClass}
							/>
						</div>

						<div>
							<label className={labelClass}>Description</label>
							<textarea
								value={form.description}
								onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
								placeholder="Description optionnelle..."
								rows={2}
								disabled={saving}
								className={clsx(inputClass, "resize-none")}
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className={labelClass}>Lier à un utilisateur</label>
								<select
									value={form.linkedUserId}
									onChange={(e) => setForm((prev) => ({ ...prev, linkedUserId: e.target.value }))}
									disabled={saving}
									className={selectClass}
								>
									<option value="">Aucun</option>
									{allUsers.map((u: any) => (
										<option key={u._id} value={u._id}>
											{u.firstName} {u.lastName} ({u.email})
										</option>
									))}
								</select>
							</div>
							<div>
								<label className={labelClass}>Lier à un prospect</label>
								<select
									value={form.linkedProspectId}
									onChange={(e) => setForm((prev) => ({ ...prev, linkedProspectId: e.target.value }))}
									disabled={saving}
									className={selectClass}
								>
									<option value="">Aucun</option>
									{allProspects.map((p: any) => (
										<option key={p._id} value={p._id}>
											{p.firstName} {p.lastName} ({p.email})
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Items */}
						<div>
							<label className={labelClass}>
								Items <span className="text-gray-400 font-normal">({form.items.filter((i) => i.text.trim()).length})</span>
							</label>
							<div className="space-y-3">
								{form.items.map((item, index) => (
									<div key={index} className="flex gap-2 items-start">
										<div className="flex-1 space-y-1">
											<input
												type="text"
												value={item.text}
												onChange={(e) => updateFormItem(index, "text", e.target.value)}
												placeholder="Texte de l'item"
												disabled={saving}
												className={inputClass}
											/>
											<input
												type="text"
												value={item.notes}
												onChange={(e) => updateFormItem(index, "notes", e.target.value)}
												placeholder="Notes (optionnel)"
												disabled={saving}
												className={clsx(inputClass, "text-xs !py-1.5")}
											/>
										</div>
										{form.items.length > 1 && (
											<button
												type="button"
												onClick={() => removeFormItem(index)}
												disabled={saving}
												className="px-2 pt-2 text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
											>
												<XMarkIcon className="h-5 w-5" />
											</button>
										)}
									</div>
								))}
								<button
									type="button"
									onClick={addFormItem}
									disabled={saving}
									className="text-sm text-gray-500 hover:text-gray-700 hover:underline font-medium flex items-center gap-1"
								>
									<PlusIcon className="h-4 w-4" /> Ajouter un item
								</button>
							</div>
						</div>

						{/* Submit */}
						<div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white py-3">
							<button
								type="button"
								onClick={() => setModalOpen(false)}
								disabled={saving}
								className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								Annuler
							</button>
							<button
								type="submit"
								disabled={saving}
								className={clsx(
									saving ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
									"px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200"
								)}
							>
								{saving ? (
									<Spin indicator={<LoadingOutlined spin className="text-base text-white" />} />
								) : editingId ? (
									"Enregistrer"
								) : (
									"Créer la checklist"
								)}
							</button>
						</div>
					</form>
				</Modal>

				{/* Delete confirmation */}
				<Modal
					title="Confirmer la suppression"
					open={!!deleteId}
					onCancel={() => !deleting && setDeleteId(null)}
					footer={null}
					width={480}
					centered
				>
					<div className="py-4">
						<p className="text-gray-700 mb-2">
							Êtes-vous sûr de vouloir supprimer la checklist :
						</p>
						<p className="font-bold text-gray-900 mb-4">
							{checklistToDelete?.title}
						</p>
						<p className="text-sm text-red-600 mb-6">
							Cette action est irréversible.
						</p>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => setDeleteId(null)}
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
									"px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-red-600 shadow-sm transition-all duration-200"
								)}
							>
								{deleting ? <Spin indicator={<LoadingOutlined spin className="text-base text-white" />} /> : "Supprimer"}
							</button>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
		</div>
	);
}
