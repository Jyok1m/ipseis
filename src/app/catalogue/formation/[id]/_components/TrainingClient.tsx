"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TitleSection } from "@/components/TitleSection";
import Divider from "@/components/global/Divider";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
	faBullseyePointer,
	faListCheck,
	faHeadSideBrain,
	faCheck,
	faHandBackPointRight,
	faCircleInfo,
	faScreenUsers,
	faStairs,
	faGraduationCap,
	faPersonChalkboard,
	faUsersMedical,
	faCalendarClock,
	faCircleEuro,
} from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function TrainingClient({ id }: { id: string }) {
	const router = useRouter();
	const trainingId = id ?? "";
	const [trainingData, setTrainingData] = useState<any>(null);
	const [catalogue, setCatalogue] = useState<any>([]);

	const fetchtrainingData = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.BACKEND_URL}/trainings/by-id/${trainingId}`);
			if (response.status === 200) setTrainingData(response.data);
		} catch (error) {
			console.error("Erreur lors de la récupération des thématiques :", error);
		}
	}, [trainingId]);

	useEffect(() => {
		fetchtrainingData();
		return () => setTrainingData(null);
	}, [fetchtrainingData]);

	const fetchCatalogue = async () => {
		try {
			const response = await axios.get(`${process.env.BACKEND_URL}/trainings/by-theme/${trainingData?.themeId}`);
			if (response.status === 200) {
				setCatalogue(response.data.filter((el: any) => el._id !== trainingData?._id));
			}
		} catch (error) {
			console.error("Erreur lors de la récupération du catalogue :", error);
		}
	};

	useEffect(() => {
		if (trainingData) fetchCatalogue();
	}, [trainingData]);

	const handleRouting = (trainingId: string) => {
		router.replace(`/catalogue/formation/${trainingId}`);
	};

	return (
		<div className="bg-support px-6 pt-8 lg:px-8 text-sm sm:text-base text-pretty min-h-full">
			{!trainingData ? (
				<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
					<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
				</div>
			) : (
				<>
					<div className="mx-auto max-w-3xl text-univers mb-10">
						<TitleSection tag={trainingData?.theme} title={trainingData?.title} paddingSide={false} noPaddingVertical />
						<div>
							<h2 className="mt-10 mb-5 text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-x-2">
								<FontAwesomeIcon icon={faBullseyePointer} /> Objectifs pédagogiques
							</h2>
							{trainingData?.pedagogical_objectives.map((el: string, index: number) => (
								<div key={index} className="flex mb-2">
									<Image
										aria-hidden="true"
										src={require("/src/_images/logo/star_orange.svg")}
										alt="Logo Ipseis"
										title="Logo Ipseis"
										width={40}
										height={40}
										className="h-10 w-10 flex-none -mt-2.5"
									/>
									<span>{el}</span>
								</div>
							))}
						</div>
						<div>
							<h2 className="mt-10 mb-5 text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-x-2">
								<FontAwesomeIcon icon={faListCheck} /> Programme
							</h2>
							{trainingData?.program.map((el: string, index: number) => (
								<div key={index} className="flex mb-2">
									<div className="h-10 min-w-10 flex justify-center text-cohesion">
										<FontAwesomeIcon icon={faCheck} className="flex-none mt-1" />
									</div>
									<span>{el}</span>
								</div>
							))}
						</div>
						<div>
							<h2 className="mt-10 mb-5 text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-x-2">
								<FontAwesomeIcon icon={faHeadSideBrain} /> Méthodologie
							</h2>
							<div className="grid grid-cols-2 gap-3">
								{trainingData?.pedagogical_methods.map((el: string, index: number) => (
									<div key={index} className="flex rounded-lg p-0 sm:p-2 mb-2 sm:mb-0">
										<div className="h-10 min-w-10 flex justify-center text-cohesion">
											<FontAwesomeIcon icon={faHandBackPointRight} className="flex-none mt-1" />
										</div>
										<span>{el}</span>
									</div>
								))}
							</div>
						</div>
						<div>
							<h2 className="mt-10 mb-3 sm:mb-5 text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-x-2">
								<FontAwesomeIcon icon={faCircleInfo} /> Infos pratiques
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-0 sm:gap-3">
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2 col-span-full">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faGraduationCap} className="flex-none" />
										</div>
										<h3 className="font-semibold">Méthodes d'évaluation</h3>
									</div>
									{trainingData?.evaluation_methods.map((el: string, index: number) => (
										<div key={index} className="flex">
											<div className="h-10 min-w-10 flex justify-center">
												<FontAwesomeIcon icon={faCheck} className="flex-none mt-1" />
											</div>
											<span>{el}</span>
										</div>
									))}
								</div>
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faScreenUsers} className="flex-none" />
										</div>
										<h3 className="font-semibold">Public</h3>
									</div>
									<span className="flex items-center ml-3">{trainingData?.audience}</span>
								</div>
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faStairs} className="flex-none" />
										</div>
										<h3 className="font-semibold">Prérequis</h3>
									</div>
									<span className="flex items-center ml-3">{trainingData?.prerequisites}</span>
								</div>
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faPersonChalkboard} className="flex-none" />
										</div>
										<h3 className="font-semibold">Intervenant</h3>
									</div>
									<span className="flex items-center ml-3">{trainingData?.trainer}</span>
								</div>
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faUsersMedical} className="flex-none" />
										</div>
										<h3 className="font-semibold">Capacité</h3>
									</div>
									<span className="flex items-center ml-3">{trainingData?.number_of_trainees}</span>
								</div>
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faCalendarClock} className="flex-none" />
										</div>
										<h3 className="font-semibold">Durée</h3>
									</div>
									<span className="flex items-center ml-3">{trainingData?.duration}</span>
								</div>
								<div className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
									<div className="flex items-center">
										<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
											<FontAwesomeIcon icon={faCircleEuro} className="flex-none" />
										</div>
										<h3 className="font-semibold">Tarification</h3>
									</div>
									<span className="flex items-center ml-3">Devis {trainingData?.quote}</span>
								</div>
							</div>
						</div>
					</div>
					<Divider />
					<div className="mx-auto max-w-3xl text-univers">
						<TitleSection
							tag="Nos autres formations"
							titleNode={
								<p className="text-2xl sm:text-4xl tracking-wider font-semibold text-univers">
									Découvrez nos autres formations portant sur le thème : <span className="font-semibold text-cohesion">{trainingData?.theme}</span>
								</p>
							}
							paddingSide={false}
							noPaddingTop
						/>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-center justify-center mx-auto py-3">
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
						<div className="mx-auto max-w-3xl bg-maitrise mt-20 rounded-3xl">
							<div className="px-6 py-10 sm:px-6 lg:px-8">
								<div className="mx-auto max-w-2xl text-center">
									<h2 className="mt-2 text-2xl font-bold tracking-wider sm:text-4xl text-support">Vous souhaitez en savoir plus ?</h2>
									<div className="mt-10 flex items-center justify-center gap-x-6">
										<Link
											href="/contact"
											className="rounded-md bg-univers px-3 py-3 text-base md:text-lg text-support font-normal shadow-sm hover:bg-univers/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise"
										>
											<span className="flex items-center gap-x-2 text-support">Contactez-nous</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
