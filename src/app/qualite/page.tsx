import React from "react";
import TitlePage from "@/components/global/TitlePage";
import Footer from "@/components/global/Footer";
import type { Metadata } from "next";
import { buildMetadata } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "Qualité - IPSEIS certifié Qualiopi",
	description:
		"IPSEIS est certifié Qualiopi depuis le 18/11/2024 dans la catégorie Action de Formation. Découvrez notre engagement qualité.",
	path: "/qualite",
});

export default function Qualite() {
	return (
		<div className="bg-support min-h-full">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
				<TitlePage title="Qualité" centered={true} paddingHorizontal={false} paddingBottom={false} />

				<div className="mt-10 flex flex-col items-center gap-8">
					<div className="max-w-3xl space-y-6 text-base sm:text-xl text-univers text-center">
						<p>
							IPSEIS est certifié Qualiopi depuis le 18/11/2024 dans la catégorie Action de Formation.
						</p>
						<p>
							Cette certification est un gage de qualité du processus de déroulement de nos actions de
							formation et est aussi une reconnaissance de l&apos;implication au quotidien de toute
							l&apos;équipe IPSEIS.
						</p>
					</div>

					<div className="mt-6 w-full max-w-4xl">
						<iframe
							src="/pdf/certificat_qualiopi_ipseis.pdf"
							title="Certificat Qualiopi IPSEIS"
							className="w-full h-[600px] sm:h-[800px] rounded-lg border border-univers/20"
						/>
					</div>

					<a
						href="/pdf/certificat_qualiopi_ipseis.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block rounded-md bg-maitrise px-5 py-2 text-base sm:text-lg text-support font-normal shadow-sm hover:bg-maitrise/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise"
					>
						Ouvrir le certificat Qualiopi (PDF)
					</a>
				</div>
			</div>
			<Footer />
		</div>
	);
}
