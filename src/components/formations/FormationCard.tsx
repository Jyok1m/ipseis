type FormationCardProps = {
	id: number;
	title: string;
	href: string;
	description: string;
	uri: string;
};

import React from "react";
import Link from "next/link";
import Image from "next/image";

const FormationCard = (props: FormationCardProps) => {
	return (
		<article className="flex flex-col items-start">
			<div className="relative w-full">
				<Image
					alt={props.title}
					src={props.uri}
					width={256}
					height={256}
					className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
				/>
				<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-univers/10" />
			</div>
			<div className="max-w-xl">
				<div className="group relative">
					<h3 className="mt-6 text-xl font-semibold leading-6 text-cohesion group-hover:text-univers">
						<Link href={`/formations/${props.id}`}>
							<span className="absolute inset-0" />
							{props.title}
						</Link>
					</h3>
					<p className="mt-5 text-lg leading-6 text-univers line-clamp-5">{props.description}</p>
				</div>
			</div>
		</article>
	);
};

export default FormationCard;
