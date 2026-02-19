"use client";

import { useState, useEffect, useCallback } from "react";
import { getProspects, contactProspect, convertProspect, updateProspectStatus } from "@/lib/authApi";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	CheckCircleIcon,
	XCircleIcon,
	MagnifyingGlassIcon,
	PaperAirplaneIcon,
	KeyIcon,
	CheckIcon,
	XMarkIcon,
	ArrowDownTrayIcon,
	EnvelopeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type NotificationType = "success" | "error";

interface Prospect {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	source: string;
	status: string;
	lastInteractionDate: string;
	interactionCount: number;
	hasCatalogueDownload: boolean;
	hasContactMessage: boolean;
	hasAccount: boolean;
	interactions: any[];
	createdAt: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
	nouveau: { label: "Nouveau", className: "bg-gray-100 text-gray-700" },
	contacte: { label: "Contacté", className: "bg-blue-50 text-blue-700" },
	archive: { label: "Archivé", className: "bg-gray-200 text-gray-600" },
};

const sourceLabels: Record<string, string> = {
	contact: "Contact",
	catalogue: "Catalogue",
	mixed: "Mixte",
};

export default function ProspectsPage() {
	const [api, contextHolder] = notification.useNotification();

	const [prospects, setProspects] = useState<Prospect[]>([]);
	const [prospectsLoading, setProspectsLoading] = useState(true);
	const [prospectsPagination, setProspectsPagination] = useState<any>(null);
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [sourceFilter, setSourceFilter] = useState("");

	// Contact modal
	const [contactModal, setContactModal] = useState<Prospect | null>(null);
	const [contactSubject, setContactSubject] = useState("");
	const [contactMessage, setContactMessage] = useState("");
	const [contacting, setContacting] = useState(false);

	// Convert modal
	const [convertModal, setConvertModal] = useState<Prospect | null>(null);
	const [convertRole, setConvertRole] = useState("apprenant");
	const [converting, setConverting] = useState(false);

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

	const loadProspects = useCallback(async (page: number = 1, source?: string, searchQuery?: string) => {
		setProspectsLoading(true);
		try {
			const response = await getProspects(page, source || undefined, searchQuery || undefined);
			setProspects(response.data.prospects);
			setProspectsPagination(response.data.pagination);
		} catch {
			openNotification("error", "Erreur", "Impossible de charger les prospects.");
		} finally {
			setProspectsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		loadProspects(1);
	}, [loadProspects]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setSearch(searchInput);
		loadProspects(1, sourceFilter, searchInput);
	};

	const handleSourceFilter = (value: string) => {
		setSourceFilter(value);
		loadProspects(1, value, search);
	};

	const handleContact = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!contactModal || !contactSubject || !contactMessage) {
			openNotification("error", "Erreur", "Veuillez remplir tous les champs.");
			return;
		}
		setContacting(true);
		try {
			await contactProspect(contactModal._id, { subject: contactSubject, message: contactMessage });
			openNotification("success", "Email envoyé", "Le prospect a été contacté avec succès.");
			setContactModal(null);
			setContactSubject("");
			setContactMessage("");
			loadProspects(prospectsPagination?.page || 1, sourceFilter, search);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'envoi.");
		} finally {
			setContacting(false);
		}
	};

	const handleConvert = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!convertModal) return;
		setConverting(true);
		try {
			await convertProspect(convertModal._id, convertRole);
			openNotification("success", "Code créé", "Le code d'activation a été envoyé au prospect.");
			setConvertModal(null);
			setConvertRole("apprenant");
			loadProspects(prospectsPagination?.page || 1, sourceFilter, search);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la conversion.");
		} finally {
			setConverting(false);
		}
	};

	const handleStatusChange = async (prospect: Prospect, newStatus: string) => {
		try {
			await updateProspectStatus(prospect._id, newStatus);
			loadProspects(prospectsPagination?.page || 1, sourceFilter, search);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la mise à jour.");
		}
	};

	const inputClass =
		"block w-full rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm placeholder:text-gray-400 text-sm font-medium transition-all duration-200";
	const selectClass = inputClass + " pr-10";

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

				<h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion des prospects</h1>
				<p className="text-gray-500 mb-8">Suivez et gérez vos prospects depuis cette page.</p>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sticky top-0 z-10 bg-white py-1">
						<h2 className="text-lg font-bold text-gray-900">Prospects</h2>
						<div className="flex flex-col sm:flex-row gap-3">
							<form onSubmit={handleSearch} className="flex gap-2">
								<div className="relative flex-1">
									<MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
									<input
										type="text"
										value={searchInput}
										onChange={(e) => setSearchInput(e.target.value)}
										placeholder="Rechercher..."
										className="pl-9 pr-4 py-2 rounded-lg text-sm text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 w-full"
									/>
								</div>
								<button
									type="submit"
									className="px-3 py-2 rounded-lg bg-univers text-white text-sm font-medium hover:bg-univers/90 transition-colors"
								>
									Rechercher
								</button>
							</form>
							<select
								value={sourceFilter}
								onChange={(e) => handleSourceFilter(e.target.value)}
								className="rounded-lg px-3 py-2 pr-10 text-sm text-gray-700 bg-white border border-gray-300 focus:border-univers"
							>
								<option value="">Toutes les sources</option>
								<option value="contact">Contact</option>
								<option value="catalogue">Catalogue</option>
								<option value="mixed">Mixte</option>
							</select>
						</div>
					</div>

					{prospectsLoading ? (
						<div className="flex justify-center py-8">
							<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
						</div>
					) : prospects.length === 0 ? (
						<p className="text-gray-500 text-center py-8">Aucun prospect trouvé.</p>
					) : (
						<>
							<div className="overflow-x-auto">
								<table className="w-full text-left text-sm">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Nom</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Email</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Source</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Interactions</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Dernière</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">
												<ArrowDownTrayIcon className="h-4 w-4 inline" title="Catalogue" />
											</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">
												<EnvelopeIcon className="h-4 w-4 inline" title="Message" />
											</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Statut</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
										</tr>
									</thead>
									<tbody>
										{prospects.map((prospect) => {
											const st = statusConfig[prospect.status] || statusConfig.nouveau;
											return (
												<tr key={prospect._id} className="border-b border-gray-100">
													<td className="py-3 px-2 font-medium text-gray-900 whitespace-nowrap">
														{prospect.firstName} {prospect.lastName}
													</td>
													<td className="py-3 px-2 text-gray-700">{prospect.email}</td>
													<td className="py-3 px-2">
														<span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
															{sourceLabels[prospect.source] || prospect.source}
														</span>
													</td>
													<td className="py-3 px-2 text-gray-700 text-center">{prospect.interactionCount || 0}</td>
													<td className="py-3 px-2 text-gray-500 whitespace-nowrap">
														{prospect.lastInteractionDate
															? new Date(prospect.lastInteractionDate).toLocaleDateString("fr-FR")
															: "-"}
													</td>
													<td className="py-3 px-2 text-center">
														{prospect.hasCatalogueDownload ? (
															<CheckIcon className="h-4 w-4 text-green-500 inline" />
														) : (
															<XMarkIcon className="h-4 w-4 text-gray-300 inline" />
														)}
													</td>
													<td className="py-3 px-2 text-center">
														{prospect.hasContactMessage ? (
															<CheckIcon className="h-4 w-4 text-green-500 inline" />
														) : (
															<XMarkIcon className="h-4 w-4 text-gray-300 inline" />
														)}
													</td>
													<td className="py-3 px-2">
														<select
															value={prospect.status || "nouveau"}
															onChange={(e) => handleStatusChange(prospect, e.target.value)}
															className={clsx(
																"px-2 py-1 pr-6 rounded-full text-xs font-semibold border-0 cursor-pointer",
																st.className
															)}
														>
															<option value="nouveau">Nouveau</option>
															<option value="contacte">Contacté</option>
															<option value="archive">Archivé</option>
														</select>
													</td>
													<td className="py-3 px-2">
														<div className="flex items-center gap-1">
															<button
																onClick={() => setContactModal(prospect)}
																title="Contacter"
																className="p-1.5 rounded-lg text-gray-500 hover:text-univers hover:bg-gray-100 transition-colors"
															>
																<PaperAirplaneIcon className="h-4 w-4" />
															</button>
															{!prospect.hasAccount && prospect.status !== "converti" && (
																<button
																	onClick={() => setConvertModal(prospect)}
																	title="Créer un code"
																	className="p-1.5 rounded-lg text-gray-500 hover:text-cohesion hover:bg-gray-100 transition-colors"
																>
																	<KeyIcon className="h-4 w-4" />
																</button>
															)}
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>

							{prospectsPagination && prospectsPagination.pages > 1 && (
								<div className="flex justify-center gap-2 mt-4">
									{Array.from({ length: prospectsPagination.pages }, (_, i) => (
										<button
											key={i + 1}
											onClick={() => loadProspects(i + 1, sourceFilter, search)}
											className={clsx(
												"px-3 py-1 rounded text-sm font-medium",
												prospectsPagination.page === i + 1
													? "bg-univers text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											)}
										>
											{i + 1}
										</button>
									))}
								</div>
							)}
						</>
					)}
				</div>

				{/* Contact Modal */}
				<Modal
					title={`Contacter ${contactModal?.firstName} ${contactModal?.lastName}`}
					open={!!contactModal}
					onCancel={() => !contacting && setContactModal(null)}
					footer={null}
					width="min(600px, 95vw)"
					centered
					destroyOnClose
				>
					<form onSubmit={handleContact} className="space-y-4 mt-4">
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Destinataire
							</label>
							<p className="text-sm text-gray-500">{contactModal?.email}</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Sujet<span className="text-red-400 ml-1">*</span>
							</label>
							<input
								type="text"
								value={contactSubject}
								onChange={(e) => setContactSubject(e.target.value)}
								placeholder="Sujet de l'email"
								disabled={contacting}
								className={inputClass}
							/>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Message<span className="text-red-400 ml-1">*</span>
							</label>
							<textarea
								value={contactMessage}
								onChange={(e) => setContactMessage(e.target.value)}
								placeholder="Votre message..."
								rows={6}
								disabled={contacting}
								className={clsx(inputClass, "resize-none")}
							/>
						</div>
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setContactModal(null)}
								disabled={contacting}
								className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								Annuler
							</button>
							<button
								type="submit"
								disabled={contacting}
								className={clsx(
									contacting ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
									"px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2"
								)}
							>
								{contacting ? (
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

				{/* Convert Modal */}
				<Modal
					title={`Créer un code pour ${convertModal?.firstName} ${convertModal?.lastName}`}
					open={!!convertModal}
					onCancel={() => !converting && setConvertModal(null)}
					footer={null}
					width="min(480px, 95vw)"
					centered
					destroyOnClose
				>
					<form onSubmit={handleConvert} className="space-y-4 mt-4">
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Email du prospect
							</label>
							<p className="text-sm text-gray-500">{convertModal?.email}</p>
						</div>
						<div>
							<label className="text-sm font-semibold text-gray-700 mb-1 block">
								Rôle<span className="text-red-400 ml-1">*</span>
							</label>
							<select
								value={convertRole}
								onChange={(e) => setConvertRole(e.target.value)}
								disabled={converting}
								className={selectClass}
							>
								<option value="apprenant">Apprenant</option>
								<option value="professionnel">Professionnel</option>
							</select>
						</div>
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setConvertModal(null)}
								disabled={converting}
								className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								Annuler
							</button>
							<button
								type="submit"
								disabled={converting}
								className={clsx(
									converting ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
									"px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-univers shadow-sm transition-all duration-200 flex items-center gap-2"
								)}
							>
								{converting ? (
									<Spin indicator={<LoadingOutlined spin className="text-base text-white" />} />
								) : (
									<>
										<KeyIcon className="h-4 w-4" />
										Créer et envoyer
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
