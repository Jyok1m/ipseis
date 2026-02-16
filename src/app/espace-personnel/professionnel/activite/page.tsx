"use client";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
import MyResourcesList from "@/components/espace-personnel/MyResourcesList";

export default function ProfessionnelActivitePage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
				<BriefcaseIcon className="h-7 w-7 text-gray-400" />
				Mon activité & ressources
			</h1>
			<p className="text-gray-500 mb-8">Retrouvez ici les ressources liées à vos formations.</p>

			<MyResourcesList />
		</div>
	);
}
