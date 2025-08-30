import React from "react";
import Image from "next/image";
import TitlePage from "@/components/global/TitlePage";
import TitleSection from "@/components/global/TitleSection";
import Divider from "@/components/global/Divider";

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
		<div className="bg-support py-8 h-full">
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
		</div>
	);
}
