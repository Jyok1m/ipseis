"use client";

import { useState, useEffect, useCallback } from "react";
import {
	getAdminContracts,
	createContract,
	updateContract,
	sendContract,
	cancelContract,
	deleteContract,
	getUsers,
	getAdminTrainings,
	downloadContractPdf,
} from "@/lib/authApi";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	CheckCircleIcon,
	XCircleIcon,
	DocumentTextIcon,
	PlusIcon,
	PaperAirplaneIcon,
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
	ArrowDownTrayIcon,
	EyeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import PdfPreviewModal from "@/components/espace-personnel/PdfPreviewModal";
import { addWatermarkToPdf } from "@/lib/pdfWatermark";

type NotificationType = "success" | "error";

const statusLabels: Record<string, string> = {
	draft: "Brouillon",
	sent: "Envoyé",
	signed: "Signé",
	cancelled: "Annulé",
	rejected: "Rejeté",
};

const statusColors: Record<string, string> = {
	draft: "bg-gray-100 text-gray-700",
	sent: "bg-amber-50 text-amber-700",
	signed: "bg-green-50 text-green-700",
	cancelled: "bg-red-50 text-red-700",
	rejected: "bg-red-50 text-red-700",
};

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("fr-FR");
}

function getContractWatermark(contract: any): { text: string; color: string } | undefined {
	switch (contract.status) {
		case "signed":
			return { text: `Signé électroniquement le ${formatDate(contract.signedAt)}`, color: "#16a34a" };
		case "cancelled":
			return { text: `Annulé le ${formatDate(contract.cancelledAt || contract.updatedAt)}`, color: "#dc2626" };
		case "rejected":
			return { text: `Rejeté le ${formatDate(contract.rejectedAt || contract.updatedAt)}`, color: "#dc2626" };
		case "sent":
			return { text: "En attente de signature", color: "#d97706" };
		default:
			return undefined;
	}
}

