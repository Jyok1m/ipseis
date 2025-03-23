"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import Notification from "@/components/utils/Notification";

const InputWrapper = ({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) => (
	<div className={className}>
		<label htmlFor={label} className="text-base sm:text-lg leading-6 text-support font-semibold">
			{label}
		</label>
		<div className="mt-2.5">{children}</div>
	</div>
);

const TextInput = ({ onChange, value, id, name, type, autoComplete, placeholder }: any) => (
	<input
		onChange={onChange}
		value={value}
		id={id}
		name={name}
		type={type}
		autoComplete={autoComplete}
		placeholder={placeholder}
		className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm placeholder:text-univers placeholder:opacity-30 text-sm sm:text-base"
	/>
);

const TextAreaInput = ({ onChange, value, id, name, rows, placeholder }: any) => (
	<textarea
		onChange={onChange}
		value={value}
		id={id}
		name={name}
		rows={rows}
		placeholder={placeholder}
		className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm placeholder:text-univers placeholder:opacity-30 text-sm sm:text-base"
	/>
);

export default function ContactForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [budget, setBudget] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async () => {
		setIsLoading(true);

		const payload = { firstName, lastName, budget, email, message };

		if (Object.values(payload).some((value) => value.length === 0)) {
			setError("Veuillez remplir tous les champs.");
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch("/api/message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...payload }),
			});

			const data = await res.json();

			if (res.ok) {
				setSuccess(data.message);
				setFirstName("");
				setLastName("");
				setBudget("");
				setEmail("");
				setMessage("");
			} else {
				setError(data.error);
			}
		} catch (error: any) {
			window.alert(error.message);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative isolate bg-maitrise px-10 py-10 w-full lg:max-w-4xl rounded-2xl">
			<Notification type="success" title="Merci !" message={success} isVisible={success.length > 0} onClose={() => setSuccess("")} />
			<Notification type="error" title="Oh non..." message={error} isVisible={error.length > 0} onClose={() => setError("")} />

			<div className="mx-auto max-w-xl">
				<div className="flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
					<div className="lg:flex-auto">
						<div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
							<InputWrapper label="Prénom">
								<TextInput
									onChange={(e: any) => setFirstName(e.target.value)}
									value={firstName}
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
									id="last-name"
									name="last-name"
									type="text"
									autoComplete="family-name"
									placeholder="ex. Dupont"
								/>
							</InputWrapper>
							<InputWrapper label="Budget (€)">
								<TextInput
									onChange={(e: any) => setBudget(e.target.value)}
									value={budget}
									id="budget"
									name="budget"
									type="number"
									placeholder="ex. 1500"
								/>
							</InputWrapper>
							<InputWrapper label="Email">
								<TextInput
									onChange={(e: any) => setEmail(e.target.value)}
									value={email}
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
									id="message"
									name="message"
									rows={4}
									placeholder="ex. Bonjour, je souhaiterais plus d'informations sur..."
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-univers text-xs sm:text-base sm:leading-6"
								/>
							</InputWrapper>
						</div>
						<div className="mt-10">
							<button
								onClick={() => handleSubmit()}
								disabled={isLoading}
								className={clsx(
									isLoading ? "cursor-not-allowed" : "cursor-pointer",
									"w-full rounded-md bg-univers px-3 py-2 sm:py-3 text-base md:text-lg text-support font-normal shadow-sm hover:bg-univers/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-univers"
								)}
							>
								<span className="flex justify-center text-support">
									{!isLoading ? <p className="text">Envoyer</p> : <Spin indicator={<LoadingOutlined spin />} />}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
