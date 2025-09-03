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

const connaissanceList = [
	"Apports théoriques, scientifiques et réglementaires actualisé et ciblés",
	"Chaque session démarre par un socle de savoirs fondamentaux adaptés au niveau et aux besoins des apprenants",
];

const experimentationList = [
	"Études de cas collaboratives",
	"Les apprenants testent, analysent et retiennent. L’apprentissage passe par l’action dans un cadre sécurisé et motivant",
];

const interactionList = [
	"Questionnements réguliers, feedbacks en temps réel, adaptation des contenus",
	"Le formateur ajuste sa pédagogie en direct, l’apprenant devient acteur de son parcours",
];

const approachList = [
	"Simulations, SEGAPTM, jeux de rôles, scénarios pédagogiques, quizz",
	"L’apprentissage devient une expérience concrète et collective, favorisant l’ancrage et la transférabilité",
];

const formationKeyPoints = [
	<span>
		<span className="font-bold">Formations continues</span> pour développer les compétences essentielles dans les pratiques de soin, d’accompagnement
		et de management en santé
	</span>,
	<span>
		<span className="font-bold">Durées adaptatives</span>, de la demi-journée à 3 jours avec un format recommandé à 2+1 jours en présentiel,
		distanciel ou hybride. En intra (dans vos locaux) ou dans des lieux inspirants
	</span>,
	<span>
		Un <span className="font-bold">dispositif de formation souple</span> avec un planning ajusté à vos besoins, des groupes adaptés à votre réalité
		terrain et des supports accessibles avant et après la formation
	</span>,
	<span>
		Des <span className="font-bold">modules ciblés</span> sur des besoins fondamentaux en Gériatrie, Accueil, Communication, Relation d’aide, pour
		aider les soignants au quotidien dans leur pratique
	</span>,
	<span>
		<span className="font-bold">Accompagnements personnalisés et analyse de la pratique</span> : Individuels ou collectifs, sur mesure selon vos
		besoins, vos objectifs, vos contraintes de temps et de lieu.
	</span>,
	<span>
		<span className="font-bold">Création de scénarios pédagogiques spécifiques</span> pour amener les apprenants à acquérir, assimiler et appliquer
		les connaissances dans leur quotidien
	</span>,
	<span>
		<span className="font-bold">Ressources et outils</span> mis à disposition : Supports numériques, capsules vidéo, Bibliothèque thématique, fiches
		mémo, supports illustrés…
	</span>,
];

function FeatBox({
	title,
	description,
	bgColor,
	className,
	centered,
}: {
	title?: string;
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
			{title && <p className="mt-2 text-lg sm:text-xl font-bold tracking-tight items-center">{title}</p>}
			<span className={`mt-2 text-base sm:text-lg ${centered ? "text-center" : "text-left"}`}>{description}</span>
		</div>
	);
}

