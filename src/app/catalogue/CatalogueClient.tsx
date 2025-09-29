"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, ConfigProvider, Spin } from "antd";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";
import starOrange from "@/_images/logo/star_orange.svg";
import type { Theme } from "@/lib/api";

interface CatalogueClientProps {
	initialThemes?: Theme[];
}

const ThemeBubble = memo(({ theme, index, onClick }: any) => {
	const positions = [
		"col-start-2 row-start-1 justify-self-center w-[130px] sm:w-full",
		"col-start-3 row-start-2 justify-self-center w-[130px] sm:w-full",
		"col-start-2 row-start-3 justify-self-center w-[130px] sm:w-full",
		"col-start-1 row-start-2 justify-self-center w-[130px] sm:w-full",
	];

	return (
		<div
			key={theme ? theme._id : index}
			onClick={onClick}
			className={clsx(
				theme
					? index === 0
						? "sm:hover:-translate-y-5"
						: index === 1
						? "sm:hover:translate-x-5"
						: index === 2
						? "sm:hover:translate-y-5"
						: index === 3
						? "sm:hover:-translate-x-5"
						: ""
					: "cursor-wait",
				`${
					positions[index % positions.length]
				} flex justify-center items-center aspect-1 ring-2 ring-cohesion/30  cursor-pointer rounded-full shadow-2xl p-2 ${
					theme ? "hover:ring-cohesion hover:transform hover:scale-110" : ""
				} duration-500`
			)}
		>
			{theme ? (
				<h2 className="text-univers text-xs sm:text-base font-semibold text-center">{theme.title}</h2>
			) : (
				<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
					<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
				</div>
			)}
		</div>
	);
});

const BubbleContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="grid grid-cols-3 grid-rows-3 gap-2 items-center justify-center max-w-2xl mb-10">{children}</div>
);

export default function CatalogueClient({ initialThemes = [] }: CatalogueClientProps) {
	const router = useRouter();
	const [themesLoading, setThemesLoading] = useState(!initialThemes.length);
	const [routingLoading, setRoutingLoading] = useState<string | null>(null);
	const [themes, setThemes] = useState<Theme[]>(initialThemes);
	const [catalogue, setCatalogue] = useState<any[]>([]);
	const [selectedTheme, setSelectedTheme] = useState("");
	const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

	// Fetch themes seulement si pas déjà chargés (fallback)
	const fetchThemes = useCallback(async () => {
		if (initialThemes.length > 0) return; // Pas besoin de fetch si données déjà présentes

		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/themes/list`);
			if (response.status === 200) {
				setThemes(response.data);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des thématiques :", error);
		}
	}, [initialThemes.length]);

	useEffect(() => {
		// Si on a des themes initiaux, pas besoin de fetch
		if (initialThemes.length > 0) {
			setThemesLoading(false);
			return;
		}

		fetchThemes();
		return () => {
			setThemes([]);
			setCatalogue([]);
			setSelectedTheme("");
			setCatalogueModalOpen(false);
			setRoutingLoading(null);
		};
	}, [fetchThemes, initialThemes.length]);

	useEffect(() => {
		if (themes.length > 0) setThemesLoading(false);
	}, [themes]);

	useEffect(() => {
		if (catalogue.length > 0 && selectedTheme !== "") setCatalogueModalOpen(true);
	}, [catalogue, selectedTheme]);

	const fetchCatalogue = useCallback(async (themeId: string, themeTitle: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trainings/by-theme/${themeId}`);
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
		setRoutingLoading(null);
	};

	const handleRouting = (trainingId: string) => {
		setRoutingLoading(trainingId);
		router.push(`/catalogue/formation/${trainingId}`);
	};

	return (
		<>
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center mt-10">
				<BubbleContainer>
					<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
						<Image
							src={starOrange}
							alt="Logo Ipseis"
							title="Logo Ipseis"
							height={200}
							width={200}
							className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
						/>
					</div>
					{themesLoading
						? [1, 2, 3, 4].map((theme: any, index: number) => <ThemeBubble index={index} />)
						: themes.map((theme: any, index: number) => (
								<ThemeBubble key={theme._id} theme={theme} index={index} onClick={() => fetchCatalogue(theme._id, theme.title)} />
						  ))}
				</BubbleContainer>
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
					token: { fontFamily: "Halibut" },
				}}
			>
				<Modal title={`Thématique : ${selectedTheme}`} centered open={catalogueModalOpen} footer={null} width={600} onCancel={handleModalClose}>
					<div className="grid grid-cols-2 grid-rows-2 gap-5 items-center justify-center max-w-[500px] mx-auto py-5">
						{catalogue.map((training: any) => {
							const isLoadingThis = routingLoading === training._id;
							return (
								<div
									key={training._id}
									onClick={!isLoadingThis ? () => handleRouting(training._id) : undefined}
									className={clsx(
										"relative flex justify-center items-center aspect-1 ring-2 ring-cohesion/30 rounded-xl shadow-2xl p-2 duration-500",
										isLoadingThis ? "cursor-wait" : "hover:ring-cohesion cursor-pointer hover:transform hover:scale-105"
									)}
								>
									<p className={clsx("text-wrap text-center text-univers text-xs sm:text-base font-semibold", isLoadingThis ? "opacity-30" : "")}>
										{training.title}
									</p>
									{isLoadingThis && (
										<div className="absolute inset-0 flex justify-center items-center">
											<Spin indicator={<LoadingOutlined spin />} size="default" className="text-cohesion" />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</Modal>
			</ConfigProvider>
		</>
	);
}
