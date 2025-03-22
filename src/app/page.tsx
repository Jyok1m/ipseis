"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import SectionTitle from "@/components/global/SectionTitle";
import ContactForm from "@/components/home/ContactForm";

export default function Accueil() {
	return (
		<div className="w-screen">
			{/* Hero section */}
			<div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center bg-univers">
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
									<span className="flex items-center gap-x-2 text-support">Parcourir nos formations</span>
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
			<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 mt-24 text-univers">
				<SectionTitle
					tag="Des formations reconnues"
					title="Certifié Qualiopi"
					description="Notre organisme de formation est aggréé Qualiopi, prouvant notre engagement dans la qualité et la pertinence de notre enseignement."
				/>

				{/* <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3"> */}
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

				{/* </div> */}

				<div className="mt-16 flex items-center justify-center gap-x-6">
					<Link href="/catalogue" className="text-base font-semibold leading-6 hover:underline hover:underline-offset-4">
						Voir nos formations <span aria-hidden="true">→</span>
					</Link>
				</div>
			</div>

			{/* Contact form */}
			<div className="rounded-3xl py-10 px-6 mt-12 flex flex-col items-center">
				<div className="mx-auto max-w-2xl text-center mb-16 text-univers">
					<h2 className="text-lg font-semibold leading-6 text-cohesion">100% personnalisé</h2>
					<h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-wider text-center">Parlons de vos besoins</h1>
					<p className="mt-6 text-base sm:text-lg leading-6">
						Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans le choix de votre formation.
					</p>
				</div>
				<ContactForm />
			</div>
		</div>
	);
}
