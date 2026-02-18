"use client";

import { useState, useEffect } from "react";
import { createActivationCode, getActivationCodes, cancelActivationCode, archiveActivationCode } from "@/lib/authApi";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon, KeyIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type NotificationType = "success" | "error";

export default function CodesActivationPage() {
	const [api, contextHolder] = notification.useNotification();

	// Activation code form
	const [targetEmail, setTargetEmail] = useState("");
	const [role, setRole] = useState("apprenant");
	const [isCreating, setIsCreating] = useState(false);

	// Codes list
	const [codes, setCodes] = useState<any[]>([]);
	const [codesLoaded, setCodesLoaded] = useState(false);
	const [codesLoading, setCodesLoading] = useState(false);
	const [codesPagination, setCodesPagination] = useState<any>(null);
	const [showArchived, setShowArchived] = useState(false);

	useEffect(() => {
		loadCodes(1);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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

	const handleCreateCode = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!targetEmail) {
			openNotification("error", "Erreur", "Veuillez saisir l'adresse email.");
			return;
		}
		setIsCreating(true);
		try {
			const response = await createActivationCode(targetEmail, role);
			openNotification("success", "Code créé", response.data.message);
			setTargetEmail("");
			loadCodes(1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la création.");
		} finally {
			setIsCreating(false);
		}
	};

	const loadCodes = async (page: number, archived?: boolean) => {
		const archivedValue = archived !== undefined ? archived : showArchived;
		setCodesLoading(true);
		try {
			const response = await getActivationCodes(page, archivedValue);
			setCodes(response.data.codes);
			setCodesPagination(response.data.pagination);
			setCodesLoaded(true);
		} catch {
			openNotification("error", "Erreur", "Impossible de charger les codes.");
		} finally {
			setCodesLoading(false);
		}
	};

	const handleCancel = (code: any) => {
		Modal.confirm({
			title: "Annuler ce code d'activation ?",
			content: `Le code ${code.code} pour ${code.targetEmail} ne pourra plus être utilisé pour s'inscrire.`,
			okText: "Annuler le code",
			cancelText: "Retour",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await cancelActivationCode(code._id);
					openNotification("success", "Code annulé", "Le code a été annulé avec succès.");
					loadCodes(codesPagination?.page || 1);
				} catch (error: any) {
					openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'annulation.");
				}
			},
		});
	};

	const handleArchive = async (code: any) => {
		try {
			await archiveActivationCode(code._id);
			openNotification("success", "Code archivé", "Le code a été archivé.");
			loadCodes(codesPagination?.page || 1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de l'archivage.");
		}
	};

	const getCodeStatus = (code: any) => {
		if (code.isUsed) return { label: "Utilisé", className: "bg-green-50 text-green-700" };
		if (code.cancelled) return { label: "Annulé", className: "bg-red-50 text-red-700" };
		if (new Date(code.expiresAt) < new Date()) return { label: "Expiré", className: "bg-gray-100 text-gray-500" };
		return { label: "En attente", className: "bg-amber-50 text-amber-700" };
	};

	const canCancel = (code: any) => !code.isUsed && !code.cancelled;
	const canArchive = (code: any) => code.isUsed || code.cancelled || new Date(code.expiresAt) < new Date();

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

				<h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
					<KeyIcon className="h-7 w-7 text-gray-400" />
					Codes d&apos;activation
				</h1>
				<p className="text-gray-500 mb-8">Créez et suivez les codes d&apos;invitation pour les nouveaux utilisateurs.</p>

				{/* Créer un code d'activation */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
					<h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
						<KeyIcon className="h-5 w-5 text-univers" />
						Créer un code d&apos;activation
					</h2>
					<p className="text-sm text-gray-500 mb-4">
						Saisissez l&apos;email du futur utilisateur et choisissez son rôle. Un code unique lui sera envoyé par email pour s&apos;inscrire.
					</p>
					<form onSubmit={handleCreateCode} className="flex flex-col sm:flex-row gap-3">
						<input
							type="email"
							value={targetEmail}
							onChange={(e) => setTargetEmail(e.target.value)}
							placeholder="Email du destinataire"
							disabled={isCreating}
							className="flex-1 rounded-lg px-4 py-2.5 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm placeholder:text-gray-400 text-sm font-medium transition-all duration-200"
						/>
						<select
							value={role}
							onChange={(e) => setRole(e.target.value)}
							disabled={isCreating}
							className="rounded-lg px-4 py-2.5 pr-10 text-gray-900 bg-white border border-gray-300 focus:border-univers focus:ring-2 focus:ring-univers/20 shadow-sm text-sm font-medium transition-all duration-200"
						>
							<option value="apprenant">Apprenant</option>
							<option value="professionnel">Professionnel</option>
						</select>
						<button
							type="submit"
							disabled={isCreating}
							className={clsx(
								isCreating ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90",
								"rounded-lg bg-univers px-5 py-2.5 text-white font-semibold shadow-sm transition-all duration-200 whitespace-nowrap text-sm"
							)}
						>
							{isCreating ? <Spin indicator={<LoadingOutlined spin className="text-base text-white" />} /> : "Envoyer le code"}
						</button>
					</form>
				</div>

				{/* Liste des codes */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
							<KeyIcon className="h-5 w-5 text-maitrise" />
							Historique des codes
						</h2>
						<div className="flex items-center gap-4">
							<label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap cursor-pointer">
								<input
									type="checkbox"
									checked={showArchived}
									onChange={(e) => {
										setShowArchived(e.target.checked);
										if (codesLoaded) {
											loadCodes(1, e.target.checked);
										}
									}}
									className="rounded border-gray-300 text-univers focus:ring-univers"
								/>
								Afficher les archivés
							</label>
							<button
								onClick={() => loadCodes(1)}
								disabled={codesLoading}
								className="text-sm text-univers hover:underline font-semibold"
							>
								Rafraichir
							</button>
						</div>
					</div>

					{codesLoading ? (
						<div className="flex justify-center py-8">
							<Spin indicator={<LoadingOutlined spin className="text-2xl text-cohesion" />} />
						</div>
					) : codesLoaded && codes.length > 0 ? (
						<>
							<div className="overflow-x-auto">
								<table className="w-full text-left text-sm">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Code</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Email</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Rôle</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Statut</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Expire</th>
											<th className="py-3 px-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
										</tr>
									</thead>
									<tbody>
										{codes.map((code: any) => {
											const status = getCodeStatus(code);
											return (
												<tr key={code._id} className="border-b border-gray-100">
													<td className="py-3 px-2 font-mono text-sm text-gray-900">{code.code}</td>
													<td className="py-3 px-2 text-gray-700">{code.targetEmail}</td>
													<td className="py-3 px-2 text-gray-700 capitalize">{code.role}</td>
													<td className="py-3 px-2">
														<span className={clsx("px-2 py-1 rounded-full text-xs font-semibold", status.className)}>
															{status.label}
														</span>
													</td>
													<td className="py-3 px-2 text-gray-500">{new Date(code.expiresAt).toLocaleDateString("fr-FR")}</td>
													<td className="py-3 px-2">
														<div className="flex items-center gap-2">
															{canCancel(code) && (
																<button
																	onClick={() => handleCancel(code)}
																	className="text-xs font-medium text-red-600 hover:text-red-800 hover:underline"
																>
																	Annuler
																</button>
															)}
															{canArchive(code) && !code.archived && (
																<button
																	onClick={() => handleArchive(code)}
																	className="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline"
																>
																	Archiver
																</button>
															)}
															{code.archived && (
																<span className="text-xs text-gray-400 italic">Archivé</span>
															)}
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
							{codesPagination && codesPagination.pages > 1 && (
								<div className="flex justify-center gap-2 mt-4">
									{Array.from({ length: codesPagination.pages }, (_, i) => (
										<button
											key={i + 1}
											onClick={() => loadCodes(i + 1)}
											className={clsx(
												"px-3 py-1 rounded text-sm font-medium",
												codesPagination.page === i + 1 ? "bg-univers text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
											)}
										>
											{i + 1}
										</button>
									))}
								</div>
							)}
						</>
					) : codesLoaded ? (
						<p className="text-gray-500 text-center py-4">Aucun code d&apos;activation.</p>
					) : null}
				</div>
			</ConfigProvider>
		</div>
	);
}
