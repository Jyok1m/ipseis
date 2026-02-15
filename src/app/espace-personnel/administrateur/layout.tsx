"use client";

import ProtectedRoute from "@/components/espace-personnel/ProtectedRoute";
import DashboardLayout from "@/components/espace-personnel/DashboardLayout";
import { HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const adminNavItems = [
	{ name: "Tableau de bord", href: "/espace-personnel/administrateur", icon: <HomeIcon className="h-5 w-5" /> },
	{ name: "Formations", href: "/espace-personnel/administrateur/formations", icon: <AcademicCapIcon className="h-5 w-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute allowedRoles={["administrateur"]}>
			<DashboardLayout navItems={adminNavItems}>{children}</DashboardLayout>
		</ProtectedRoute>
	);
}
