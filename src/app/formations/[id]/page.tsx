import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { formations } from "@/app/static/catalogue";

export default function FormationPage({ params }: { params: { id: string } }) {
	const formation = formations.find((formation) => formation.id === parseInt(params.id));

	return (
		<div className="bg-support px-6 py-8">
			<div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-cohesion sm:text-4xl">{formation?.title}</h1>
				<p className="mt-6 text-xl leading-8">{formation?.description}</p>
				<div className="mt-10 max-w-2xl">
					<ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600 text-lg">
						{formation?.keypoints.map((keypoint, index) => (
							<li key={index} className="flex gap-x-3">
								<CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-maitrise" />
								<span>{keypoint}</span>
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
					Parcourir nos formations
				</Link>
			</div>
		</div>
	);
}
