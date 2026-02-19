"use client";

import ProtectedRoute from "@/components/espace-personnel/ProtectedRoute";
import DashboardLayout from "@/components/espace-personnel/DashboardLayout";
import { HomeIcon, AcademicCapIcon, DocumentTextIcon, UserCircleIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const apprenantNavItems = [
	{ name: "Tableau de bord", href: "/espace-personnel/apprenant", icon: <HomeIcon className="h-5 w-5" /> },
	{ name: "Mes formations", href: "/espace-personnel/apprenant/formations", icon: <AcademicCapIcon className="h-5 w-5" /> },
	{ name: "Mes contrats", href: "/espace-personnel/apprenant/contrats", icon: <DocumentTextIcon className="h-5 w-5" /> },
	{ name: "Mes messages", href: "/espace-personnel/apprenant/messages", icon: <ChatBubbleLeftRightIcon className="h-5 w-5" /> },
	{ name: "Mon compte", href: "/espace-personnel/apprenant/mon-compte", icon: <UserCircleIcon className="h-5 w-5" /> },
];

export default function ApprenantLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute allowedRoles={["apprenant"]}>
			<DashboardLayout navItems={apprenantNavItems}>{children}</DashboardLayout>
		</ProtectedRoute>
	);
}
