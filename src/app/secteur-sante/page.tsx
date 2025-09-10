import React from "react";
import Image from "next/image";
import TitlePage from "@/components/global/TitlePage";
import { TitleSection } from "@/components/TitleSection";
import Divider from "@/components/global/Divider";
import Button from "@/components/global/Button";
import Footer from "@/components/global/Footer";

import { PedagogyUSPSection } from "@/components/sections/PedagogyUSPSection";
import { PedagogyMethodologySection } from "@/components/sections/PedagogyMethodology";
import { PedagogyProcessSection } from "@/components/sections/PedagogyProcess";
import { ApproachSection } from "@/components/sections/Approach";
import { PedagogyFollowUpSection } from "@/components/sections/PedagogyFollowUp";
import { QualiopiSection } from "@/components/sections/Qualiopi";
import { HealthMissionSection } from "@/components/sections/HealthMissions";
import { HealthVisionSection } from "@/components/sections/HealthVision";
import { HealthPromiseSection } from "@/components/sections/HealthPromise";
import { HealthValueSection } from "@/components/sections/HealthValues";
import { HealthTrainerSection } from "@/components/sections/HealthTrainers";
import { HealthPerimeterSection } from "@/components/sections/HealthPerimeter";
import { PedagogyQualityOutcomeSection } from "@/components/sections/PedagogyQualityOutcomes";
import type { Metadata } from "next";
import { buildMetadata } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "IPSEIS Santé - Formations pour établissements sanitaires & médico-sociaux",
	description:
		"Formations professionnelles actives, immersives et sur mesure destinées aux équipes des établissements sanitaires, sociaux et médico-sociaux.",
	path: "/secteur-sante",
});

const features = [
	{
		name: "Une pédagogie impactante, active et immersive",
		src: "/images/sante_features/1.png",
	},
	{
		name: "Une approche de proximité, humaine et coopérative",
		src: "/images/sante_features/2.png",
	},
	{
		name: "Des formations innovantes & sur mesure de qualité",
		src: "/images/sante_features/3.png",
	},
	{
		name: "Respect engagements  et réactivité",
		src: "/images/sante_features/4.png",
	},
	{
		name: "Des intervenants experts et engagés",
		src: "/images/sante_features/5.png",
	},
	{
		name: "Une qualité certifiée, exigeante et reconnue",
		src: "/images/Qualiopi_logo.png",
	},
];

const formatteurPoints = [
	"Des experts reconnus, engagés et évalués,",
	"5 ans d’expérience terrain minimum",
	"Évalués sur le contenu, la pédagogie et l’accompagnement à chaque session",
	"En veille continue sur leur domaine d’expertise, se formant régulièrement",
	"Utilisent des méthodes pédagogiques innovantes et interactives",
	"Conformes au Référentiel National Qualité (Qualiopi)",
	"Signent notre charte qualité de formateur",
];

const structures = [
	"Sanitaires : Hôpitaux, Cliniques, SSR, CCR, USLD, CMP, CATTP, EPSM, HDJ…",
	"Medico social : EHPAD EHPA SSIAD, Accueil de jour, Foyers de vie, ESAT, MAS SESSAD…",
	"Social : Service d’aide à la personne, familles d’accueil, Aidants…",
];

const collaborateurs = [
	"IDE, Psychologue, Ergothérapeute, Cadre de Santé…",
	"Agent de soin AS, ASG, ASH, AMP…",
	"Agent Administratif, Animatrice, Auxiliaire de vie…",
	"Nous adaptons nos formations afin d’accueillir les stagiaires en situation de handicap",
];

function FeatBox({
	title,
	description,
	bgColor,
	className,
	centered,
}: {
	title: string;
	description: React.ReactNode;
	bgColor: "support" | "maitrise";
	className?: string;
	centered?: boolean;
}) {
	return (
		<div
			className={`p-4 bg-${bgColor} rounded-3xl shadow-lg border-[1px] border-maitrise text-${
				bgColor === "support" ? "maitrise" : "support"
			} h-full text-center flex flex-col justify-center ${className || ""}`}
		>
			<p className="mt-2 text-lg sm:text-xl font-bold tracking-tight items-center">{title}</p>
			<span className={`mt-2 text-base sm:text-lg ${centered ? "text-center" : "text-left"}`}>{description}</span>
		</div>
	);
}

function FormatteurPoint({ point }: { point: string }) {
	return (
		<div className="relative pl-10 text-base sm:text-lg tracking-wider leading-6 text-univers">
			<span className="absolute left-0 -top-[6px]">
				{/* fixé en haut du paragraphe */}
				<Image
					src={require("../../_images/logo/star_orange.svg")}
					alt="Check"
					width={40}
					height={40}
					className="w-10 h-10 flex-shrink-0 object-contain align-top"
				/>
			</span>
			{point}
		</div>
	);
}

export default function SecteurSante() {
	return (
		<div className="bg-support min-h-full">
			{/* Titre */}

			<TitlePage
				title="Ipseis Santé"
				descriptionNode={
					<>
						<span className="font-bold text-cohesion">La raison d’être d’IPSEIS Santé</span> est de permettre aux soignants et professionnels de santé
						de renforcer leurs compétences dans un cadre innovant, collaboratif et respectueux, pour une pratique des soins plus efficace et plus
						humaine.
					</>
				}
			/>

			{/* Section approche + Qualiopi */}

			<ApproachSection />
			<QualiopiSection />

			{/* Section Mission */}

			<Divider />
			<HealthMissionSection />

			{/* Section Vision et promesse */}

			<Divider />
			<HealthVisionSection />
			<HealthPromiseSection />

			{/* Section Valeurs */}

			<Divider />
			<HealthValueSection />

			{/* Section Valeurs */}

			<Divider />
			<HealthTrainerSection />

			{/* Section Expertise */}
			<Divider />
			<HealthPerimeterSection />

			<Footer />
		</div>
	);
}
