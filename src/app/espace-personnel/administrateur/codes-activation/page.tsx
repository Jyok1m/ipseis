"use client";

import { useState } from "react";
import { createActivationCode, getActivationCodes } from "@/lib/authApi";
import { notification, ConfigProvider, Spin } from "antd";
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
			if (codesLoaded) loadCodes(1);
		} catch (error: any) {
			openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la création.");
		} finally {
			setIsCreating(false);
		}
	};

	const loadCodes = async (page: number) => {
		setCodesLoading(true);
		try {
			const response = await getActivationCodes(page);
			setCodes(response.data.codes);
			setCodesPagination(response.data.pagination);
			setCodesLoaded(true);
		} catch {
			openNotification("error", "Erreur", "Impossible de charger les codes.");
		} finally {
			setCodesLoading(false);
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
						<button
							onClick={() => loadCodes(1)}
							disabled={codesLoading}
							className="text-sm text-univers hover:underline font-semibold"
						>
							{codesLoaded ? "Rafraichir" : "Charger"}
						</button>
					</div>

					{codesLoading ? (
						<div className="flex justify-center py-8">
							<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
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
										</tr>
									</thead>
									<tbody>
										{codes.map((code: any) => (
											<tr key={code._id} className="border-b border-gray-100">
												<td className="py-3 px-2 font-mono text-sm text-gray-900">{code.code}</td>
												<td className="py-3 px-2 text-gray-700">{code.targetEmail}</td>
												<td className="py-3 px-2 text-gray-700 capitalize">{code.role}</td>
												<td className="py-3 px-2">
													<span
														className={clsx(
															"px-2 py-1 rounded-full text-xs font-semibold",
															code.isUsed ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
														)}
													>
														{code.isUsed ? "Utilisé" : "En attente"}
													</span>
												</td>
												<td className="py-3 px-2 text-gray-500">{new Date(code.expiresAt).toLocaleDateString("fr-FR")}</td>
											</tr>
										))}
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
