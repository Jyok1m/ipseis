"use client";

import React from "react";
import Image from "next/image";
import TitlePage from "@/components/global/TitlePage";
import TitleSection from "@/components/global/TitleSection";
import Divider from "@/components/global/Divider";
import Button from "@/components/global/Button";
import Footer from "@/components/global/Footer";

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
			<span className="absolute left-0 -top-2">
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
		<div className="bg-support h-full">
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

			{/* Section approche */}

			<Divider />
			<TitleSection
				tag="Notre approche"
				title="Choisir Ipseis c’est apprendre autrement pour progresser durablement"
				description="Participer à nos formations vous permettra d’acquérir, d’assimiler et de mettre en œuvre plus facilement les compétences clés pour exercer votre métier de soignant de manière plus efficace et plus sereine."
			/>
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8 tracking-wider">
				<dl className="mx-auto grid grid-cols-1 gap-8 text-base sm:text-lg text-univers sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
					{features.map((feature) => (
						<div key={feature.name} className="relative">
							<dt className="flex items-center gap-x-2 font-medium">
								<Image src={feature.src} alt={`Image de ${feature.name}`} width={50} height={50} sizes="(max-width: 640px) 50px, 50px" />
								{feature.name}
							</dt>
						</div>
					))}
				</dl>
			</div>

			{/* Section Qualiopi */}

			<div className="flex justify-center px-10">
				<div className="max-w-7xl tracking-wider border-cohesion border-2 rounded-md mb-10">
					<TitleSection
						centered
						title="Certifié Qualiopi"
						description="Notre organisme de formation est aggréé Qualiopi, gage de notre engagement envers la qualité et la pertinence de nos enseignements."
					/>
					<div className="pb-10 flex flex-col gap-y-10 justify-center items-center mx-auto max-w-7xl px-8 lg:px-60 tracking-wider">
						<div className="w-full max-w-[320px]">
							<Image
								title="Logo Qualiopi"
								alt="Logo Qualiopi"
								src="/images/qualiopi_logo_bg_removed.png"
								width={320}
								height={140}
								sizes="(max-width: 640px) 240px, 320px"
								className="w-full h-auto object-contain"
							/>
						</div>

						<Button href="/catalogue">
							<span className="flex items-center gap-x-2 font-semibold text-center">
								<span className="hover:underline hover:underline-offset-8">Nos formations santé</span>
								<span className="mt-1">→</span>
							</span>
						</Button>
					</div>
				</div>
			</div>

			{/* Section Mission */}

			<Divider />
			<TitleSection tag="Nos missions" title="Agir, transmettre, transformer, engager vos équipes" />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8 tracking-wider">
				{/* 3x3 grid where five cards sit like a die face (1,1  -  1,3  -  2,2  -  3,1  -  3,3) */}
				<div className="mx-auto max-w-5xl">
					<div className="relative grid grid-cols-1 gap-4 sm:gap-0 sm:grid-cols-3 sm:grid-rows-3">
						{/* top-left */}
						<div className="sm:col-start-1 sm:row-start-1">
							<FeatBox
								title="Transmettre par l’expérimentation"
								description="Innover avec des espaces de co-apprentissage dynamiques, et des dispositifs comme les SEGAPTM « Serious escape games pédagogiques »."
								bgColor="support"
								centered
							/>
						</div>
						{/* top-right */}
						<div className="sm:col-start-3 sm:row-start-1">
							<FeatBox
								title="Renforcer les compétences"
								description="Proposer des parcours exigeants, immersifs et collectifs, qui renforcent autonomie, intelligence collective et transversalité."
								bgColor="support"
								centered
							/>
						</div>
						{/* center */}
						<div className="sm:col-start-2 sm:row-start-2 flex justify-center">
							<div className="relative z-20 sm:-mt-8 sm:-mb-8 sm:-mx-6">
								<FeatBox
									title="Former autrement"
									description="Concevoir et animer des formations actives, engageantes et sur-mesure, centrées sur le réel et pour une performance respectueuse."
									bgColor="maitrise"
									className="p-6 sm:h-[320px]"
									centered
								/>
							</div>
						</div>
						{/* bottom-left */}
						<div className="sm:col-start-1 sm:row-start-3">
							<FeatBox
								title="Transformer les pratiques"
								description="Accompagner les professionnels vers plus d’efficacité, de confiance et de bien-être au travail."
								bgColor="support"
								centered
							/>
						</div>
						{/* bottom-right */}
						<div className="sm:col-start-3 sm:row-start-3">
							<FeatBox
								title="Garantir l’excellence"
								description="S’appuyer sur une démarche qualité continue, certifiée et reconnue."
								bgColor="support"
								centered
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Section Vision et promesse */}

			<Divider />
			<TitleSection
				tag="Un organisme à votre écoute"
				title="Notre vision, offrir une expérience d’apprentissage unique"
				description="Chez IPSEIS, nous croyons que l’apprentissage des professionnels de santé passe par une alliance subtile entre théorie et pratique, transmission et expérimentation.
				Nous concevons et proposons des expériences pédagogiques sur-mesure. Interactives et inédites, elles sont ancrées dans le réel, pour faire évoluer les pratiques, les comportements de vos équipes pour atteindre vos objectifs."
			/>
			<TitleSection
				noPaddingTop
				title="Notre promesse, s’adapter à votre besoin"
				description="Chaque professionnel, chaque équipe, chaque établissement est unique. 
				IPSEIS s’engage à créer un cadre d’apprentissage adapté à votre réalité, pour un développement optimal des compétences, une assimilation naturelle et une application immédiate et durable."
			/>

			{/* Section Valeurs */}

			<Divider />
			<TitleSection tag="Nos valeurs" title="Des valeurs et des formateurs qui nous ressemblent et vous rassemblent" />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8 tracking-wider">
				<div className="mx-auto max-w-5xl">
					{/* Grille 3x3 — cartes rapprochées de l’étoile */}
					<div className="relative grid grid-cols-1 gap-4 sm:gap-2 sm:[grid-template-columns:0.9fr_1fr_0.9fr] sm:[grid-template-rows:0.9fr_1fr_0.9fr] place-items-stretch">
						{/* (1,2) — haut centre */}
						<div className="sm:col-start-2 sm:row-start-1">
							<FeatBox title="Créativité & Innovation" description="Oser penser différemment pour former autrement" bgColor="maitrise" centered />
						</div>

						{/* (2,1) — milieu gauche */}
						<div className="sm:col-start-1 sm:row-start-2 sm:translate-x-2">
							<FeatBox
								title="Transmission & Partage"
								description="Faire circuler les savoirs pour faire grandir les équipes"
								bgColor="maitrise"
								centered
							/>
						</div>

						{/* (2,2) — centre : étoile */}
						<div className="sm:col-start-2 sm:row-start-2 justify-center items-center relative z-10 hidden sm:flex">
							<div className="relative z-20 sm:-mt-8 sm:-mb-8 sm:-mx-6">
								<Image
									src={require("../../_images/logo/star_green.svg")}
									alt="Image de l'étoile d'Ipseis"
									width={48}
									height={48}
									className="w-60 h-60"
								/>
							</div>
						</div>

						{/* (2,3) — milieu droite */}
						<div className="sm:col-start-3 sm:row-start-2 sm:-translate-x-2">
							<FeatBox
								title="Transformer les pratiques"
								description="Accompagner les professionnels vers plus d’efficacité, de confiance et de bien-être au travail"
								bgColor="maitrise"
								centered
							/>
						</div>

						{/* (3,1) — bas gauche */}
						<div className="sm:col-start-1 sm:row-start-3 sm:translate-x-24 md:translate-x-32 lg:translate-x-36">
							<FeatBox
								title="Professionnalisme & Qualité"
								description="Délivrer le meilleur en engageant, avec exigence et rigueur"
								bgColor="maitrise"
								centered
							/>
						</div>

						{/* (3,3) — bas droite */}
						<div className="sm:col-start-3 sm:row-start-3 sm:-translate-x-24 md:-translate-x-32 lg:-translate-x-36">
							<FeatBox title="Respect & Intégrité" description="Faire de la confiance une évidence" bgColor="maitrise" centered />
						</div>
					</div>
				</div>
			</div>

			{/* Section Valeurs */}

			<Divider />
			<TitleSection tag="Notre expertise" title="Des formateurs sélectionnés pour leurs valeurs et expertise" />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8">
				{formatteurPoints.map((point, index) => (
					<FormatteurPoint key={index} point={point} />
				))}
			</div>

			{/* Section Expertise */}

			<TitleSection title="Apporter notre expertise au personnel des structures en santé" noPaddingTop />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8 tracking-wider">
				<div className="mx-auto max-w-5xl">
					<div className="mx-auto grid grid-cols-1 gap-8 text-base sm:text-xl text-univers sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
						<div className="sm:col-start-1 sm:row-start-1">
							<FeatBox
								title="Structures"
								description={structures.map((structure, index) => (
									<FormatteurPoint key={index} point={structure} />
								))}
								bgColor="support"
							/>
						</div>
						<div className="sm:col-start-2 sm:row-start-1">
							<FeatBox
								title="Collaborateurs"
								description={collaborateurs.map((collaborateur, index) => (
									<FormatteurPoint key={index} point={collaborateur} />
								))}
								bgColor="support"
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
