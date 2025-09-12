import React from "react";
import TitlePage from "@/components/global/TitlePage";
import Divider from "@/components/global/Divider";
import Footer from "@/components/global/Footer";

import { PedagogyUSPSection } from "@/components/sections/PedagogyUSPSection";
import { PedagogyMethodologySection } from "@/components/sections/PedagogyMethodology";
import { PedagogyProcessSection } from "@/components/sections/PedagogyProcess";
import { ApproachSection } from "@/components/sections/Approach";
import { PedagogyFollowUpSection } from "@/components/sections/PedagogyFollowUp";
import { QualiopiSection } from "@/components/sections/Qualiopi";
import { PedagogyQualityOutcomeSection } from "@/components/sections/PedagogyQualityOutcomes";
import CatalogueCtaSection from "@/components/sections/CatalogueCtaSection";
import type { Metadata } from "next";
import { buildMetadata } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "Notre pédagogie - Apprentissage actif & immersif",
	description:
		"Une démarche pédagogique innovante combinant activité, coopération et expérimentation pour transformer durablement les pratiques professionnelles.",
	path: "/pedagogie",
});

export default function Pedagogie() {
	return (
		<div className="bg-support min-h-full">
			{/* Titre */}

			<TitlePage title="Notre pédagogie" descriptionNode={<span>Une démarche pédagogique pour former autrement et transformer durablement</span>} />

			{/* Section "Nos formations" */}

			<PedagogyUSPSection />

			{/* Section Méthode */}

			<Divider />
			<PedagogyMethodologySection />

			{/* Processus pédagogiques */}

			<Divider />
			<PedagogyProcessSection />

			{/* Notre approche */}

			<Divider />
			<ApproachSection />

			{/* Évaluation et suivi + Qualiopi */}

			<Divider />
			<PedagogyFollowUpSection />
			<QualiopiSection />

			<Divider />
			<PedagogyQualityOutcomeSection />

			{/* CTA Catalogue */}
			<Divider />
			<CatalogueCtaSection
				title="Découvrez nos formations innovantes"
				description="Explorez notre pédagogie active appliquée à travers plus de 30 formations conçues pour transformer durablement vos pratiques professionnelles."
			/>

			<Footer />
		</div>
	);
}
