"use client";

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

export default function Pedagogie() {
	return (
		<div className="bg-support min-h-full">
			{/* Titre */}

			<TitlePage title="Notre pédagogie" descriptionNode={<p>Une démarche pédagogique pour former autrement et transformer durablement</p>} />

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

			<Footer />
		</div>
	);
}
