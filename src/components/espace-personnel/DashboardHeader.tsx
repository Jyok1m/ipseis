"use client";

import { useAuth } from "@/context/AuthContext";
import { ArrowRightStartOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface DashboardHeaderProps {
	onMobileMenuOpen?: () => void;
}

export default function DashboardHeader({ onMobileMenuOpen }: DashboardHeaderProps) {
	const { user, logout } = useAuth();

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
			<div className="flex items-center gap-3">
				{onMobileMenuOpen && (
					<button
						onClick={onMobileMenuOpen}
						className="md:hidden bg-univers text-support p-2 rounded-lg"
					>
						<Bars3Icon className="h-5 w-5" />
					</button>
				)}
				<h2 className="text-base font-semibold text-gray-900">
					Bonjour, {user?.firstName}
				</h2>
			</div>
			<button
				onClick={logout}
				className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
			>
				<ArrowRightStartOnRectangleIcon className="h-5 w-5" />
				<span className="hidden sm:inline">Déconnexion</span>
			</button>
		</header>
	);
}
