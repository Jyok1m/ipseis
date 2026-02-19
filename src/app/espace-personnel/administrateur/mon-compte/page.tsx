"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import ProfileEditSection from "@/components/espace-personnel/ProfileEditSection";

export default function MonComptePage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
				<UserCircleIcon className="h-7 w-7 text-gray-400" />
				Mon compte
			</h1>
			<p className="text-gray-500 mb-8">Modifiez vos informations personnelles et votre mot de passe.</p>
			<ProfileEditSection />
		</div>
	);
}
