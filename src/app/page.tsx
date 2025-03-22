"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SectionTitle from "@/components/global/SectionTitle";
import FeaturedCompanyLogo from "@/components/utils/FeaturedCompanyLogo";
import ContactForm from "@/components/home/ContactForm";

const featuredLogos = [
	{
		name: "Transistor",
		alt: "Transistor",
		image: "https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg",
	},
];

const posts = [
	{
		id: 1,
		title: "Accueil, communication",
		href: "/formations",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		imageUrl: "/images/formations/1.jpg",
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		author: {
			name: "Michael Foster",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
];

export default function Accueil() {
	const router = useRouter();
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
									className="rounded-md bg-maitrise px-3 py-2 sm:py-3 text-md md:text-lg text-support font-normal shadow-sm hover:bg-maitrise/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise"
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
						className="absolute z-10 opacity-20 lg:opacity-80 -top-0 lg:-top-10 -right-20 md:right-10 aspect-square"
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

				<div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					<Image
						title={"Logo Qualiopi"}
						alt={"Logo Qualiopi"}
						src={"/images/Qualiopi_logo.png"}
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
					/>
				</div>

				<div className="mt-16 flex items-center justify-center gap-x-6">
					<Link href="/catalogue" className="text-md font-semibold leading-6 hover:underline hover:underline-offset-4">
						Voir nos formations <span aria-hidden="true">→</span>
					</Link>
				</div>
			</div>

			{/* Contact form */}
			<div className="rounded-3xl py-10 px-6 mt-12 flex flex-col items-center">
				<div className="mx-auto max-w-2xl text-center mb-16 text-univers">
					<h2 className="text-lg font-semibold leading-6 text-cohesion">100% personnalisé</h2>
					<h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-wider text-center">Parlons de vos besoins</h1>
					<p className="mt-6 text-md sm:text-lg leading-6">
						Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans le choix de votre formation.
					</p>
				</div>
				<ContactForm />
			</div>
		</div>
	);
}
