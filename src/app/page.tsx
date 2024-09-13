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
	{
		name: "Reform",
		alt: "Reform",
		image: "https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg",
	},
	{
		name: "Tuple",
		alt: "Tuple",
		image: "https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg",
	},
];

export default function Accueil() {
	const router = useRouter();
	return (
		<div>
			{/* <Image
				src={require("/src/_images/logo/star_beige.svg")}
				alt="Logo Ipseis"
				title="Logo Ipseis"
				height={1000}
				className="fixed -top-20 -right-60 opacity-10 sm:opacity-30"
			/> */}

			{/* Hero section */}
			<div className="lg:h-[535px] flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center">
				<div className="bg-maitrise w-full lg:w-1/2 lg:h-full">
					<div className="text-4xl font-bold tracking-wider text-support bg-univers p-10 pb-5">
						<h1>
							Vous êtes <span className="text-cohesion">unique</span>, <br />
							nos <span className="text-cohesion">formations</span> aussi.
						</h1>
						<div className="border border-cohesion w-12 my-8"></div>
					</div>
					<div className="p-10">
						<p className="text-xl text-gray-600 text-support">
							Ipseis est un organisme de formation dédiée aux professionnels de santé. Les formations que nous proposons s&apos;axent sur
							l&apos;accompagnement dans le secteur des soins pour les professionnels de santé et les particuliers.
						</p>
						<div className="mt-10">
							<button
								onClick={() => router.push("/formations")}
								className="bg-univers text-support py-3 px-2 rounded-xl hover:opacity-80 shadow-2xl text-lg"
							>
								Nos formations
							</button>
						</div>
					</div>
				</div>
				<div className="bg-[url('/images/banner-home2.png')] bg-no-repeat bg-right-top lg:bg-right-bottom w-full h-[250px] lg:w-1/2 lg:h-full"></div>
			</div>

			{/* Logo cloud */}
			<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 mt-24 text-univers">
				<SectionTitle
					tag="Une formation humaine"
					title="Ils sont satisfaits"
					description="Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
							mi viverra elit nunc."
				/>

				<div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{featuredLogos.map((logo) => (
						<FeaturedCompanyLogo key={logo.name} title={logo.name} alt={logo.alt} src={logo.image} />
					))}
				</div>

				<div className="mt-16 flex items-center justify-center gap-x-6">
					<Link href="/formations" className="text-md font-semibold leading-6 hover:underline hover:underline-offset-4">
						Voir nos formations <span aria-hidden="true">→</span>
					</Link>
				</div>
			</div>

			{/* Contact form */}
			<div className="mx-auto rounded-3xl py-10 px-6 lg:pl-40 lg:pr-0 mt-12 bg-univers">
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
