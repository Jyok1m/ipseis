"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { getDashboardStats } from "@/lib/authApi";
import { useSocket } from "@/context/SocketContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
	UsersIcon,
	AcademicCapIcon,
	DocumentTextIcon,
	ClockIcon,
	CheckCircleIcon,
	UserGroupIcon,
	PlusIcon,
	ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import InfoTooltip from "@/components/espace-personnel/InfoTooltip";

interface Stats {
	totalProspects: number;
	prospectsThisMonth: number;
	totalUsers: number;
	totalTrainings: number;
	totalContracts: number;
	contractsByStatus: { draft: number; sent: number; signed: number; cancelled: number; rejected: number };
	recentContracts: { _id: string; title: string; recipientName: string; status: string; createdAt: string }[];
	recentUsers: { _id: string; firstName: string; lastName: string; role: string; createdAt: string }[];
	checklistsInProgress: number;
}

const contractStatusLabels: Record<string, string> = {
	draft: "Brouillon",
	sent: "Envoyé",
	signed: "Signé",
	cancelled: "Annulé",
	rejected: "Refusé",
};

const contractStatusColors: Record<string, string> = {
	draft: "bg-gray-100 text-gray-700",
	sent: "bg-amber-50 text-amber-700",
	signed: "bg-green-50 text-green-700",
	cancelled: "bg-red-50 text-red-700",
	rejected: "bg-red-100 text-red-800",
};

const roleLabels: Record<string, string> = {
	administrateur: "Admin",
	apprenant: "Apprenant",
	professionnel: "Professionnel",
};

const roleColors: Record<string, string> = {
	administrateur: "bg-univers/10 text-univers",
	apprenant: "bg-maitrise/10 text-maitrise",
	professionnel: "bg-cohesion/10 text-cohesion",
};

