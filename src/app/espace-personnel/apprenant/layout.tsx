"use client";

import ProtectedRoute from "@/components/espace-personnel/ProtectedRoute";
import DashboardLayout from "@/components/espace-personnel/DashboardLayout";
import { HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const apprenantNavItems = [
	{ name: "Tableau de bord", href: "/espace-personnel/apprenant", icon: <HomeIcon className="h-5 w-5" /> },
	{ name: "Mes formations", href: "/espace-personnel/apprenant", icon: <AcademicCapIcon className="h-5 w-5" /> },
];

export default function ApprenantLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute allowedRoles={["apprenant"]}>
			<DashboardLayout navItems={apprenantNavItems}>{children}</DashboardLayout>
		</ProtectedRoute>
	);
}
