"use client";

import React from "react";
import FormationCard from "@/components/formations/FormationCard";
import { formations } from "@/app/static/catalogue";

export default function Formations() {
	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center mb-16 text-univers">
					<h2 className="text-lg font-semibold leading-6 text-cohesion">Accompagner et prendre soin</h2>
					<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center">
						Catalogue de <span className="text-cohesion">formations</span>
					</h1>
					<p className="mt-6 text-xl leading-6">
						Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
						mi viverra elit nunc.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{formations.map((formation, index: number) => (
						<FormationCard key={index} {...formation} />
					))}
				</div>
			</div>
		</div>
	);
}
