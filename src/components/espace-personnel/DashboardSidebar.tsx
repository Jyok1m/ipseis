"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRightStartOnRectangleIcon, ArrowTopRightOnSquareIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface NavItem {
	name: string;
	href: string;
	icon?: React.ReactNode;
}

interface DashboardSidebarProps {
	navItems: NavItem[];
}

export default function DashboardSidebar({ navItems }: DashboardSidebarProps) {
	const pathname = usePathname();
	const { logout } = useAuth();
	const [mobileOpen, setMobileOpen] = useState(false);

	const sidebarContent = (
		<>
			<div className="p-6">
				<Link href="/espace-personnel">
					<Image src={require("/src/_images/logo/logo_beige.svg")} alt="Logo IPSEIS" height={50} />
				</Link>
			</div>

			<nav className="flex-1 px-4 space-y-1">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							onClick={() => setMobileOpen(false)}
							className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
								isActive ? "bg-maitrise text-white" : "text-support/80 hover:bg-white/10 hover:text-support"
							}`}
						>
							{item.icon}
							{item.name}
						</Link>
					);
				})}
			</nav>

			<div className="p-4 border-t border-white/20 space-y-1">
				<Link
					href="/"
					onClick={() => setMobileOpen(false)}
					className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-support/80 hover:bg-white/10 hover:text-support text-base font-medium transition-colors"
				>
					<ArrowTopRightOnSquareIcon className="h-5 w-5" />
					Voir le site
				</Link>
				<button
					onClick={logout}
					className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-support/80 hover:bg-white/10 hover:text-support text-base font-medium transition-colors"
				>
					<ArrowRightStartOnRectangleIcon className="h-5 w-5" />
					Déconnexion
				</button>
			</div>
		</>
	);

	return (
		<>
			{/* Mobile toggle */}
			<button
				onClick={() => setMobileOpen(true)}
				className="fixed top-4 left-4 z-50 md:hidden bg-univers text-support p-2 rounded-lg shadow-lg"
			>
				<Bars3Icon className="h-6 w-6" />
			</button>

			{/* Mobile overlay */}
			{mobileOpen && (
				<div className="fixed inset-0 z-40 md:hidden">
					<div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
					<div className="fixed inset-y-0 left-0 w-72 bg-univers flex flex-col z-50">
						<button
							onClick={() => setMobileOpen(false)}
							className="absolute top-4 right-4 text-support/80 hover:text-support"
						>
							<XMarkIcon className="h-6 w-6" />
						</button>
						{sidebarContent}
					</div>
				</div>
			)}

			{/* Desktop sidebar */}
			<aside className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-univers">
				{sidebarContent}
			</aside>
		</>
	);
}
