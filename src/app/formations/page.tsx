"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";

export default function Formations() {
	const [themes, setThemes] = useState([]);

	useEffect(() => {
		const fetchThemes = async () => {
			const response = await axios.get(`${process.env.BACKEND_URL}/themes/list`);

			if (response.status === 200) {
				setThemes(response.data);
			}
		};

		fetchThemes();
	}, []);

	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
				<div className="mx-auto max-w-2xl text-center text-univers mb-16">
					<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center uppercase">Nos formations</h1>
					<p className="mt-6 text-xl leading-6">
						Découvrez nos secteurs d&apos;activité et explorez les différentes thématiques que nous proposons pour répondre à vos besoins
						professionnels.
					</p>
				</div>
				<div className="grid grid-cols-3 grid-rows-3 gap-2 items-center justify-center max-w-xl">
					{/* Image au centre */}
					<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
						<Image src={require("/src/_images/logo/star_orange.svg")} alt="Logo Ipseis" title="Logo Ipseis" height={200} width={200} />
					</div>

					{/* Titres des thèmes */}
					{themes.map((theme: any, index: number) => {
						const positions = [
							"col-start-2 row-start-1", // Haut
							"col-start-3 row-start-2", // Droite
							"col-start-2 row-start-3", // Bas
							"col-start-1 row-start-2", // Gauche
						];

						return (
							<div
								key={theme._id}
								className={clsx(
									index === 0
										? "hover:-translate-y-5"
										: index === 1
										? "hover:translate-x-5"
										: index === 2
										? "hover:translate-y-5"
										: index === 3
										? "hover:-translate-x-5"
										: "",
									`${
										positions[index % positions.length]
									} flex justify-center items-center aspect-1 ring-2 ring-cohesion/30 hover:ring-cohesion cursor-pointer rounded-full shadow-2xl p-2 hover:transform hover:scale-105 duration-500`
								)}
							>
								<h2 className="text-univers text-xs sm:text-xl font-bold text-center">{theme.title}</h2>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
