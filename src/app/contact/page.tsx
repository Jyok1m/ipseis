import React from "react";
import Footer from "@/components/global/Footer";
import TitlePage from "@/components/global/TitlePage";
import ContactForm from "@/components/home/ContactForm";
import type { Metadata } from "next";
import { buildMetadata } from "@/components/utils/seo";

export const metadata: Metadata = buildMetadata({
	title: "Contact IPSEIS - Demande d'information & devis",
	description: "Contactez IPSEIS pour toute question sur nos formations santé et médico-social : informations, devis, accompagnement personnalisé.",
	path: "/contact",
});

export default function Contact() {
	return (
		<div className="bg-support min-h-full flex flex-col items-center justify-between">
			<TitlePage
				title="Formulaire de contact"
				descriptionNode={
					<>
						Si vous souhaitez en savoir plus sur nos formations, nos tarifs ou nos disponibilités, n'hésitez pas à nous contacter via le formulaire
						ci-dessous.
					</>
				}
			/>
			<ContactForm />

			<Footer />
		</div>
	);
}
