"use client";

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
	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardSidebar navItems={navItems} />
			<div className="md:ml-72 flex flex-col min-h-screen">
				<DashboardHeader />
				<main className="flex-1 p-6">{children}</main>
			</div>
		</div>
	);
}
