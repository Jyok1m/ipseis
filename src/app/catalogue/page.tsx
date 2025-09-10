import type { Metadata } from "next";
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
		<div className="bg-support py-8 min-h-screen">
			<CatalogueClient />
		</div>
	);
}
