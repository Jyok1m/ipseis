"use client";

import React, { useState } from "react";
import { forgotPassword } from "@/lib/authApi";
import { notification, ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";

type NotificationType = "success" | "error";

export default function ForgotPasswordForm() {
	const [api, contextHolder] = notification.useNotification();

	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

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

		if (!email) {
			openNotification("error", "Erreur", "Veuillez saisir votre adresse email.");
			setIsLoading(false);
			return;
		}

		try {
			await forgotPassword(email);
			setSubmitted(true);
		} catch (error: any) {
			const message = error.response?.data?.error || "Erreur serveur. Veuillez réessayer.";
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
					<h1 className="text-2xl sm:text-3xl font-bold text-univers">Mot de passe oublié</h1>
					<p className="text-univers/60 mt-2">Réinitialisez votre mot de passe</p>
				</div>

				{submitted ? (
					<div className="text-center space-y-4">
						<div className="bg-maitrise/10 border-2 border-maitrise/30 rounded-xl p-6">
							<CheckCircleIcon className="h-12 w-12 text-maitrise mx-auto mb-4" />
							<p className="text-univers font-medium">
								Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation dans quelques instants.
							</p>
							<p className="text-univers/60 text-sm mt-3">Pensez à vérifier vos spams.</p>
						</div>
						<Link href="/espace-personnel/connexion" className="inline-block text-cohesion hover:underline font-semibold text-sm mt-4">
							Retour à la connexion
						</Link>
					</div>
				) : (
					<>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="email" className="text-base sm:text-lg leading-7 text-univers font-bold mb-1 block">
									Email<span className="text-cohesion ml-1">*</span>
								</label>
								<div className="mt-2">
									<input
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										disabled={isLoading}
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										placeholder="ex. jean.dupont@email.fr"
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
								{!isLoading ? "Envoyer le lien" : <Spin indicator={<LoadingOutlined spin className="text-xl text-support" />} />}
							</button>
						</form>

						<p className="text-center mt-6 text-univers/60 text-sm">
							<Link href="/espace-personnel/connexion" className="text-cohesion hover:underline font-semibold">
								Retour à la connexion
							</Link>
						</p>
					</>
				)}
			</div>
		</div>
	);
}
