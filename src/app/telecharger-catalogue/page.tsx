import React from "react";
import Footer from "@/components/global/Footer";
import TitlePage from "@/components/global/TitlePage";
import CatalogueDownloadForm from "./CatalogueDownloadForm";
import type { Metadata } from "next";
import { buildMetadata } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "Télécharger le catalogue IPSEIS - Formations Santé 2025",
	description:
		"Téléchargez gratuitement notre catalogue de formations 2025 dans le secteur de la santé et du médico-social. Formations certifiantes et qualifiantes.",
	path: "/telecharger-catalogue",
});

export default function TelechargerCatalogue() {
	return (
		<div className="bg-support min-h-full flex flex-col items-center justify-between">
			<TitlePage
				title="Télécharger notre catalogue"
				descriptionNode={
					<>
						Découvrez l'ensemble de nos formations 2025 dans le secteur de la santé et du médico-social.
						<br />
						Renseignez vos informations ci-dessous pour recevoir gratuitement notre catalogue complet par email.
					</>
				}
			/>
			<CatalogueDownloadForm />
			<Footer />
		</div>
	);
}
