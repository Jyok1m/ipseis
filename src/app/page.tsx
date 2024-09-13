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

const posts = [
	{
		id: 1,
		title: "Accueil, communication",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		imageUrl:
			"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		author: {
			name: "Michael Foster",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	{
		id: 2,
		title: "Gérontologie, gériatrie, personnes âgées",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		imageUrl:
			"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		author: {
			name: "Michael Foster",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	{
		id: 3,
		title: "Personnes en situation de Handicap",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		imageUrl:
			"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
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
						<p className="text-xl text-support">
							Ipseis est un organisme de formation dédiée aux professionnels de santé. Les formations que nous proposons s&apos;axent sur
							l&apos;accompagnement dans le secteur des soins pour les professionnels de santé et les particuliers.
						</p>
						<div className="mt-10">
							<button
								onClick={() => router.push("/formations")}
								className="bg-univers text-support py-3 px-2 rounded-xl hover:opacity-80 shadow-2xl text-lg"
							>
								Parcourir nos formations
							</button>
						</div>
					</div>
				</div>
				<div className="bg-[url('/images/banner-home2.png')] bg-no-repeat bg-right-top lg:bg-right-bottom w-full h-[250px] lg:w-1/2 lg:h-full"></div>
			</div>

			{/* Formations */}
			<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 mt-24 text-univers">
				<div className="mx-auto max-w-2xl text-center mb-16 text-univers">
					<h2 className="text-base font-semibold leading-6 text-cohesion">Des formations innovantes</h2>
					<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center">
						Nos dernières <span className="text-cohesion">formations</span>
					</h1>
					<p className="mt-6 text-md sm:text-lg leading-6">
						Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
						mi viverra elit nunc.
					</p>
				</div>

				<div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{posts.map((post) => (
						<article
							key={post.id}
							className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-maitrise px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-80"
						>
							<img alt="" src={post.imageUrl} className="absolute inset-0 -z-10 h-full w-full object-cover" />
							<div className="absolute inset-0 -z-10 bg-gradient-to-t from-univers via-univers/40" />
							<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-univers/10" />

							<h3 className="text-2xl font-semibolde tracking-wider text-support">
								<a href={post.href}>
									<span className="absolute inset-0" />
									{post.title}
								</a>
							</h3>
						</article>
					))}
				</div>
			</div>

			{/* Logo cloud */}
			{/* <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 mt-24 text-univers">
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
			</div> */}

			{/* Contact form */}
			<div className="mx-auto rounded-3xl py-10 px-6 lg:pr-0 mt-12">
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
