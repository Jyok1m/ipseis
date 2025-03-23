"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionWrapper } from "@/components/global/Wrappers";
import SectionTitle from "@/components/global/SectionTitle";
import ContactForm from "@/components/home/ContactForm";

export default function Accueil() {
	return (
		<div className="w-screen">
			{/* Hero section */}
			<div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center bg-univers mb-10">
				<div className="bg-univers flex justify-evenly py-10">
					<div className="lg:w-1/2">
						<div className="text-2xl sm:text-4xl font-bold tracking-widest text-support bg-univers p-10 pb-5">
							<h1 className="text-cohesion leading-snug mb-5">
								Vous êtes unique, <br />
								nos formations aussi.
							</h1>

							<Image src={require("../_images/tiret-home.png")} alt="tiret" height={50} width={75} />
						</div>
						<div className="p-10">
							<p className="text-base sm:text-xl text-support">
								Ipseis est un organisme de formation dédié aux professionnels de santé. Les formations que nous proposons s&apos;axent sur
								l&apos;accompagnement dans le secteur des soins pour les professionnels de santé et les particuliers.
							</p>
							<div className="mt-5 w-full flex justify-start">
								<Link
									href="/catalogue"
									className="rounded-md bg-maitrise px-3 py-2 sm:py-3 text-base md:text-lg text-support font-normal shadow-sm hover:bg-maitrise/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise"
								>
									<span className="flex items-center gap-x-2 text-support">Découvrir nos formations</span>
								</Link>
							</div>
						</div>
					</div>
					<Image
						src="/images/star_beige.svg"
						alt="Étoile Ipseis"
						width={500}
						height={500}
						className="absolute z-10 opacity-80 top-10 lg:-top-10 right-0 lg:right-10 aspect-square w-[175px] h-[175px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px]"
					/>
				</div>
			</div>

			{/* Logo cloud */}
			<SectionWrapper>
				<SectionTitle
					tag="Des formations reconnues"
					title="Certifié Qualiopi"
					description="Notre organisme de formation est aggréé Qualiopi, prouvant notre engagement dans la qualité et la pertinence de notre enseignement."
				/>
				<div className="w-full flex justify-center">
					<Image
						title={"Logo Qualiopi"}
						alt={"Logo Qualiopi"}
						src={"/images/qualiopi_logo_bg_removed.png"}
						width={300}
						height={120}
						className="justify-self-center"
					/>
				</div>

				<div className="mt-16 flex items-center justify-center gap-x-6">
					<Link href="/catalogue" className="text-base font-semibold leading-6 hover:underline hover:underline-offset-4">
						Voir nos formations <span aria-hidden="true">→</span>
					</Link>
				</div>
			</SectionWrapper>

			<div className="mx-auto max-w-[95%] border-t border-cohesion/30" />

			{/* Contact form */}
			<SectionWrapper>
				<SectionTitle
					tag="100% personnalisé"
					title="Parlons de vos besoins"
					description="Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans le choix de votre formation."
				/>
				<ContactForm />
			</SectionWrapper>
		</div>
	);
}
