"use client";

import ProtectedRoute from "@/components/espace-personnel/ProtectedRoute";
import DashboardLayout from "@/components/espace-personnel/DashboardLayout";
import { HomeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

const professionnelNavItems = [
	{ name: "Tableau de bord", href: "/espace-personnel/professionnel", icon: <HomeIcon className="h-5 w-5" /> },
	{ name: "Mon activité", href: "/espace-personnel/professionnel", icon: <BriefcaseIcon className="h-5 w-5" /> },
];

export default function ProfessionnelLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute allowedRoles={["professionnel"]}>
			<DashboardLayout navItems={professionnelNavItems}>{children}</DashboardLayout>
		</ProtectedRoute>
	);
}
