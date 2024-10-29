import React from "react";
import Image from "next/image";
import Link from "next/link";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { formations } from "@/app/static/catalogue";

export default function FormationPage({ params }: { params: { id: string } }) {
	const formation = formations.find((formation) => formation.id === parseInt(params.id));

	return (
		<div className="bg-support px-6 py-8">
			<div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
				<h1 className="my-2 text-3xl font-bold tracking-tight text-univers sm:text-4xl">{formation?.title?.toUpperCase()}</h1>
				<p className="mt-6 text-xl leading-8">{formation?.description}</p>
				<div className="mt-10 max-w-2xl">
					<ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600 text-lg">
						{formation?.keypoints.map((keypoint, index) => (
							<li key={index} className="flex gap-x-3">
								<Image
									aria-hidden="true"
									src={require("/src/_images/logo/star_orange.svg")}
									alt="Logo Ipseis"
									title="Logo Ipseis"
									width={40}
									height={40}
									className="h-10 w-10 flex-none"
								/>
								<span className="flex items-center">{keypoint}</span>
							</li>
						))}
					</ul>
				</div>
				<figure className="mt-16">
					<Image
						alt={formation?.title || ""}
						src={formation?.uri || ""}
						className="aspect-video rounded-xl bg-gray-50 object-cover"
						width={1310}
						height={873}
					/>
					<figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
						<InformationCircleIcon aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-gray-300" />
						Faucibus commodo massa rhoncus, volutpat.
					</figcaption>
				</figure>
			</div>
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<Link href="/contact" className="bg-maitrise text-support py-3 px-5 rounded-xl hover:opacity-80 shadow-2xl text-xl">
					Contactez-nous
				</Link>
			</div>

			{formations.length > 1 && (
				<>
					<div className="mx-auto max-w-3xl text-center my-16 text-univers">
						<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center uppercase">Découvrez nos autres formations </h1>
						<p className="mt-6 text-xl leading-6">
							Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
							mi viverra elit nunc.
						</p>
					</div>

					<div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
						{formations
							.filter((e) => e.id !== formation?.id)
							.map((formation) => (
								<article
									key={formation?.id}
									className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-maitrise px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-80"
								>
									<Image
										alt={formation?.title}
										src={formation?.uri}
										width={256}
										height={256}
										className="absolute inset-0 -z-10 h-full w-full object-cover"
									/>
									<div className="absolute inset-0 -z-10 bg-gradient-to-t from-univers via-univers/40" />
									<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-univers/10" />

									<h3 className="text-2xl font-semibolde tracking-wider text-support">
										<Link href={`${formation.href}/${formation.id}`}>
											<span className="absolute inset-0" />
											{formation.title}
										</Link>
									</h3>
								</article>
							))}
					</div>
				</>
			)}
		</div>
	);
}
