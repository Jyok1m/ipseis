"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, ConfigProvider, Spin } from "antd";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";

const ThemeBubble = memo(({ theme, index, onClick }: any) => {
	const positions = [
		"col-start-2 row-start-1 justify-self-center w-[130px] sm:w-full", // Haut
		"col-start-3 row-start-2 justify-self-center w-[130px] sm:w-full", // Droite
		"col-start-2 row-start-3 justify-self-center w-[130px] sm:w-full", // Bas
		"col-start-1 row-start-2 justify-self-center w-[130px] sm:w-full", // Gauche
	];

	return (
		<div
			key={theme._id}
			onClick={onClick}
			className={clsx(
				index === 0
					? "sm:hover:-translate-y-5"
					: index === 1
					? "sm:hover:translate-x-5"
					: index === 2
					? "sm:hover:translate-y-5"
					: index === 3
					? "sm:hover:-translate-x-5"
					: "",
				`${
					positions[index % positions.length]
				} flex justify-center items-center aspect-1 ring-2 ring-cohesion/30 hover:ring-cohesion cursor-pointer rounded-full shadow-2xl p-2 hover:transform hover:scale-110 duration-500`
			)}
		>
			<h2 className="text-univers text-xs sm:text-base font-semibold text-center">{theme.title}</h2>
		</div>
	);
});

const BubbleContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="grid grid-cols-3 grid-rows-3 gap-2 items-center justify-center max-w-2xl">{children}</div>
);

export default function CataloguePage() {
	const router = useRouter();

	// Thématiques de formations
	const [themesLoading, setThemesLoading] = useState(true);
	const [themes, setThemes] = useState([]);

	// Catalogue
	const [catalogue, setCatalogue] = useState([]);
	const [selectedTheme, setSelectedTheme] = useState("");
	const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

	/* ---------------------------------------------------------------- */
	/*                           Effect Hooks                           */
	/* ---------------------------------------------------------------- */

	const fetchThemes = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.BACKEND_URL}/themes/list`);
			if (response.status === 200) {
				setThemes(response.data);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des thématiques :", error);
		}
	}, []);

	useEffect(() => {
		fetchThemes();

		return () => {
			setThemes([]);
			setCatalogue([]);
			setSelectedTheme("");
			setCatalogueModalOpen(false);
		};
	}, [fetchThemes]);

	useEffect(() => {
		if (themes.length > 0) {
			setThemesLoading(false);
		}
	}, [themes]);

	useEffect(() => {
		if (catalogue.length > 0 && selectedTheme !== "") {
			setCatalogueModalOpen(true);
		}
	}, [catalogue, selectedTheme]);

	/* ---------------------------------------------------------------- */
	/*                             Functions                            */
	/* ---------------------------------------------------------------- */

	const fetchCatalogue = useCallback(async (themeId: string, themeTitle: string) => {
		try {
			const response = await axios.get(`${process.env.BACKEND_URL}/trainings/by-theme/${themeId}`);
			if (response.status === 200) {
				setCatalogue(response.data);
				setSelectedTheme(themeTitle);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du catalogue :", error);
		}
	}, []);

	const handleModalClose = () => {
		setCatalogueModalOpen(false);
		setSelectedTheme("");
		setCatalogue([]);
	};

	const handleRouting = (trainingId: string) => {
		router.push(`/catalogue/formation/${trainingId}`);
	};

	/* ---------------------------------------------------------------- */
	/*                                JSX                               */
	/* ---------------------------------------------------------------- */

	return (
		<div className="bg-support py-8 min-h-screen">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
				<div className="mx-auto max-w-2xl text-center text-univers mb-16">
					<h1 className="mt-2 text-2xl font-bold tracking-wider sm:text-4xl text-center uppercase">Catalogue de formations</h1>
					<p className="mt-6 leading-6 text-base sm:text-lg">
						Découvrez nos secteurs d&apos;activité et explorez les différentes thématiques que nous proposons pour répondre à vos besoins
						professionnels.
					</p>
				</div>
				{!themesLoading ? (
					<BubbleContainer>
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
						{themes.map((theme: any, index: number) => (
							<ThemeBubble key={theme._id} theme={theme} index={index} onClick={() => fetchCatalogue(theme._id, theme.title)} />
						))}
					</BubbleContainer>
				) : (
					<BubbleContainer>
						<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
							<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
						</div>
					</BubbleContainer>
				)}
			</div>
			<ConfigProvider
				theme={{
					components: {
						Modal: {
							titleFontSize: 18,
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
					title={`Thématique : ${selectedTheme}`}
					centered
					open={catalogueModalOpen}
					footer={null}
					width={600}
					onCancel={() => handleModalClose()}
				>
					{
						<div className="grid grid-cols-2 grid-rows-2 gap-5 items-center justify-center max-w-[500px] mx-auto py-5">
							{catalogue.map((training: any) => (
								<div
									key={training._id}
									onClick={() => handleRouting(training._id)}
									className="flex justify-center items-center aspect-1 ring-2 ring-cohesion/30 hover:ring-cohesion cursor-pointer rounded-xl shadow-2xl p-2 hover:transform hover:scale-105 duration-500"
								>
									<p className="text-wrap text-center text-univers text-xs sm:text-base font-semibold">{training.title}</p>
								</div>
							))}
						</div>
					}
				</Modal>
			</ConfigProvider>
		</div>
	);
}
