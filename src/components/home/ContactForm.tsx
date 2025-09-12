"use client";

import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckCircleIcon, XCircleIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Spin, notification, ConfigProvider } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";

const InputWrapper = ({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) => (
	<div className={className}>
		<label htmlFor={label} className="text-lg sm:text-xl leading-7 text-support font-bold mb-1 block">
			{label}
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

const TextAreaInput = ({ onChange, value, id, name, rows, placeholder, disabled }: any) => (
	<textarea
		onChange={onChange}
		value={value}
		disabled={disabled}
		id={id}
		name={name}
		rows={rows}
		placeholder={placeholder}
		className="block w-full rounded-lg px-4 py-3 text-univers bg-white border-2 border-support/20 focus:border-cohesion focus:ring-2 focus:ring-cohesion/20 shadow-sm placeholder:text-univers/50 text-base sm:text-lg font-medium transition-all duration-200 resize-vertical"
	/>
);

export default function ContactForm() {
	const [api, contextHolder] = notification.useNotification();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

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

		const payload = { firstName, lastName, email, message };

		if (Object.values(payload).some((value) => value.length === 0)) {
			openNotification("error", "Zut...", "Veuillez remplir tous les champs.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/new`, payload);

			if (response.status === 200) {
				openNotification("success", "Merci !", response.data.message);
				setFirstName("");
				setLastName("");
				setEmail("");
				setMessage("");
			} else {
				openNotification("error", "Zut...", response.data.error);
			}
		} catch (error: any) {
			openNotification("error", "Oops...", error.message);
			setIsLoading(false);
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
						<ChatBubbleLeftRightIcon className="h-7 w-7 sm:h-8 sm:w-8 text-support mt-1 flex-shrink-0" />
						<div>
							<h3 className="text-support font-bold mb-3 text-lg sm:text-xl">Contactez-nous directement</h3>
							<p className="text-support/90 text-base sm:text-lg leading-relaxed font-medium">
								Une question sur nos formations ? Besoin d'un devis personnalisé ? Notre équipe vous répond dans les plus brefs délais.
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
					<div className="lg:flex-auto">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-8 sm:grid-cols-2">
							<InputWrapper label="Prénom">
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
							<InputWrapper label="Nom de famille">
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
							<InputWrapper label="Email" className="col-span-full sm:col-span-2">
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
							<InputWrapper label="Message" className="col-span-full sm:col-span-2">
								<TextAreaInput
									onChange={(e: any) => setMessage(e.target.value)}
									value={message}
									disabled={isLoading}
									id="message"
									name="message"
									rows={5}
									placeholder="ex. Bonjour, je souhaiterais plus d'informations sur vos formations..."
								/>
							</InputWrapper>
						</div>

						{/* RGPD Notice */}
						<div className="mt-8 p-4 sm:p-5 bg-support/10 border-2 border-support/15 rounded-lg">
							<p className="text-support/80 text-sm sm:text-base leading-relaxed font-medium">
								En soumettant ce formulaire, vous acceptez que vos données personnelles soient utilisées pour traiter votre demande et vous
								recontacter. Vos données sont traitées conformément à notre{" "}
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
											<ChatBubbleLeftRightIcon className="h-6 w-6 sm:h-7 sm:w-7" />
											<span className="font-bold">Envoyer le message</span>
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
