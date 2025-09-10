import React from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import type { Metadata } from "next";
import { buildMetadata } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "Accueil - Organisme de formation innovant santé & médico-social",
	description:
		"IPSEIS conçoit des formations actives, immersives et sur mesure pour les professionnels de la santé, du social et médico-social. Découvrez notre approche pédagogique unique.",
	path: "/",
});

export default function Accueil() {
	return (
		<div className="w-screen h-full relative overflow-hidden flex flex-col items-center justify-center bg-univers -mt-14 sm:-mt-16">
			<div className="flex flex-col items-center justify-center gap-y-2 sm:gap-y-5 m-10 sm:w-5/6 lg:w-3/5">
				{/* Gros titre */}

				<div className="text-2xl sm:text-4xl font-bold tracking-widest text-cohesion leading-snug">
					<h1>Vous êtes unique, nos formations et accompagnements aussi.</h1>
					<Image src={require("../_images/tiret-home.png")} alt="tiret" height={50} width={75} className="my-5" />
				</div>

				{/* Description */}

				<div className="flex flex-col text-base sm:text-xl text-support gap-y-2 sm:gap-y-5">
					<p>
						Chez IPSEIS, nous croyons que l’apprentissage des professionnels passe par une alliance subtile entre théorie et pratique, transmission et
						expérimentation. Nous concevons des expériences pédagogiques sur-mesure, ancrées dans le réel, pour faire évoluer les pratiques
						quotidiennes et les comportements pour un meilleur fonctionnement d’équipe.
					</p>
					<p className="block md:hidden">Et si la formation devenait une expérience à vivre ?</p>
					<div className="w-full flex justify-start text-support mt-2 sm:mt-5">
						<Button href="/catalogue">
							<span className="md:block items-center text-center hidden">Et si la formation devenait une expérience à vivre ?</span>
							<span className="flex items-center gap-x-2 font-semibold text-center">
								<span className="hover:underline hover:underline-offset-8">Découvrir nos formations</span>
								<span className="mt-1">→</span>
							</span>
						</Button>
					</div>
				</div>
			</div>
			<Image
				src="/images/star_beige.svg"
				alt="Étoile Ipseis"
				width={500}
				height={500}
				className="absolute z-10 opacity-10 top-5 -right-28 sm:-top-5 md:w-[750px] md:-top-20 md:-right-44 lg:w-[1000px] lg:-top-36 lg:-right-60"
			/>
		</div>
	);
}
