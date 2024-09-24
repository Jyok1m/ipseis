"use client";

import React from "react";
import SectionTitle from "@/components/global/SectionTitle";
import FormationCard from "@/components/formations/FormationCard";

const formations = [
	{
		id: 1,
		title: "Accueil, communication",
		href: "/formations",
		description: `
		Ce programme de formation se concentre sur le soutien aux aidants en les aidant à repérer et à accompagner les personnes en besoin.
		Il aborde également l'accompagnement relationnel et l'importance de la communication dans les soins, en favorisant une approche humaine et empathique.`,
		keypoints: [
			"Aide aux aidants ; Repérer et accompagner",
			"Accompagnement et relation d’aide",
			"La communication relationnelle dans le soin",
			"Gestion du stress et des conflits à l’accueil",
		],
		uri: "/images/formations/1.jpg",
	},
	{
		id: 2,
		title: "Gérontologie, gériatrie, personnes âgées",
		href: "/formations",
		description: `
		Cette formation aborde des thèmes essentiels liés à l'accompagnement des personnes âgées en Ehpad.
		Elle met l'accent sur la bientraitance, les relations avec les familles, et la compréhension des maladies comme Alzheimer et les troubles apparentés.
		Les participants apprendront à mieux comprendre les troubles du comportement des personnes âgées désorientées, tout en explorant l'accompagnement en fin de vie, tant pour le résident que pour sa famille.
		La gestion du stress et des conflits lors de l'entrée en institution sera également discutée, ainsi que les bonnes pratiques pour faire vivre une unité protégée à travers diverses activités.
		`,
		keypoints: [
			"La Bientraitance",
			"Relation avec les familles des personnes âgées en Ehpad",
			"Maladie d’Alzheimer et troubles apparentés",
			"Mieux comprendre les troubles du comportement des personnes âgées désorientées",
			"Accompagnement fin de vie (du résident et de la famille)",
			"Gestion du stress et des conflits lors de l’entrée en Institution",
			"Faire vivre une unité protégée : Activités",
		],
		uri: "/images/formations/2.jpg",
	},
	{
		id: 3,
		title: "Personnes en situation de Handicap",
		href: "/formations",
		description: `
		Cette formation aborde plusieurs thématiques importantes. 
		Elle explore la vie intime et sexuelle des personnes en situation de handicap, un sujet essentiel pour comprendre les enjeux spécifiques auxquels ces personnes peuvent être confrontées dans leur épanouissement personnel. 
		La formation inclut également la gestion des situations de violence et d’agressivité, en offrant des stratégies pour identifier, prévenir et réagir de manière adaptée à ces situations délicates. 
		Enfin, elle propose des outils pour mieux gérer le stress et les conflits, permettant aux participants de développer des compétences en régulation émotionnelle et en communication efficace dans des environnements potentiellement tendus.
		`,
		keypoints: [
			"Vie intime et sexuelle, des personnes en situation de handicap",
			"Gestion des situations de violence et d’agressivité",
			"Gestion du stress et des conflits",
		],
		uri: "/images/formations/3.jpg",
	},
];

export default function Formations() {
	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<SectionTitle title="Catalogue de Formations" description="Accompagner et prendre soin" />
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{formations.map((formation, index: number) => (
						<FormationCard key={index} {...formation} />
					))}
				</div>
			</div>
		</div>
	);
}
