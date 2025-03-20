"use client";

import React, { useState, useEffect } from "react";
import { Modal, ConfigProvider } from "antd";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";

export default function Formations() {
	// Thématiques de formations
	const [themes, setThemes] = useState([]);

	// Catalogue
	const [catalogue, setCatalogue] = useState([]);
	const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

	/* ---------------------------------------------------------------- */
	/*                           Effect Hooks                           */
	/* ---------------------------------------------------------------- */

	useEffect(() => {
		fetchThemes();

		return () => {
			setThemes([]);
			setCatalogue([]);
			setCatalogueModalOpen(false);
		};
	}, []);

	/* ---------------------------------------------------------------- */
	/*                             Functions                            */
	/* ---------------------------------------------------------------- */

	const fetchThemes = async () => {
		const response = await axios.get(`${process.env.BACKEND_URL}/themes/list`);
		if (response.status === 200) {
			setThemes(response.data);
		}
	};

	const fetchCatalogue = async (themeId: string) => {
		const response = await axios.get(`${process.env.BACKEND_URL}/trainings/by-theme/${themeId}`);
		if (response.status === 200) {
			setCatalogue(response.data);
			setTimeout(() => {
				setCatalogueModalOpen(true);
			}, 200);
		}
	};

	const handleModalClose = () => {
		setCatalogueModalOpen(false);
		setCatalogue([]);
	};

	/* ---------------------------------------------------------------- */
	/*                                JSX                               */
	/* ---------------------------------------------------------------- */

	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
				<div className="mx-auto max-w-2xl text-center text-univers mb-16">
					<h1 className="mt-2 text-2xl font-bold tracking-wider sm:text-4xl text-center uppercase">Nos formations</h1>
					<p className="mt-6 text-md sm:text-xl leading-6">
						Découvrez nos secteurs d&apos;activité et explorez les différentes thématiques que nous proposons pour répondre à vos besoins
						professionnels.
					</p>
				</div>
				<div className="grid grid-cols-3 grid-rows-3 gap-2 items-center justify-center max-w-2xl">
					{/* Image au centre */}
					<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
						<Image
							src={require("/src/_images/logo/star_orange.svg")}
							alt="Logo Ipseis"
							title="Logo Ipseis"
							height={200}
							width={200}
							className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
						/>
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
								onClick={() => fetchCatalogue(theme._id)}
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
								<h2 className="text-univers text-[10px] sm:text-xs md:text-sm lg:text-md font-bold text-center">{theme.title}</h2>
							</div>
						);
					})}
				</div>
			</div>
			<ConfigProvider
				theme={{
					components: {
						Modal: {
							titleFontSize: 20,
							titleColor: "#263c27",
							headerBg: "#fffce8",
							contentBg: "#fffce8",
						},
					},
					token: {
						fontFamily: "Halibut",
					},
				}}
			>
				<Modal
					title="Thématique : Accueil et Communication"
					centered
					open={catalogueModalOpen}
					footer={null}
					width={600}
					onCancel={() => setCatalogueModalOpen(false)}
				>
					{
						<div className="grid grid-cols-2 grid-rows-2 gap-5 items-center justify-center max-w-[500px] mx-auto py-5">
							{catalogue.map((training: any) => (
								<div
									key={training._id}
									className="flex justify-center items-center aspect-1 ring-2 ring-cohesion/30 hover:ring-cohesion cursor-pointer rounded-xl shadow-2xl p-2 hover:transform hover:scale-105 duration-500"
								>
									<p
										className="text-wrap text-center text-univers text-[10px] sm:text-xs md:text-sm lg:text-md font-semibold"
										onClick={() => console.log(training.title)}
									>
										{training.title}
									</p>
								</div>
							))}
						</div>
					}
				</Modal>
			</ConfigProvider>
		</div>
	);
}
