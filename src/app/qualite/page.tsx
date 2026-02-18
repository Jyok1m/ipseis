import React from "react";
import Image from "next/image";
import TitlePage from "@/components/global/TitlePage";
import Footer from "@/components/global/Footer";
import JsonLd from "@/components/utils/JsonLd";
import type { Metadata } from "next";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "Qualité - IPSEIS certifié Qualiopi",
	description:
		"IPSEIS est certifié Qualiopi depuis le 18/11/2024 dans la catégorie Action de Formation. Découvrez notre engagement qualité.",
	path: "/qualite",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Qualité", path: "/qualite" }]);

export default function Qualite() {
	return (
		<div className="bg-support min-h-full overflow-x-hidden">
			<JsonLd data={breadcrumbJsonLd} />
			<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
				<TitlePage title="Qualité" centered={true} paddingHorizontal={false} paddingBottom={false} />

				<div className="mt-10 flex flex-col items-center gap-8">
					<div className="max-w-3xl space-y-6 text-base sm:text-lg text-univers text-center">
						<p>
							IPSEIS est certifié Qualiopi depuis le 18/11/2024 dans la catégorie Action de Formation.
						</p>
						<p>
							Cette certification est un gage de qualité du processus de déroulement de nos actions de
							formation et est aussi une reconnaissance de l&apos;implication au quotidien de toute
							l&apos;équipe IPSEIS.
						</p>
					</div>

					<div className="mt-6 w-full max-w-4xl relative select-none overflow-hidden">
						<Image
							src="/images/certificat_qualiopi.png"
							alt="Certificat Qualiopi IPSEIS"
							width={1772}
							height={1254}
							className="w-full h-auto rounded-lg border border-univers/20"
							draggable={false}
						/>
						<div className="absolute inset-0 rounded-lg" />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
