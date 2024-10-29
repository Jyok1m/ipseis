"use client";

import React from "react";
import FormationCard from "@/components/formations/FormationCard";
import { formations } from "@/app/static/catalogue";

export default function Formations() {
	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center mb-16 text-univers">
					<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center uppercase">Catalogue de formations</h1>
					<p className="mt-6 text-xl leading-6">
						Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
						mi viverra elit nunc.
					</p>
				</div>
				<div className="mx-auto mt-16 flex justify-center max-w-3xl">
					{formations.map((formation, index: number) => (
						<FormationCard key={index} {...formation} />
					))}
				</div>
			</div>
		</div>
	);
}
