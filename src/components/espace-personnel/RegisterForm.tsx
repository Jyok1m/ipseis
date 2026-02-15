"use client";

import React, { useState } from "react";
import { register } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import { notification, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

type NotificationType = "success" | "error";

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
		<label htmlFor={label} className="text-base leading-7 text-univers font-bold mb-1 block">
			{label}
			{required && <span className="text-cohesion ml-1">*</span>}
		</label>
		<div className="mt-2">{children}</div>
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
		className="block w-full rounded-lg px-4 py-3 text-univers bg-white border-2 border-univers/20 focus:border-cohesion focus:ring-2 focus:ring-cohesion/20 shadow-sm placeholder:text-univers/50 text-base font-medium transition-all duration-200"
	/>
);

export default function RegisterForm() {
	const [api, contextHolder] = notification.useNotification();
	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		company: "",
		position: "",
		address: "",
		activationCode: "",
	});
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

	const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword", "phone", "company", "position", "address", "activationCode"];
		const hasEmpty = requiredFields.some((field) => !formData[field as keyof typeof formData]);

		if (hasEmpty) {
			openNotification("error", "Erreur", "Veuillez remplir tous les champs.");
			setIsLoading(false);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			openNotification("error", "Erreur", "Les mots de passe ne correspondent pas.");
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 8) {
			openNotification("error", "Erreur", "Le mot de passe doit contenir au moins 8 caractères.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await register(formData);
			openNotification("success", "Inscription réussie", response.data.message);
			setTimeout(() => router.push("/espace-personnel/connexion"), 2000);
		} catch (error: any) {
			const message = error.response?.data?.error || "Erreur lors de l'inscription.";
			openNotification("error", "Erreur", message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
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

			<div className="bg-white rounded-2xl shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-univers">Inscription</h1>
					<p className="text-univers/60 mt-2">Créez votre compte Espace Personnel</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
						<InputWrapper label="Prénom" required>
							<TextInput
								onChange={updateField("firstName")}
								value={formData.firstName}
								disabled={isLoading}
								id="firstName"
								name="firstName"
								type="text"
								autoComplete="given-name"
								placeholder="ex. Jean"
							/>
						</InputWrapper>

						<InputWrapper label="Nom" required>
							<TextInput
								onChange={updateField("lastName")}
								value={formData.lastName}
								disabled={isLoading}
								id="lastName"
								name="lastName"
								type="text"
								autoComplete="family-name"
								placeholder="ex. Dupont"
							/>
						</InputWrapper>

						<InputWrapper label="Email" className="sm:col-span-2" required>
							<TextInput
								onChange={updateField("email")}
								value={formData.email}
								disabled={isLoading}
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								placeholder="ex. jean.dupont@email.fr"
							/>
						</InputWrapper>

						<InputWrapper label="Mot de passe" required>
							<TextInput
								onChange={updateField("password")}
								value={formData.password}
								disabled={isLoading}
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								placeholder="Minimum 8 caractères"
							/>
						</InputWrapper>

						<InputWrapper label="Confirmer le mot de passe" required>
							<TextInput
								onChange={updateField("confirmPassword")}
								value={formData.confirmPassword}
								disabled={isLoading}
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								placeholder="Retapez le mot de passe"
							/>
						</InputWrapper>

						<InputWrapper label="Téléphone" required>
							<TextInput
								onChange={updateField("phone")}
								value={formData.phone}
								disabled={isLoading}
								id="phone"
								name="phone"
								type="tel"
								autoComplete="tel"
								placeholder="ex. 06 12 34 56 78"
							/>
						</InputWrapper>

						<InputWrapper label="Entreprise / Établissement" required>
							<TextInput
								onChange={updateField("company")}
								value={formData.company}
								disabled={isLoading}
								id="company"
								name="company"
								type="text"
								autoComplete="organization"
								placeholder="ex. CHU de Rennes"
							/>
						</InputWrapper>

						<InputWrapper label="Poste / Fonction" required>
							<TextInput
								onChange={updateField("position")}
								value={formData.position}
								disabled={isLoading}
								id="position"
								name="position"
								type="text"
								autoComplete="organization-title"
								placeholder="ex. Infirmier(e)"
							/>
						</InputWrapper>

						<InputWrapper label="Adresse" required>
							<TextInput
								onChange={updateField("address")}
								value={formData.address}
								disabled={isLoading}
								id="address"
								name="address"
								type="text"
								autoComplete="street-address"
								placeholder="ex. 21 Rue de la Nation, 35400 Saint-Malo"
							/>
						</InputWrapper>

						<InputWrapper label="Code d'activation" className="sm:col-span-2" required>
							<TextInput
								onChange={updateField("activationCode")}
								value={formData.activationCode}
								disabled={isLoading}
								id="activationCode"
								name="activationCode"
								type="text"
								autoComplete="off"
								placeholder="ex. AB12CD34"
							/>
						</InputWrapper>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className={clsx(
							isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90 hover:shadow-lg",
							"w-full rounded-xl bg-univers px-6 py-4 text-support font-bold shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-univers transition-all duration-200"
						)}
					>
						{!isLoading ? "S'inscrire" : <Spin indicator={<LoadingOutlined spin className="text-xl text-support" />} />}
					</button>
				</form>

				<p className="text-center mt-6 text-univers/60 text-sm">
					Déjà inscrit ?{" "}
					<Link href="/espace-personnel/connexion" className="text-cohesion hover:underline font-semibold">
						Se connecter
					</Link>
				</p>
			</div>
		</div>
	);
}
