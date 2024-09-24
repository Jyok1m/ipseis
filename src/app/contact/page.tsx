"use client";

import React from "react";

import SectionTitle from "@/components/global/SectionTitle";
import ContactForm from "@/components/home/ContactForm";

export default function Contact() {
	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<SectionTitle
					tag="100% personnalisé"
					title="Parlons de vos besoins"
					description="Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
							mi viverra elit nunc."
				/>
				<ContactForm />
			</div>
		</div>
	);
}
