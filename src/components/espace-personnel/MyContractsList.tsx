"use client";

import { useState, useEffect, useCallback } from "react";
import { getMyContracts, signContract, rejectContract, downloadContractPdf } from "@/lib/authApi";
import { notification, ConfigProvider, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	CheckCircleIcon,
	XCircleIcon,
	DocumentTextIcon,
	ArrowDownTrayIcon,
	CheckIcon,
	EyeIcon,
	NoSymbolIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import PdfPreviewModal from "./PdfPreviewModal";
import { addWatermarkToPdf } from "@/lib/pdfWatermark";

type NotificationType = "success" | "error";

const statusLabels: Record<string, string> = {
	sent: "En attente de signature",
	signed: "Signé",
	cancelled: "Annulé",
	rejected: "Rejeté",
};

const statusColors: Record<string, string> = {
	sent: "bg-amber-50 text-amber-700 border-amber-200",
	signed: "bg-green-50 text-green-700 border-green-200",
	cancelled: "bg-red-50 text-red-700 border-red-200",
	rejected: "bg-red-50 text-red-700 border-red-200",
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

export default function MyContractsList() {
	const [api, contextHolder] = notification.useNotification();
	const [contracts, setContracts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState<any>(null);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewLoading, setPreviewLoading] = useState(false);
	const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
	const [previewTitle, setPreviewTitle] = useState("");
	const [previewContract, setPreviewContract] = useState<any>(null);

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

	const loadContracts = useCallback(async (page: number) => {
		setLoading(true);
		try {
			const response = await getMyContracts(page);
			setContracts(response.data.contracts);
			setPagination(response.data.pagination);
		} catch {
			// silent
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadContracts(1);
	}, [loadContracts]);

	const handleSign = (id: string, title: string) => {
		Modal.confirm({
			title: "Signer le contrat ?",
			content: `En signant, vous acceptez les termes du contrat "${title}". Votre adresse IP et la date seront enregistrées.`,
			okText: "Accepter et signer",
			cancelText: "Annuler",
			okButtonProps: { style: { backgroundColor: "#263C27" } },
			onOk: async () => {
				try {
					await signContract(id);
					openNotification("success", "Signé", "Le contrat a été signé avec succès.");
					loadContracts(pagination?.page || 1);
				} catch (error: any) {
					openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors de la signature.");
				}
			},
		});
	};

	const handleReject = (id: string, title: string) => {
		Modal.confirm({
			title: "Rejeter le contrat ?",
			content: `Vous êtes sur le point de rejeter le contrat "${title}". Cette action est irréversible.`,
			okText: "Rejeter",
			cancelText: "Annuler",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await rejectContract(id);
					openNotification("success", "Rejeté", "Le contrat a été rejeté.");
					loadContracts(pagination?.page || 1);
				} catch (error: any) {
					openNotification("error", "Erreur", error.response?.data?.error || "Erreur lors du rejet.");
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
				pdfBlob = new Blob([watermarkedBytes], { type: "application/pdf" });
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

			<h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
				<DocumentTextIcon className="h-7 w-7 text-gray-400" />
				Mes contrats
			</h1>
			<p className="text-gray-500 mb-8">Consultez et signez vos contrats.</p>

			{loading ? (
				<div className="flex justify-center py-12">
					<Spin indicator={<LoadingOutlined spin className="text-2xl text-gray-400" />} />
				</div>
			) : contracts.length > 0 ? (
				<>
					<div className="grid grid-cols-1 gap-4">
						{contracts.map((c: any) => (
							<div key={c._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
								<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
									<div className="flex-1 min-w-0">
										<div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
											<h3 className="font-bold text-gray-900 text-lg">{c.title}</h3>
											<span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap", statusColors[c.status])}>
												{statusLabels[c.status]}
											</span>
										</div>
										{c.description && <p className="text-gray-500 text-sm mb-3">{c.description}</p>}
										<div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
											{c.linkedTraining && (
												<span>
													<span className="font-medium text-gray-700">Formation :</span> {c.linkedTraining.title}
												</span>
											)}
											{(c.startDate || c.endDate) && (
												<span>
													<span className="font-medium text-gray-700">Période :</span>{" "}
													{c.startDate && new Date(c.startDate).toLocaleDateString("fr-FR")}
													{c.startDate && c.endDate && " → "}
													{c.endDate && new Date(c.endDate).toLocaleDateString("fr-FR")}
												</span>
											)}
											{c.amount > 0 && (
												<span>
													<span className="font-medium text-gray-700">Montant :</span> {c.amount.toLocaleString("fr-FR")} €
												</span>
											)}
											{c.signedAt && (
												<span>
													<span className="font-medium text-gray-700">Signé le :</span>{" "}
													{new Date(c.signedAt).toLocaleDateString("fr-FR")}
												</span>
											)}
											{c.rejectedAt && (
												<span>
													<span className="font-medium text-gray-700">Rejeté le :</span>{" "}
													{new Date(c.rejectedAt).toLocaleDateString("fr-FR")}
												</span>
											)}
										</div>
									</div>
									<div className="flex flex-wrap items-center gap-2 flex-shrink-0">
										{c.pdfUrl && (
											<>
												<button
													onClick={() => handlePreview(c)}
													className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
												>
													<EyeIcon className="h-4 w-4" />
													Consulter
												</button>
												<button
													onClick={() => handleDownload(c)}
													className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
												>
													<ArrowDownTrayIcon className="h-4 w-4" />
													PDF
												</button>
											</>
										)}
										{c.status === "sent" && (
											<>
												<button
													onClick={() => handleReject(c._id, c.title)}
													className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 cursor-pointer transition-colors"
												>
													<NoSymbolIcon className="h-4 w-4" />
													Rejeter
												</button>
												<button
													onClick={() => handleSign(c._id, c.title)}
													className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-univers text-white text-sm font-semibold hover:bg-univers/90 cursor-pointer transition-colors"
												>
													<CheckIcon className="h-4 w-4" />
													Accepter et signer
												</button>
											</>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					{pagination && pagination.pages > 1 && (
						<div className="flex justify-center gap-2 mt-6">
							{Array.from({ length: pagination.pages }, (_, i) => (
								<button
									key={i + 1}
									onClick={() => loadContracts(i + 1)}
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
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
					<DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
					<p className="text-gray-500">Aucun contrat pour le moment.</p>
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
