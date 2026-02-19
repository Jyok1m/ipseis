"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getMyContracts } from "@/lib/authApi";
import { useSocket } from "@/context/SocketContext";
import Link from "next/link";
import {
	BriefcaseIcon,
	DocumentTextIcon,
	ClockIcon,
	CheckCircleIcon,
	ExclamationTriangleIcon,
	ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import MyResourcesList from "@/components/espace-personnel/MyResourcesList";
import InfoTooltip from "@/components/espace-personnel/InfoTooltip";
import clsx from "clsx";

const statusLabels: Record<string, string> = {
	sent: "En attente",
	signed: "Signé",
	cancelled: "Annulé",
	rejected: "Refusé",
};

const statusColors: Record<string, string> = {
	sent: "bg-amber-50 text-amber-700",
	signed: "bg-green-50 text-green-700",
	cancelled: "bg-red-50 text-red-700",
	rejected: "bg-red-100 text-red-800",
};

export default function ProfessionnelDashboard() {
	const { user } = useAuth();
	const { unreadCount: unreadMessages } = useSocket();
	const [recentContracts, setRecentContracts] = useState<any[]>([]);
	const [contractStats, setContractStats] = useState({ active: 0, pending: 0 });

	useEffect(() => {
		(async () => {
			try {
				const response = await getMyContracts(1);
				const contracts = response.data.contracts || [];
				setRecentContracts(contracts.slice(0, 3));
				setContractStats({
					active: contracts.filter((c: any) => c.status === "signed").length,
					pending: contracts.filter((c: any) => c.status === "sent").length,
				});
			} catch {
				// silent
			}
		})();
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Espace Professionnel</h1>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
				<div className="flex items-start gap-4">
					<BriefcaseIcon className="h-10 w-10 text-maitrise flex-shrink-0" />
					<div>
						<h2 className="text-xl font-bold text-gray-900 mb-1">
							Bienvenue, {user?.firstName} {user?.lastName}
						</h2>
						<p className="text-gray-500">Retrouvez ici vos informations, contrats et outils professionnels.</p>
					</div>
				</div>
			</div>

			{/* Bannière d'action si contrats en attente */}
			{contractStats.pending > 0 && (
				<div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<ExclamationTriangleIcon className="h-6 w-6 text-amber-600 flex-shrink-0" />
						<p className="text-sm font-medium text-amber-800">
							Vous avez {contractStats.pending} contrat{contractStats.pending > 1 ? "s" : ""} en attente de signature.
						</p>
					</div>
					<Link
						href="/espace-personnel/professionnel/contrats"
						className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors flex-shrink-0"
					>
						Signer mes contrats
					</Link>
				</div>
			)}

			{/* Bannière messages non lus */}
			{unreadMessages > 0 && (
				<div className="bg-univers/5 border border-univers/20 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<ChatBubbleLeftRightIcon className="h-6 w-6 text-univers flex-shrink-0" />
						<p className="text-sm font-medium text-univers">
							Vous avez {unreadMessages} nouveau{unreadMessages > 1 ? "x" : ""} message{unreadMessages > 1 ? "s" : ""}.
						</p>
					</div>
					<Link
						href="/espace-personnel/professionnel/messages"
						className="px-4 py-2 rounded-lg bg-univers text-white text-sm font-semibold hover:bg-univers/90 transition-colors flex-shrink-0"
					>
						Voir mes messages
					</Link>
				</div>
			)}

			{/* KPI */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
				<InfoTooltip title="Contrats actifs" description="Contrats que vous avez signés et qui sont en vigueur.">
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
						<div className="p-3 rounded-lg bg-green-50">
							<CheckCircleIcon className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">{contractStats.active}</p>
							<p className="text-sm text-gray-500">Contrats actifs</p>
						</div>
					</div>
				</InfoTooltip>
				<InfoTooltip title="En attente" description="Contrats qui vous ont été envoyés et qui nécessitent votre signature.">
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
						<div className="p-3 rounded-lg bg-amber-50">
							<ClockIcon className="h-6 w-6 text-amber-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-gray-900">{contractStats.pending}</p>
							<p className="text-sm text-gray-500">En attente de signature</p>
						</div>
					</div>
				</InfoTooltip>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Contrats récents */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="font-bold text-gray-900">Contrats récents</h3>
						<InfoTooltip title="Tous les contrats" description="Voir la liste complète de vos contrats, les signer ou les consulter.">
							<Link href="/espace-personnel/professionnel/contrats" className="text-sm text-univers hover:underline font-semibold">
								Voir tous
							</Link>
						</InfoTooltip>
					</div>
					{recentContracts.length > 0 ? (
						<ul className="space-y-3">
							{recentContracts.map((c: any) => (
								<li key={c._id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
									<div className="flex items-center gap-3 min-w-0">
										<DocumentTextIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
										<span className="text-sm font-medium text-gray-900 truncate">{c.title}</span>
									</div>
									<span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0", statusColors[c.status])}>
										{statusLabels[c.status]}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p className="text-sm text-gray-500">Aucun contrat pour le moment.</p>
					)}
				</div>
			</div>

			{/* Ressources récentes */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-bold text-gray-900">Ressources récentes</h3>
					<InfoTooltip title="Toutes les ressources" description="Accéder à l'ensemble de vos documents PDF et supports de formation.">
						<Link href="/espace-personnel/professionnel/activite" className="text-sm text-univers hover:underline font-semibold">
							Voir toutes
						</Link>
					</InfoTooltip>
				</div>
				<MyResourcesList limit={3} />
			</div>
		</div>
	);
}
