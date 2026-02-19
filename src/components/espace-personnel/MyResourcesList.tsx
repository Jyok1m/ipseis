"use client";

import { useState, useEffect } from "react";
import { getMyResources, downloadResourcePdf } from "@/lib/authApi";
import { DocumentTextIcon, ArrowDownTrayIcon, AcademicCapIcon, EyeIcon } from "@heroicons/react/24/outline";
import { notification, ConfigProvider, Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import PdfPreviewModal from "./PdfPreviewModal";

interface Resource {
	_id: string;
	title: string;
	description: string;
	originalFileName: string;
	linkedTraining: { _id: string; title: string } | null;
	targetRoles: string[];
	createdAt: string;
}

interface GroupedResources {
	training: { _id: string; title: string };
	resources: Resource[];
}

export default function MyResourcesList({ limit }: { limit?: number }) {
	const [grouped, setGrouped] = useState<GroupedResources[]>([]);
	const [loading, setLoading] = useState(true);
	const [downloading, setDownloading] = useState<string | null>(null);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewLoading, setPreviewLoading] = useState(false);
	const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
	const [previewTitle, setPreviewTitle] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const res = await getMyResources();
				const resources: Resource[] = res.data.resources || [];

				// Group by training
				const map = new Map<string, GroupedResources>();
				for (const r of resources) {
					if (!r.linkedTraining) continue;
					const key = r.linkedTraining._id;
					if (!map.has(key)) {
						map.set(key, { training: r.linkedTraining, resources: [] });
					}
					map.get(key)!.resources.push(r);
				}
				setGrouped(Array.from(map.values()));
			} catch {
				// silent
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleDownload = async (resource: Resource) => {
		setDownloading(resource._id);
		try {
			const response = await downloadResourcePdf(resource._id);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.download = resource.originalFileName || `${resource.title}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch {
			// silent
		} finally {
			setDownloading(null);
		}
	};

	const handlePreview = async (resource: Resource) => {
		setPreviewTitle(resource.title);
		setPreviewBlobUrl(null);
		setPreviewLoading(true);
		setPreviewOpen(true);
		try {
			const response = await downloadResourcePdf(resource._id);
			const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
			setPreviewBlobUrl(url);
		} catch {
			// silent
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

	if (loading) {
		return (
			<div className="flex justify-center py-16">
				<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
			</div>
		);
	}

	// Flatten for limit mode (dashboard preview)
	if (limit) {
		const allResources = grouped.flatMap((g) => g.resources);
		const limited = allResources.slice(0, limit);

		if (limited.length === 0) {
			return <p className="text-sm text-gray-500">Aucune ressource pour le moment.</p>;
		}

		return (
			<>
				<ul className="space-y-3">
					{limited.map((r) => (
						<li key={r._id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
							<div className="flex items-center gap-3 min-w-0">
								<DocumentTextIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
								<div className="min-w-0">
									<span className="text-sm font-medium text-gray-900 truncate block">{r.title}</span>
									<span className="text-xs text-gray-500">{r.linkedTraining?.title}</span>
								</div>
							</div>
							<div className="flex items-center gap-1 flex-shrink-0">
								<button
									onClick={() => handlePreview(r)}
									className="p-2 rounded-lg text-univers hover:bg-univers/10 transition-colors"
									title="Consulter"
								>
									<EyeIcon className="h-4 w-4" />
								</button>
								<button
									onClick={() => handleDownload(r)}
									disabled={downloading === r._id}
									className="p-2 rounded-lg text-univers hover:bg-univers/10 transition-colors"
									title="Télécharger"
								>
									{downloading === r._id ? (
										<Spin indicator={<LoadingOutlined spin />} size="small" className="text-cohesion" />
									) : (
										<ArrowDownTrayIcon className="h-4 w-4" />
									)}
								</button>
							</div>
						</li>
					))}
				</ul>
				<PdfPreviewModal
					open={previewOpen}
					onClose={closePreview}
					title={previewTitle}
					pdfBlobUrl={previewBlobUrl}
					loading={previewLoading}
				/>
			</>
		);
	}

	if (grouped.length === 0) {
		return (
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
				<DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
				<p className="text-gray-500">Aucune ressource disponible pour le moment.</p>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-6">
				{grouped.map((group) => (
					<div key={group.training._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
						<div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
							<AcademicCapIcon className="h-5 w-5 text-gray-400" />
							<h3 className="font-bold text-gray-900 text-sm">{group.training.title}</h3>
							<span className="text-gray-400 text-xs ml-auto">{group.resources.length} ressource{group.resources.length > 1 ? "s" : ""}</span>
						</div>
						<ul className="divide-y divide-gray-100">
							{group.resources.map((r) => (
								<li key={r._id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
									<DocumentTextIcon className="h-5 w-5 text-cohesion flex-shrink-0" />
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900">{r.title}</p>
										{r.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{r.description}</p>}
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<button
											onClick={() => handlePreview(r)}
											className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-univers bg-univers/10 hover:bg-univers/20 transition-colors cursor-pointer"
										>
											<EyeIcon className="h-4 w-4" />
											Consulter
										</button>
										<button
											onClick={() => handleDownload(r)}
											disabled={downloading === r._id}
											className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-univers bg-univers/10 hover:bg-univers/20 transition-colors"
										>
											{downloading === r._id ? (
												<Spin indicator={<LoadingOutlined spin />} size="small" className="text-cohesion" />
											) : (
												<>
													<ArrowDownTrayIcon className="h-4 w-4" />
													Télécharger
												</>
											)}
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<PdfPreviewModal
				open={previewOpen}
				onClose={closePreview}
				title={previewTitle}
				pdfBlobUrl={previewBlobUrl}
				loading={previewLoading}
			/>
		</>
	);
}