export default function AdminDashboard() {
	const { user } = useAuth();
	const { unreadCount: unreadMessages } = useSocket();
	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);

	const loadStats = useCallback(async () => {
		try {
			const response = await getDashboardStats();
			setStats(response.data);
		} catch {
			// silent
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadStats();
	}, [loadStats]);

	if (loading) {
		return (
			<div className="flex justify-center py-20">
				<Spin indicator={<LoadingOutlined spin className="text-3xl text-gray-400" />} />
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
			<p className="text-gray-500 mb-8">
				Bienvenue, {user?.firstName}. Vue d&apos;ensemble.
			</p>

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
						href="/espace-personnel/administrateur/messages"
						className="px-4 py-2 rounded-lg bg-univers text-white text-sm font-semibold hover:bg-univers/90 transition-colors flex-shrink-0"
					>
						Voir mes messages
					</Link>
				</div>
			)}

			{/* KPI Cards - Cliquables */}
			{stats && (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
						<InfoTooltip title="Prospects" description="Personnes ayant téléchargé le catalogue ou envoyé un message via le site. Cliquez pour gérer.">
							<Link href="/espace-personnel/administrateur/prospects" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-univers hover:shadow-md transition-all">
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 rounded-lg bg-univers/10">
										<UserGroupIcon className="h-5 w-5 text-univers" />
									</div>
									<span className="text-sm font-medium text-gray-500">Prospects</span>
								</div>
								<p className="text-2xl font-bold text-gray-900">{stats.totalProspects}</p>
								<p className="text-xs text-maitrise font-medium mt-1">+{stats.prospectsThisMonth} ce mois</p>
							</Link>
						</InfoTooltip>

						<InfoTooltip title="Utilisateurs" description="Comptes inscrits sur la plateforme (admins, apprenants, professionnels). Cliquez pour gérer les comptes.">
							<Link href="/espace-personnel/administrateur/utilisateurs" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-univers hover:shadow-md transition-all">
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 rounded-lg bg-maitrise/10">
										<UsersIcon className="h-5 w-5 text-maitrise" />
									</div>
									<span className="text-sm font-medium text-gray-500">Utilisateurs</span>
								</div>
								<p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
							</Link>
						</InfoTooltip>

						<InfoTooltip title="Formations" description="Formations publiées au catalogue. Cliquez pour ajouter, modifier ou masquer des formations.">
							<Link href="/espace-personnel/administrateur/formations" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-univers hover:shadow-md transition-all">
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 rounded-lg bg-cohesion/10">
										<AcademicCapIcon className="h-5 w-5 text-cohesion" />
									</div>
									<span className="text-sm font-medium text-gray-500">Formations</span>
								</div>
								<p className="text-2xl font-bold text-gray-900">{stats.totalTrainings}</p>
							</Link>
						</InfoTooltip>

						<InfoTooltip title="Contrats" description="Nombre total de contrats (tous statuts confondus). Cliquez pour voir la liste complète.">
							<Link href="/espace-personnel/administrateur/contrats" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-univers hover:shadow-md transition-all">
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 rounded-lg bg-gray-100">
										<DocumentTextIcon className="h-5 w-5 text-gray-500" />
									</div>
									<span className="text-sm font-medium text-gray-500">Contrats</span>
								</div>
								<p className="text-2xl font-bold text-gray-900">{stats.totalContracts}</p>
							</Link>
						</InfoTooltip>

						<InfoTooltip title="En attente" description="Contrats envoyés mais pas encore signés par le destinataire. Cliquez pour les filtrer.">
							<Link href="/espace-personnel/administrateur/contrats?status=sent" className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-5 hover:border-amber-400 hover:shadow-md transition-all">
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 rounded-lg bg-amber-100">
										<ClockIcon className="h-5 w-5 text-amber-600" />
									</div>
									<span className="text-sm font-medium text-amber-700">En attente</span>
								</div>
								<p className="text-2xl font-bold text-amber-900">{stats.contractsByStatus.sent}</p>
							</Link>
						</InfoTooltip>

						<InfoTooltip title="Signés" description="Contrats signés par les destinataires. Cliquez pour les filtrer.">
							<Link href="/espace-personnel/administrateur/contrats?status=signed" className="bg-green-50 rounded-xl shadow-sm border border-green-200 p-5 hover:border-green-400 hover:shadow-md transition-all">
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 rounded-lg bg-green-100">
										<CheckCircleIcon className="h-5 w-5 text-green-600" />
									</div>
									<span className="text-sm font-medium text-green-700">Signés</span>
								</div>
								<p className="text-2xl font-bold text-green-900">{stats.contractsByStatus.signed}</p>
							</Link>
						</InfoTooltip>
					</div>

					{/* Raccourcis rapides */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
						<h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Raccourcis rapides</h2>
						<div className="flex flex-wrap gap-3">
							<InfoTooltip title="Formations" description="Accéder à la gestion des formations pour en ajouter ou modifier.">
								<Link
									href="/espace-personnel/administrateur/formations"
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-univers hover:text-univers transition-colors"
								>
									<PlusIcon className="h-4 w-4" />
									Formation
								</Link>
							</InfoTooltip>
							<InfoTooltip title="Contrats" description="Accéder à la gestion des contrats pour en créer ou envoyer.">
								<Link
									href="/espace-personnel/administrateur/contrats"
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-univers hover:text-univers transition-colors"
								>
									<PlusIcon className="h-4 w-4" />
									Contrat
								</Link>
							</InfoTooltip>
							<InfoTooltip title="Utilisateurs" description="Accéder à la gestion des utilisateurs inscrits.">
								<Link
									href="/espace-personnel/administrateur/utilisateurs"
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-univers hover:text-univers transition-colors"
								>
									<PlusIcon className="h-4 w-4" />
									Utilisateur
								</Link>
							</InfoTooltip>
							<InfoTooltip title="Checklists" description="Accéder aux checklists de suivi en cours.">
								<Link
									href="/espace-personnel/administrateur/checklists"
									className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-univers hover:text-univers transition-colors"
								>
									<PlusIcon className="h-4 w-4" />
									Checklist
								</Link>
							</InfoTooltip>
						</div>
					</div>

					{/* Panels: Contrats récents + Derniers inscrits */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
						{/* Contrats récents */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-bold text-gray-900">Contrats récents</h3>
								<InfoTooltip title="Gestion des contrats" description="Voir, créer et envoyer tous les contrats depuis la page dédiée.">
									<Link href="/espace-personnel/administrateur/contrats" className="text-sm text-univers hover:underline font-semibold">
										Voir tous
									</Link>
								</InfoTooltip>
							</div>
							{stats.recentContracts.length > 0 ? (
								<ul className="space-y-3">
									{stats.recentContracts.map((c) => (
										<li key={c._id}>
											<Link
												href="/espace-personnel/administrateur/contrats"
												className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
											>
												<div className="min-w-0">
													<div className="flex items-center gap-2">
														<DocumentTextIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
														<span className="text-sm font-medium text-gray-900 truncate">{c.title}</span>
													</div>
													<p className="text-xs text-gray-500 ml-6">{c.recipientName}</p>
												</div>
												<div className="flex items-center gap-2 flex-shrink-0">
													<span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold", contractStatusColors[c.status])}>
														{contractStatusLabels[c.status] || c.status}
													</span>
													<span className="text-xs text-gray-400">
														{new Date(c.createdAt).toLocaleDateString("fr-FR")}
													</span>
												</div>
											</Link>
										</li>
									))}
								</ul>
							) : (
								<p className="text-sm text-gray-500">Aucun contrat pour le moment.</p>
							)}
						</div>

						{/* Derniers inscrits */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-bold text-gray-900">Derniers inscrits</h3>
								<InfoTooltip title="Gestion des utilisateurs" description="Voir et modifier tous les comptes utilisateurs depuis la page dédiée.">
									<Link href="/espace-personnel/administrateur/utilisateurs" className="text-sm text-univers hover:underline font-semibold">
										Voir tous
									</Link>
								</InfoTooltip>
							</div>
							{stats.recentUsers.length > 0 ? (
								<ul className="space-y-3">
									{stats.recentUsers.map((u) => (
										<li key={u._id}>
											<Link
												href="/espace-personnel/administrateur/utilisateurs"
												className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
											>
												<div className="flex items-center gap-2">
													<UsersIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
													<span className="text-sm font-medium text-gray-900">
														{u.firstName} {u.lastName}
													</span>
												</div>
												<div className="flex items-center gap-2 flex-shrink-0">
													<span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold", roleColors[u.role])}>
														{roleLabels[u.role] || u.role}
													</span>
													<span className="text-xs text-gray-400">
														{new Date(u.createdAt).toLocaleDateString("fr-FR")}
													</span>
												</div>
											</Link>
										</li>
									))}
								</ul>
							) : (
								<p className="text-sm text-gray-500">Aucun utilisateur pour le moment.</p>
							)}
						</div>
					</div>

				</>
			)}
		</div>
	);
}
