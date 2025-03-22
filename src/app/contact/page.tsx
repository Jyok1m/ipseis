import React from "react";

import { PageWrapper } from "@/components/global/Wrappers";
import SectionTitle from "@/components/global/SectionTitle";
import ContactForm from "@/components/home/ContactForm";

export default function Contact() {
	return (
		<PageWrapper>
			<SectionTitle
				tag="Parlons de vos besoins"
				title="Formulaire de contact"
				description="Si vous souhaitez en savoir plus sur nos formations, nos tarifs ou nos disponibilités, n'hésitez pas à nous contacter via le formulaire ci-dessous."
			/>
			<ContactForm />
		</PageWrapper>
	);
}
