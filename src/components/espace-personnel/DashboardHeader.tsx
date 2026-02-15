"use client";

import { useAuth } from "@/context/AuthContext";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function DashboardHeader() {
	const { user, logout } = useAuth();

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
			<div className="md:ml-0 ml-12">
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
