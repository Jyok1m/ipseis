import React from "react";
import Image from "next/image";
import TitlePage from "@/components/global/TitlePage";
import TitleSection from "@/components/global/TitleSection";
import Divider from "@/components/global/Divider";
import Button from "@/components/global/Button";

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
				<dl className="mx-auto grid grid-cols-1 gap-8 text-base sm:text-xl text-univers sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
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
					<div className="pb-10 flex flex-col gap-y-10 justify-center items-center mx-auto max-w-7xl px-6 lg:px-8 tracking-wider w-[320px]">
						<Image title={"Logo Qualiopi"} alt={"Logo Qualiopi"} src={"/images/qualiopi_logo_bg_removed.png"} width={320} height={140} />

						<Button href="/catalogue">
							<span className="flex items-center gap-x-2 font-semibold text-center">
								<span className="hover:underline hover:underline-offset-8">Nos formations santé</span>
								<span className="mt-1">→</span>
							</span>
						</Button>
					</div>
				</div>
			</div>

			{/* Section Missions */}
			<Divider />
			<TitleSection tag="Nos missions" title="Agir, transmettre, transformer, engager vos équipes" />
		</div>
	);
}
