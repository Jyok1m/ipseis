"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Image from "next/image";
import axios from "axios";

export default function FormationPage({ params }: { params: any }) {
	const trainingId = params?.id ?? "";

	const [trainingData, setTrainingData] = useState<any>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	console.log(trainingData);

	/* ---------------------------------------------------------------- */
	/*                           Effect Hooks                           */
	/* ---------------------------------------------------------------- */

	const fetchtrainingData = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.BACKEND_URL}/trainings/by-id/${trainingId}`);
			if (response.status === 200) {
				setTrainingData(response.data);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des thématiques :", error);
		}
	}, []);

	useEffect(() => {
		fetchtrainingData();

		return () => {
			setTrainingData(null);
			setIsLoaded(false);
		};
	}, [fetchtrainingData]);

	return (
		<div className="bg-support px-6 py-8 lg:px-8">
			<div className="mx-auto max-w-3xl text-xs text-univers">
				{/* Section titre */}
				<div>
					<p className="text-lg font-semibold text-cohesion">{trainingData?.theme}</p>
					<h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">{trainingData?.title}</h1>
					<p className="mt-6 text-xl/8">
						Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
						feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
					</p>
				</div>

				{/* Section objectifs pédagogiques */}

				<div>
					<h2 className="mt-10 mb-5 text-pretty text-2xl font-semibold tracking-tight flex items-center gap-x-2">
						<FontAwesomeIcon icon={faBullseyePointer} />
						Objectifs pédagogiques
					</h2>
					{trainingData?.pedagogical_objectives.map((el: string, index: number) => (
						<li key={index} className="flex">
							<Image
								aria-hidden="true"
								src={require("/src/_images/logo/star_orange.svg")}
								alt="Logo Ipseis"
								title="Logo Ipseis"
								width={40}
								height={40}
								className="h-10 w-10 flex-none"
							/>
							<span className="flex items-center">{el}</span>
						</li>
					))}
				</div>

				{/* Programme */}

				<div>
					<h2 className="mt-10 mb-5 text-pretty text-2xl font-semibold tracking-tight flex items-center gap-x-2">
						<FontAwesomeIcon icon={faListCheck} />
						Programme
					</h2>
					{trainingData?.program.map((el: string, index: number) => (
						<li key={index} className="flex">
							<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
								<FontAwesomeIcon icon={faCheck} className="flex-none" />
							</div>
							<span className="flex items-center">{el}</span>
						</li>
					))}
				</div>

				{/* Méthodes pédagogiques */}

				<div>
					<h2 className="mt-10 mb-5 text-pretty text-2xl font-semibold tracking-tight flex items-center gap-x-2">
						<FontAwesomeIcon icon={faHeadSideBrain} />
						Méthodologie
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-3">
						{trainingData?.pedagogical_methods.map((el: string, index: number) => (
							<li key={index} className="flex ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faHandBackPointRight} className="flex-none" />
								</div>
								<span className="flex items-center">{el}</span>
							</li>
						))}
					</div>
				</div>

				{/* Infos pratiques */}

				<div>
					<h2 className="mt-10 mb-5 text-pretty text-2xl font-semibold tracking-tight flex items-center gap-x-2">
						<FontAwesomeIcon icon={faCircleInfo} />
						Infos pratiques
					</h2>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-0 sm:gap-3">
						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2 col-span-full">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faGraduationCap} className="flex-none" />
								</div>
								<h3 className="font-semibold">Méthodes d&apos;évaluation</h3>
							</div>
							{trainingData?.evaluation_methods.map((el: string, index: number) => (
								<li key={index} className="flex">
									<div className="h-10 min-w-10 flex items-center justify-center">
										<FontAwesomeIcon icon={faCheck} className="flex-none" />
									</div>
									<span className="flex items-center">{el}</span>
								</li>
							))}
						</li>

						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faScreenUsers} className="flex-none" />
								</div>
								<h3 className="font-semibold">Public</h3>
							</div>
							<span className="flex items-center ml-3">{trainingData?.audience}</span>
						</li>

						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faStairs} className="flex-none" />
								</div>
								<h3 className="font-semibold">Prérequis</h3>
							</div>
							<span className="flex items-center ml-3">{trainingData?.prerequisites}</span>
						</li>

						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faPersonChalkboard} className="flex-none" />
								</div>
								<h3 className="font-semibold">Intervenant</h3>
							</div>
							<span className="flex items-center ml-3">{trainingData?.trainer}</span>
						</li>

						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faUsersMedical} className="flex-none" />
								</div>
								<h3 className="font-semibold">Nombre de stagiaires</h3>
							</div>
							<span className="flex items-center ml-3">{trainingData?.number_of_trainees}</span>
						</li>

						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faCalendarClock} className="flex-none" />
								</div>
								<h3 className="font-semibold">Durée</h3>
							</div>
							<span className="flex items-center ml-3">{trainingData?.duration}</span>
						</li>

						<li className="flex flex-col gap-x-3 ring-0 sm:ring-1 ring-cohesion rounded-lg p-0 sm:p-2">
							<div className="flex items-center">
								<div className="h-10 min-w-10 flex items-center justify-center text-cohesion">
									<FontAwesomeIcon icon={faCircleEuro} className="flex-none" />
								</div>
								<h3 className="font-semibold">Tarification</h3>
							</div>
							<span className="flex items-center ml-3">Devis {trainingData?.quote}</span>
						</li>
					</div>
				</div>

				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
