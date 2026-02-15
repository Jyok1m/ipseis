"use client";

import { useAuth } from "@/context/AuthContext";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function ProfessionnelDashboard() {
	const { user } = useAuth();

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Espace Professionnel</h1>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
				<div className="flex items-start gap-4">
					<BriefcaseIcon className="h-10 w-10 text-gray-400 flex-shrink-0" />
					<div>
						<h2 className="text-xl font-bold text-gray-900 mb-2">
							Bienvenue, {user?.firstName} {user?.lastName}
						</h2>
						<p className="text-gray-500">
							Votre espace professionnel est en cours de construction. Vous retrouverez bientôt ici vos outils de travail et vos ressources.
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 className="font-bold text-gray-900 mb-2">Mes informations</h3>
					<ul className="space-y-2 text-sm text-gray-500">
						<li><span className="font-medium text-gray-700">Email :</span> {user?.email}</li>
						<li><span className="font-medium text-gray-700">Entreprise :</span> {user?.company}</li>
						<li><span className="font-medium text-gray-700">Poste :</span> {user?.position}</li>
						<li><span className="font-medium text-gray-700">Téléphone :</span> {user?.phone}</li>
					</ul>
				</div>
				<div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
					<h3 className="font-bold text-gray-900 mb-2">Prochainement</h3>
					<p className="text-sm text-gray-500">
						Accès à vos missions, plannings, documents et outils de suivi professionnel.
					</p>
				</div>
			</div>
		</div>
	);
}