function FormatteurPoint({ point, isWhite }: { point: React.ReactNode; isWhite?: boolean }) {
	return (
		<div className={`relative pl-10 text-base sm:text-lg tracking-wider leading-6 ${isWhite ? "text-support" : "text-univers"}`}>
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

export default function Pedagogie() {
	return (
		<div className="bg-support min-h-full">
			{/* Titre */}

			<TitlePage title="Notre pédagogie" descriptionNode={<p>Une démarche pédagogique pour former autrement et transformer durablement</p>} />

			{/* Section "Nos formations" */}

			<TitleSection tag="Nos formations" title="Des formations variées et adaptatives pour plus d’efficacité" />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8">
				{formationKeyPoints.map((point, index) => (
					<FormatteurPoint key={index} point={point} />
				))}
			</div>

			{/* Section Méthode */}

			<Divider />
			<TitleSection tag="Notre méthode" title="Une méthode participative qui engage et transforme" />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8 tracking-wider">
				{/* 3x3 grid where five cards sit like a die face (1,1  -  1,3  -  2,2  -  3,1  -  3,3) */}
				<div className="mx-auto max-w-5xl">
					<div className="relative grid grid-cols-1 gap-4 md:gap-24 md:grid-cols-2 md:grid-rows-2 place-items-stretch">
						{/* top-left */}
						<div className="md:col-start-1 md:row-start-1">
							<FeatBox
								title="Connaissances clés"
								description={connaissanceList.map((data, index) => (
									<FormatteurPoint key={index} point={data} isWhite />
								))}
								bgColor="maitrise"
							/>
						</div>
						{/* top-right */}
						<div className="md:col-start-2 md:row-start-1">
							<FeatBox
								title="Expérimentation guidée"
								description={experimentationList.map((data, index) => (
									<FormatteurPoint key={index} point={data} isWhite />
								))}
								bgColor="maitrise"
							/>
						</div>
						{/* center */}
						<div className="md:col-start-1 md:row-start-1 justify-center items-center absolute z-10 hidden md:flex">
							<div className="relative z-20 md:-mt-20 md:-mb-20 md:-mx-20">
								<Image
									src={require("../../_images/logo/star_green.svg")}
									alt="Image de l'étoile d'Ipseis"
									width={48}
									height={48}
									className="w-96 h-96"
								/>
							</div>
						</div>
						{/* bottom-left */}
						<div className="md:col-start-1 md:row-start-2">
							<FeatBox
								title="Interaction continue"
								description={interactionList.map((data, index) => (
									<FormatteurPoint key={index} point={data} isWhite />
								))}
								bgColor="maitrise"
							/>
						</div>
						{/* bottom-right */}
						<div className="md:col-start-2 md:row-start-2">
							<FeatBox
								title="Approche collaborative et immersive"
								description={approachList.map((data, index) => (
									<FormatteurPoint key={index} point={data} isWhite />
								))}
								bgColor="maitrise"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Objectifs pédagogiques */}

			<Divider />
			<TitleSection tag="Une formation adaptée et optimisée" title="Un processus efficace, fluide, collaboratif et de proximité" />
			<div className="pb-10 mx-auto max-w-7xl px-6 lg:px-8 tracking-wider sm:mt-24">
				<div className="mx-auto max-w-5xl">
					<div className="relative grid grid-cols-1 gap-4 sm:gap-2 sm:[grid-template-columns:0.9fr_1fr_0.9fr] sm:[grid-template-rows:0.9fr_1fr_0.9fr] place-items-stretch">
						<div className="sm:col-start-2 sm:row-start-1 sm:-translate-y-24">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/1.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Analyse efficace de vos besoins & du contexte</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-3 sm:row-start-1 sm:translate-y-14">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/2.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Proposition détaillée avec objectifs pédagogiques validés</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-3 sm:row-start-2 sm:-translate-x-2 sm:translate-y-14">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/3.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Questionnaire de pré-formation envoyé aux apprenants</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-3 sm:row-start-3 sm:-translate-x-24 md:-translate-x-32 lg:-translate-x-36 sm:translate-y-14">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/4.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Envoi d'une fiche pédagogique + informations pratiques</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-1 sm:row-start-3 sm:translate-x-24 md:translate-x-32 lg:translate-x-36 sm:translate-y-14">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/5.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Formation active et immersive</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-1 sm:row-start-2 sm:translate-x-2 sm:translate-y-14">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/6.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Questionnaire post-formation</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-1 sm:row-start-1 sm:translate-y-14">
							<FeatBox
								description={
									<div className="relative pl-10">
										<span className="absolute left-0 -top-[12px]">
											<Image
												src="/images/objectifs_peda/7.png"
												alt="Check"
												width={40}
												height={40}
												className="w-11 h-11 flex-shrink-0 object-contain align-top"
											/>
										</span>
										<p>Débrief entre IPSEIS et la structure</p>
									</div>
								}
								bgColor="support"
								centered
							/>
						</div>

						<div className="sm:col-start-2 sm:row-start-2 justify-center items-center relative z-10 hidden sm:flex">
							<div className="absolute z-20 sm:-mt-8 sm:-mb-8 sm:-mx-6">
								<Image
									src={require("../../_images/logo/star_orange.svg")}
									alt="Image de l'étoile d'Ipseis"
									width={48}
									height={48}
									className="w-96 h-96"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <Divider /> */}
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			<Divider />
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
