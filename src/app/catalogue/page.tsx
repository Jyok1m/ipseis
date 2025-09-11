import type { Metadata } from "next";
import TitlePage from "@/components/global/TitlePage";
import Footer from "@/components/global/Footer";
import { buildMetadata } from "@/components/utils/seo";
import CatalogueClient from "./CatalogueClient";

export const metadata: Metadata = buildMetadata({
	title: "Catalogue de formations - Thématiques professionnelles",
	description:
		"Explorez le catalogue IPSEIS : formations innovantes, actives et sur mesure pour les équipes des établissements sanitaires, sociaux et médico-sociaux.",
	path: "/catalogue",
});

export default function CataloguePage() {
	return (
		<div className="bg-support min-h-screen">
			<TitlePage
				title="Catalogue de formations"
				descriptionNode={
					<>
						Découvrez nos secteurs d'activité et explorez les différentes thématiques que nous proposons pour répondre à vos besoins professionnels.
					</>
				}
			/>
			<CatalogueClient />
			<Footer />
		</div>
	);
}