export default function ContratsPage() {
	const [api, contextHolder] = notification.useNotification();

	const [contracts, setContracts] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState<any>(null);
	const [statusFilter, setStatusFilter] = useState("");

	// Modal
	const [modalOpen, setModalOpen] = useState(false);
	const [editingContract, setEditingContract] = useState<any>(null);
	const [saving, setSaving] = useState(false);

	// Form
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [linkedTraining, setLinkedTraining] = useState("");
	const [recipientUser, setRecipientUser] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [amount, setAmount] = useState("");
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	// Preview
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewLoading, setPreviewLoading] = useState(false);
	const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
	const [previewTitle, setPreviewTitle] = useState("");
	const [previewContract, setPreviewContract] = useState<any>(null);

	// Selects data
	const [allUsers, setAllUsers] = useState<any[]>([]);
	const [allTrainings, setAllTrainings] = useState<any[]>([]);

	const openNotification = (type: NotificationType, titleMsg: string, message: string) => {
		api[type]({
			message: titleMsg,
			description: message,
			icon:
				type === "success" ? (
					<CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
				) : (
					<XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />
				),
		});
	};

	const loadContracts = useCallback(async (page: number, status?: string) => {
		setLoading(true);
		try {
			const response = await getAdminContracts(page, status);
			setContracts(response.data.contracts);
			setPagination(response.data.pagination);
		} catch {
			// silent
		} finally {
			setLoading(false);
		}
	}, []);

	const loadSelectsData = useCallback(async () => {
		try {
			const [usersRes, trainingsRes] = await Promise.all([getUsers(1, undefined, undefined), getAdminTrainings()]);
			setAllUsers(usersRes.data.users || []);
			setAllTrainings(trainingsRes.data.trainings || []);
		} catch {
			// silent
		}
	}, []);

	useEffect(() => {
		loadContracts(1);
		loadSelectsData();
	}, [loadContracts, loadSelectsData]);

	useEffect(() => {
		loadContracts(1, statusFilter);
	}, [statusFilter, loadContracts]);

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setLinkedTraining("");
		setRecipientUser("");
		setStartDate("");
		setEndDate("");
		setAmount("");
		setPdfFile(null);
		setEditingContract(null);
	};

	const openCreateModal = () => {
		resetForm();
		setModalOpen(true);
	};

	const openEditModal = (contract: any) => {
		setEditingContract(contract);
		setTitle(contract.title);
		setDescription(contract.description || "");
		setLinkedTraining(contract.linkedTraining?._id || "");
		setRecipientUser(contract.recipientUser?._id || "");
		setStartDate(contract.startDate ? contract.startDate.split("T")[0] : "");
		setEndDate(contract.endDate ? contract.endDate.split("T")[0] : "");
		setAmount(contract.amount ? String(contract.amount) : "");
		setPdfFile(null);
		setModalOpen(true);
	};

	const handleSave = async () => {
		if (!title || !recipientUser) {
			openNotification("error", "Erreur", "Le titre et le destinataire sont obligatoires.");
			return;
		}

		setSaving(true);
		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("linkedTraining", linkedTraining);
			formData.append("recipientUser", recipientUser);
			formData.append("startDate", startDate);
			formData.append("endDate", endDate);
			formData.append("amount", amount);
			if (pdfFile) formData.append("pdf", pdfFile);

			if (editingContract) {
				await updateContract(editingContract._id, formData);
				openNotification("success", "Succès", "Contrat modifié avec succès.");
			} else {
				await createContract(formData);
				openNotification("success", "Succès", "Contrat créé avec succès.");
			}

			setModalOpen(false);
			resetForm();
			loadContracts(1, statusFilter);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'enregistrement.");
		} finally {
			setSaving(false);
		}
	};

	const handleSend = async (id: string) => {
		Modal.confirm({
			title: "Envoyer le contrat ?",
			content: "Le destinataire recevra un email de notification. Cette action est irréversible.",
			okText: "Envoyer",
			cancelText: "Annuler",
			okButtonProps: { style: { backgroundColor: "#263C27" } },
			onOk: async () => {
				try {
					await sendContract(id);
					openNotification("success", "Envoyé", "Le contrat a été envoyé au destinataire.");
					loadContracts(pagination?.page || 1, statusFilter);
				} catch (error: any) {
					openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'envoi.");
				}
			},
		});
	};

	const handleCancel = async (id: string) => {
		Modal.confirm({
			title: "Annuler le contrat ?",
			content: "Cette action est irréversible.",
			okText: "Annuler le contrat",
			cancelText: "Retour",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await cancelContract(id);
					openNotification("success", "Annulé", "Le contrat a été annulé.");
					loadContracts(pagination?.page || 1, statusFilter);
				} catch (error: any) {
					openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'annulation.");
				}
			},
		});
	};

	const handleDelete = async (id: string) => {
		Modal.confirm({
			title: "Supprimer le contrat ?",
			content: "Cette action est irréversible. Le contrat et le PDF associé seront supprimés.",
			okText: "Supprimer",
			cancelText: "Annuler",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await deleteContract(id);
					openNotification("success", "Supprimé", "Le contrat a été supprimé.");
					loadContracts(pagination?.page || 1, statusFilter);
				} catch (error: any) {
					openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la suppression.");
				}
			},
		});
	};

	const handleDownload = async (contract: any) => {
		try {
			const response = await downloadContractPdf(contract._id);
			const blob: Blob = response.data;
			const watermark = getContractWatermark(contract);
			let pdfBlob: Blob;
			if (watermark) {
				const arrayBuffer = await blob.arrayBuffer();
				const watermarkedBytes = await addWatermarkToPdf(arrayBuffer, watermark);
				pdfBlob = new Blob([watermarkedBytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
			} else {
				pdfBlob = blob;
			}
			const url = window.URL.createObjectURL(pdfBlob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${contract.title}.pdf`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch {
			openNotification("error", "Erreur", "Impossible de télécharger le PDF.");
		}
	};

	const handlePreview = async (contract: any) => {
		setPreviewTitle(contract.title);
		setPreviewContract(contract);
		setPreviewBlobUrl(null);
		setPreviewLoading(true);
		setPreviewOpen(true);
		try {
			const response = await downloadContractPdf(contract._id);
			const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
			setPreviewBlobUrl(url);
		} catch {
			openNotification("error", "Erreur", "Impossible de charger le PDF.");
		} finally {
			setPreviewLoading(false);
		}
	};

	const closePreview = () => {
		setPreviewOpen(false);
		if (previewBlobUrl) {
			window.URL.revokeObjectURL(previewBlobUrl);
			setPreviewBlobUrl(null);
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
				}}
			>
				{contextHolder}
			</ConfigProvider>

			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
						<DocumentTextIcon className="h-7 w-7 text-gray-400" />
						Gestion des contrats
					</h1>
					<p className="text-gray-500">Créez, envoyez et suivez vos contrats.</p>
				</div>
				<button
					onClick={openCreateModal}
					className="flex items-center gap-2 rounded-lg bg-univers px-5 py-3 text-white font-bold shadow-sm hover:bg-univers/90 transition-all duration-200 whitespace-nowrap cursor-pointer"
				>
					<PlusIcon className="h-5 w-5" />
					Nouveau contrat
				</button>
			</div>

			{/* Filters */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-bold text-gray-900">Contrats</h2>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="rounded-lg px-3 py-1.5 pr-10 text-sm text-gray-700 bg-white border border-gray-300 focus:border-univers"
					>
						<option value="">Tous les statuts</option>
						<option value="draft">Brouillon</option>
						<option value="sent">Envoyé</option>
						<option value="signed">Signé</option>
						<option value="cancelled">Annulé</option>
						<option value="rejected">Rejeté</option>
					</select>
				</div>

				{loading ? (
					<div className="flex justify-center py-8">
						<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
					</div>
				) : contracts.length > 0 ? (
					<>
						<div className="overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Titre</th>
										<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Destinataire</th>
										<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Statut</th>
										<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Dates</th>
										<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Montant</th>
										<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
									</tr>
								</thead>
								<tbody>
									{contracts.map((c: any) => (
										<tr key={c._id} className="border-b border-gray-100">
											<td className="py-3 px-2 font-medium text-gray-900">{c.title}</td>
											<td className="py-3 px-2 text-gray-700">
												{c.recipientUser ? `${c.recipientUser.firstName} ${c.recipientUser.lastName}` : "—"}
											</td>
											<td className="py-3 px-2">
												<span className={clsx("px-2 py-1 rounded-full text-xs font-semibold", statusColors[c.status])}>
													{statusLabels[c.status]}
												</span>
											</td>
											<td className="py-3 px-2 text-gray-500 text-xs">
												{c.startDate && new Date(c.startDate).toLocaleDateString("fr-FR")}
												{c.startDate && c.endDate && " → "}
												{c.endDate && new Date(c.endDate).toLocaleDateString("fr-FR")}
												{!c.startDate && !c.endDate && "—"}
											</td>
											<td className="py-3 px-2 text-gray-700">{c.amount ? `${c.amount.toLocaleString("fr-FR")} €` : "—"}</td>
											<td className="py-3 px-2">
												<div className="flex items-center gap-1">
													{c.pdfUrl && (
														<>
															<button
																onClick={() => handlePreview(c)}
																className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 cursor-pointer"
																title="Consulter"
															>
																<EyeIcon className="h-4 w-4" />
															</button>
															<button
																onClick={() => handleDownload(c)}
																className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 cursor-pointer"
																title="Télécharger PDF"
															>
																<ArrowDownTrayIcon className="h-4 w-4" />
															</button>
														</>
													)}
													{c.status === "draft" && (
														<>
															<button
																onClick={() => openEditModal(c)}
																className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 cursor-pointer"
																title="Modifier"
															>
																<PencilSquareIcon className="h-4 w-4" />
															</button>
															<button
																onClick={() => handleSend(c._id)}
																className="p-1.5 rounded hover:bg-green-50 text-green-600 hover:text-green-700 cursor-pointer"
																title="Envoyer"
															>
																<PaperAirplaneIcon className="h-4 w-4" />
															</button>
															<button
																onClick={() => handleDelete(c._id)}
																className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-600 cursor-pointer"
																title="Supprimer"
															>
																<TrashIcon className="h-4 w-4" />
															</button>
														</>
													)}
													{(c.status === "sent" || c.status === "signed") && (
														<button
															onClick={() => handleCancel(c._id)}
															className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-600 cursor-pointer"
															title="Annuler"
														>
															<XMarkIcon className="h-4 w-4" />
														</button>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{pagination && pagination.pages > 1 && (
							<div className="flex justify-center gap-2 mt-4">
								{Array.from({ length: pagination.pages }, (_, i) => (
									<button
										key={i + 1}
										onClick={() => loadContracts(i + 1, statusFilter)}
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
					</>
				) : (
					<p className="text-gray-500 text-center py-8">Aucun contrat trouvé.</p>
				)}
			</div>

			{/* Create/Edit Modal */}
			{modalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="fixed inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
					<div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto p-6">
						<h2 className="text-lg font-bold text-gray-900 mb-4">
							{editingContract ? "Modifier le contrat" : "Nouveau contrat"}
						</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									rows={3}
									className="w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Destinataire *</label>
								<select
									value={recipientUser}
									onChange={(e) => setRecipientUser(e.target.value)}
									className="w-full rounded-lg px-4 py-2.5 pr-10 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
								>
									<option value="">Sélectionner un utilisateur</option>
									{allUsers.map((u: any) => (
										<option key={u._id} value={u._id}>
											{u.firstName} {u.lastName} ({u.email})
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Formation liée</label>
								<select
									value={linkedTraining}
									onChange={(e) => setLinkedTraining(e.target.value)}
									className="w-full rounded-lg px-4 py-2.5 pr-10 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
								>
									<option value="">Aucune formation</option>
									{allTrainings.map((t: any) => (
										<option key={t._id} value={t._id}>
											{t.title}
										</option>
									))}
								</select>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
									<input
										type="date"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
										className="w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
									<input
										type="date"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
										className="w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
								<input
									type="number"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									min="0"
									step="0.01"
									className="w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									PDF {editingContract?.pdfUrl ? "(remplacer)" : ""}
								</label>
								<input
									type="file"
									accept=".pdf"
									onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
									className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-univers/10 file:text-univers hover:file:bg-univers/20 file:cursor-pointer"
								/>
							</div>
						</div>

						<div className="flex justify-end gap-3 mt-6">
							<button
								onClick={() => setModalOpen(false)}
								className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 cursor-pointer"
							>
								Annuler
							</button>
							<button
								onClick={handleSave}
								disabled={saving}
								className={clsx(
									saving ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
									"px-4 py-2 rounded-lg bg-univers text-white font-semibold text-sm shadow-sm transition-all"
								)}
							>
								{saving ? (
									<Spin indicator={<LoadingOutlined spin className="text-base text-white" />} />
								) : editingContract ? (
									"Enregistrer"
								) : (
									"Créer"
								)}
							</button>
						</div>
					</div>
				</div>
			)}

			<PdfPreviewModal
				open={previewOpen}
				onClose={closePreview}
				title={previewTitle}
				pdfBlobUrl={previewBlobUrl}
				loading={previewLoading}
				watermark={previewContract ? getContractWatermark(previewContract) : undefined}
			/>
		</div>
	);
}
