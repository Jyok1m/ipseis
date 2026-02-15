"use client";

import React, { useState } from "react";
import { resetPassword } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import { notification, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

type NotificationType = "success" | "error";

export default function ResetPasswordForm({ token }: { token: string }) {
	const [api, contextHolder] = notification.useNotification();
	const router = useRouter();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
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

		if (!password || !confirmPassword) {
			openNotification("error", "Erreur", "Veuillez remplir tous les champs.");
			setIsLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			openNotification("error", "Erreur", "Les mots de passe ne correspondent pas.");
			setIsLoading(false);
			return;
		}

		if (password.length < 8) {
			openNotification("error", "Erreur", "Le mot de passe doit contenir au moins 8 caractères.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await resetPassword(token, password, confirmPassword);
			openNotification("success", "Succès", response.data.message);
			setTimeout(() => router.push("/espace-personnel/connexion"), 2000);
		} catch (error: any) {
			const message = error.response?.data?.error || "Erreur lors de la réinitialisation.";
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
					<h1 className="text-2xl sm:text-3xl font-bold text-univers">Nouveau mot de passe</h1>
					<p className="text-univers/60 mt-2">Définissez votre nouveau mot de passe</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="password" className="text-base sm:text-lg leading-7 text-univers font-bold mb-1 block">
							Nouveau mot de passe<span className="text-cohesion ml-1">*</span>
						</label>
						<div className="mt-2">
							<input
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								disabled={isLoading}
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								placeholder="Minimum 8 caractères"
								className="block w-full rounded-lg px-4 py-3 text-univers bg-white border-2 border-univers/20 focus:border-cohesion focus:ring-2 focus:ring-cohesion/20 shadow-sm placeholder:text-univers/50 text-base font-medium transition-all duration-200"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="confirmPassword" className="text-base sm:text-lg leading-7 text-univers font-bold mb-1 block">
							Confirmer le mot de passe<span className="text-cohesion ml-1">*</span>
						</label>
						<div className="mt-2">
							<input
								onChange={(e) => setConfirmPassword(e.target.value)}
								value={confirmPassword}
								disabled={isLoading}
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								placeholder="Retapez le mot de passe"
								className="block w-full rounded-lg px-4 py-3 text-univers bg-white border-2 border-univers/20 focus:border-cohesion focus:ring-2 focus:ring-cohesion/20 shadow-sm placeholder:text-univers/50 text-base font-medium transition-all duration-200"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className={clsx(
							isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-univers/90 hover:shadow-lg",
							"w-full rounded-xl bg-univers px-6 py-4 text-support font-bold shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-univers transition-all duration-200"
						)}
					>
						{!isLoading ? "Réinitialiser" : <Spin indicator={<LoadingOutlined spin className="text-xl text-support" />} />}
					</button>
				</form>

				<p className="text-center mt-6 text-univers/60 text-sm">
					<Link href="/espace-personnel/connexion" className="text-cohesion hover:underline font-semibold">
						Retour à la connexion
					</Link>
				</p>
			</div>
		</div>
	);
}
