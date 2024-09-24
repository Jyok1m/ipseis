import React from "react";

import ContactForm from "@/components/home/ContactForm";

export default function Contact() {
	return (
		<div className="rounded-3xl py-10 px-6 mt-12 flex flex-col items-center">
			<div className="mx-auto max-w-2xl text-center mb-16 text-univers">
				<h2 className="text-lg font-semibold leading-6 text-cohesion">100% personnalisé</h2>
				<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center">
					Parlons de vos <span className="text-cohesion">besoins</span>
				</h1>
				<p className="mt-6 text-xl leading-6">
					Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi
					viverra elit nunc.
				</p>
			</div>
			<ContactForm />
		</div>
	);
}
