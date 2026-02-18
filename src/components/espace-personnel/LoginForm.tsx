"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { notification, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

type NotificationType = "success" | "error";

const InputWrapper = ({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) => (
	<div>
		<label htmlFor={label} className="text-base sm:text-lg leading-7 text-univers font-bold mb-1 block">
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

export default function LoginForm() {
	const [api, contextHolder] = notification.useNotification();
	const { login } = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		if (!email || !password) {
			openNotification("error", "Erreur", "Veuillez remplir tous les champs.");
			setIsLoading(false);
			return;
		}

		try {
			const user = await login(email, password);
			router.push(`/espace-personnel/${user.role}`);
		} catch (error: any) {
			const message = error.response?.data?.error || "Erreur lors de la connexion.";
			openNotification("error", "Erreur", message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
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
					<h1 className="text-2xl sm:text-3xl font-bold text-univers">Connexion</h1>
					<p className="text-univers/60 mt-2">Accédez à votre Espace Personnel</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<InputWrapper label="Email" required>
						<TextInput
							onChange={(e: any) => setEmail(e.target.value)}
							value={email}
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
							onChange={(e: any) => setPassword(e.target.value)}
							value={password}
							disabled={isLoading}
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							placeholder="Votre mot de passe"
						/>
					</InputWrapper>

					<div className="text-right">
						<Link href="/espace-personnel/mot-de-passe-oublie" className="text-sm text-cohesion hover:underline font-medium">
							Mot de passe oublié ?
						</Link>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className={clsx(
							isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90 hover:shadow-lg",
							"w-full rounded-xl bg-univers px-6 py-4 text-support font-bold shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-univers transition-all duration-200"
						)}
					>
						{!isLoading ? "Se connecter" : <Spin indicator={<LoadingOutlined spin />} size="small" className="text-support" />}
					</button>
				</form>

				<p className="text-center mt-6 text-univers/60 text-sm">
					Pas encore de compte ?{" "}
					<Link href="/espace-personnel/inscription" className="text-cohesion hover:underline font-semibold">
						S'inscrire
					</Link>
				</p>
			</div>
		</div>
	);
}
