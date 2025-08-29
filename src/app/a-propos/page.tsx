"use client";

import React from "react";
import Image from "next/image";

// import { type Metadata } from "next";

// export const metadata: Metadata = {
// 	title: "About",
// 	description: "I’m Spencer Sharp. I live in New York City, where I design the future.",
// };

export default function APropos() {
	return (
		<div className="bg-support py-8 h-full">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
				<div className="text-2xl sm:text-4xl font-bold tracking-wider text-univers">
					<h1 className="mt-2 font-bold tracking-wider uppercase">Bienvenue dans l’univers unique d’apprentissage d’IPSEIS</h1>
					<div className="border border-univers w-12 my-8"></div>
				</div>
				<div>
					<p className="space-y-7 text-xl text-zinc-600">
						<Image
							src="/images/about-image-hélène.jpg"
							alt="Photo d'Hélène de Montabert"
							sizes="(min-width: 1024px) 12rem, 8rem"
							width={200}
							height={200}
							className="rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 float-left mr-8 mb-4 max-w-xs"
						/>
						Madame, Monsieur, <br />
						<br />
						Face aux défis croissants du secteur sanitaire, social et médico-social (manque de ressources formées, turnover élevé, qualité des soins
						inégale dans certains établissements; manque de motivation d’une partie des employés, stress, fatigue….), il est essentiel de repenser la
						formation des professionnels et de leur apporter des outils appropriés pour réussir leurs missions. <br />
						<br />
						Depuis des années, j’observe un décalage entre les attentes des soignants, les formations proposées, leur efficacité et une motivation
						inégale des équipes à apprendre avec les approches de formations qui leurs sont proposées. <br />
						<br />
						C’est pour répondre à ces enjeux que j’ai créés IPSEIS, un organisme de formation aux méthodes innovantes et spécialisé pour les
						établissements sanitaires, sociaux et médico-sociaux. <br />
						<br />
						Parce que vous êtes uniques, nous proposons des formations sur mesure, basées sur une pédagogie active et immersive. Notre approche
						expériencielle repose sur l’activité, la coopération, la participation et l’anticipation, avec des outils innovants tels que les SEGAPTM,
						des « Sérieux Escape Games Apprenants & Pédagogiques » adaptés à votre contexte. <br />
						<br />
						Notre ambition : offrir des formations qui font la différence sur le terrain, en favorisant l’engagement et la montée en compétences des
						soignants. <br />
						<br />
						Je suis à votre écoute pour construire, ensemble, des solutions adaptées à vos besoins. <br />
						<br />
						N’hésitez pas à me contacter ! <br />
						<br />
						Hélène de Montabert
					</p>
				</div>
			</div>
		</div>
	);
}
