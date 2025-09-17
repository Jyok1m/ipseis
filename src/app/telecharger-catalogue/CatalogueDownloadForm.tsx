"use client";

import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Spin, notification, ConfigProvider } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const InputWrapper = ({
	label,
	children,
	className,
	required = false,
}: {
	label: string;
	children: React.ReactNode;
	className?: string;
	required?: boolean;
}) => (
	<div className={className}>
		<label htmlFor={label} className="text-lg sm:text-xl leading-7 text-support font-bold mb-1 block">
			{label}
			{required && <span className="text-cohesion ml-1">*</span>}
		</label>
		<div className="mt-3">{children}</div>
	</div>
);

const TextInput = ({ onChange, value, id, name, type, autoComplete, placeholder, disabled }: any) => (
	<input
		onChange={onChange}
		value={value}
		disabled={disabled}
		id={id}
		name={name}
		type={type}
		autoComplete={autoComplete}
		placeholder={placeholder}
		className="block w-full rounded-lg px-4 py-3 sm:py-4 text-univers bg-white border-2 border-support/20 focus:border-cohesion focus:ring-2 focus:ring-cohesion/20 shadow-sm placeholder:text-univers/50 text-base sm:text-lg font-medium transition-all duration-200"
	/>
);

const MultiSelectDropdown = ({
	options,
	selectedValues,
	onChange,
	disabled,
}: {
	options: string[];
	selectedValues: string[];
	onChange: (values: string[]) => void;
	disabled: boolean;
}) => {
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (value && !selectedValues.includes(value)) {
			onChange([...selectedValues, value]);
		}
	};

	const removeSelection = (valueToRemove: string) => {
		onChange(selectedValues.filter((value) => value !== valueToRemove));
	};

	return (
		<div className="space-y-3">
			<select
				onChange={handleSelectChange}
				disabled={disabled}
				value=""
				className="block w-full rounded-lg px-4 py-3 sm:py-4 text-univers bg-white border-2 border-support/20 focus:border-cohesion focus:ring-2 focus:ring-cohesion/20 shadow-sm text-base sm:text-lg font-medium transition-all duration-200"
			>
				<option value="">Sélectionnez une ou plusieurs formations</option>
				{options.map((option) => (
					<option key={option} value={option} disabled={selectedValues.includes(option)}>
						{option} {selectedValues.includes(option) ? "(déjà sélectionné)" : ""}
					</option>
				))}
			</select>

			{selectedValues.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm text-support/70 font-medium">Formations sélectionnées :</p>
					<div className="flex flex-wrap gap-2">
						{selectedValues.map((value) => (
							<span
								key={value}
								className="inline-flex items-center gap-2 px-3 py-1 bg-cohesion/10 text-support border border-cohesion/30 rounded-full text-sm font-medium"
							>
								{value}
								<button
									type="button"
									onClick={() => removeSelection(value)}
									disabled={disabled}
									className="text-cohesion hover:text-cohesion/70 font-bold text-lg leading-none disabled:opacity-50"
								>
									×
								</button>
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default function CatalogueDownloadForm() {
	const [api, contextHolder] = notification.useNotification();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [interestedFormations, setInterestedFormations] = useState<string[]>([]);

	const [isLoading, setIsLoading] = useState(false);

	const openNotification = (type: NotificationType, title: string, message: string) => {
		api[type]({
			message: title,
			description: message,
			icon:
				type === "success" ? (
					<CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
				) : (
					<XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />
				),
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		const payload = { firstName, lastName, email, interestedFormations };

		if ([firstName, lastName, email].some((value) => value.length === 0)) {
			openNotification("error", "Zut...", "Veuillez remplir tous les champs obligatoires.");
			setIsLoading(false);
			return;
		}

		// Validation basique de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			openNotification("error", "Zut...", "Veuillez saisir une adresse email valide.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/catalogue`, {
				params: payload,
			});

			if (response.status === 200) {
				openNotification("success", "Parfait !", response.data.message);
				setFirstName("");
				setLastName("");
				setEmail("");
				setInterestedFormations([]);
			} else {
				openNotification("error", "Zut...", response.data.error || "Une erreur est survenue.");
			}
		} catch (error: any) {
			const errorMessage = error.response?.data?.error || error.message || "Une erreur inattendue est survenue.";
			openNotification("error", "Oops...", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative isolate bg-maitrise p-5 w-4/5 lg:max-w-3xl rounded-2xl">
			<ConfigProvider
				theme={{
					token: {
						colorBgElevated: "#fffce8",
						colorTextHeading: "#263c27",
						colorText: "#263c27",
						fontFamily: "Halibut",
					},
				}}
			>
				{contextHolder}
			</ConfigProvider>

			<div className="mx-auto max-w-xl">
				{/* Info Box */}
				<div className="mb-8 p-5 sm:p-6 bg-support/15 border-2 border-support/30 rounded-xl">
					<div className="flex items-start gap-4">
						<DocumentArrowDownIcon className="h-7 w-7 sm:h-8 sm:w-8 text-support mt-1 flex-shrink-0" />
						<div>
							<h3 className="text-support font-bold mb-3 text-lg sm:text-xl">Notre catalogue de formations 2025</h3>
							<p className="text-support/90 text-base sm:text-lg leading-relaxed font-medium">
								Découvrez plus de 30 formations spécialisées dans le secteur de la santé et du médico-social. Le catalogue sera envoyé directement
								dans votre boîte email au format PDF.
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
					<div className="lg:flex-auto">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-8 sm:grid-cols-2">
							<InputWrapper label="Prénom" required>
								<TextInput
									onChange={(e: any) => setFirstName(e.target.value)}
									value={firstName}
									disabled={isLoading}
									id="first-name"
									name="first-name"
									type="text"
									autoComplete="given-name"
									placeholder="ex. Jean"
								/>
							</InputWrapper>
							<InputWrapper label="Nom de famille" required>
								<TextInput
									onChange={(e: any) => setLastName(e.target.value)}
									value={lastName}
									disabled={isLoading}
									id="last-name"
									name="last-name"
									type="text"
									autoComplete="family-name"
									placeholder="ex. Dupont"
								/>
							</InputWrapper>
							<InputWrapper label="Email" className="col-span-full sm:col-span-2" required>
								<TextInput
									onChange={(e: any) => setEmail(e.target.value)}
									value={email}
									disabled={isLoading}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									placeholder="ex. jean.dupont@test.fr"
								/>
							</InputWrapper>
							<InputWrapper label="Formations d'intérêt (optionnel)" className="col-span-full sm:col-span-2">
								<MultiSelectDropdown
									options={[
										"Accueil, communication",
										"Gérontologie, gériatrie, personnes âgées",
										"Personnes en situation de handicap",
										"Soins palliatifs et fin de vie",
										"Management et leadership",
										"Prévention des risques",
										"Bien-être au travail",
										"Formation des formateurs",
										"Réflexologie",
										"Autre",
									]}
									selectedValues={interestedFormations}
									onChange={setInterestedFormations}
									disabled={isLoading}
								/>
							</InputWrapper>
						</div>

						{/* RGPD Notice */}
						<div className="mt-8 p-4 sm:p-5 bg-support/10 border-2 border-support/15 rounded-lg">
							<p className="text-support/80 text-sm sm:text-base leading-relaxed font-medium">
								En soumettant ce formulaire, vous acceptez que vos données personnelles soient utilisées pour vous envoyer le catalogue et vous tenir
								informé de nos formations. Vos données sont traitées conformément à notre{" "}
								<a href="/mentions-legales" className="text-cohesion hover:underline font-semibold">
									politique de confidentialité
								</a>
								.
							</p>
						</div>

						<div className="mt-10">
							<button
								onClick={() => handleSubmit()}
								disabled={isLoading}
								className={clsx(
									isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90 hover:shadow-lg transform hover:scale-105",
									"w-full rounded-xl bg-univers px-6 py-4 sm:py-5 text-lg sm:text-xl text-support font-bold shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-univers transition-all duration-200"
								)}
							>
								<span className="flex justify-center items-center gap-3 text-support">
									{!isLoading ? (
										<>
											<DocumentArrowDownIcon className="h-6 w-6 sm:h-7 sm:w-7" />
											<span className="font-bold">Télécharger le catalogue</span>
										</>
									) : (
										<Spin indicator={<LoadingOutlined spin className="text-xl" />} />
									)}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
