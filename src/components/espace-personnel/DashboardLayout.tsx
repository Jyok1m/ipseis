"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface NavItem {
	name: string;
	href: string;
	icon?: React.ReactNode;
}

interface DashboardLayoutProps {
	children: React.ReactNode;
	navItems: NavItem[];
}

export default function DashboardLayout({ children, navItems }: DashboardLayoutProps) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardSidebar navItems={navItems} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
			<div className="md:ml-72 flex flex-col min-h-screen">
				<DashboardHeader onMobileMenuOpen={() => setMobileOpen(true)} />
				<main className="flex-1 p-4 sm:p-6">{children}</main>
			</div>
		</div>
	);
}
