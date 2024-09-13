"use client";

import React, { useState } from "react";
import Image from "next/image";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import Notification from "@/components/utils/Notification";

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
		<div className="relative isolate bg-maitrise px-6 lg:px-8 py-10 w-xl max-w-7xl rounded-3xl">
			<Notification type="success" title="Merci !" message={success} isVisible={success.length > 0} onClose={() => setSuccess("")} />
			<Notification type="error" title="Oh non..." message={error} isVisible={error.length > 0} onClose={() => setError("")} />

			<div className="mx-auto max-w-xl">
				<div className="flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
					<div className="lg:flex-auto">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div>
								<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
									Prénom
								</label>
								<div className="mt-2.5">
									<input
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
										id="first-name"
										name="first-name"
										type="text"
										autoComplete="given-name"
										placeholder="ex. Jean"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
									Nom de famille
								</label>
								<div className="mt-2.5">
									<input
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
										id="last-name"
										name="last-name"
										type="text"
										autoComplete="family-name"
										placeholder="ex. Dupont"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="budget" className="block text-sm font-semibold leading-6 text-gray-900">
									Budget (€)
								</label>
								<div className="mt-2.5">
									<input
										onChange={(e) => setBudget(e.target.value)}
										value={budget}
										id="budget"
										name="budget"
										type="number"
										placeholder="ex. 1500"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
									Email
								</label>
								<div className="mt-2.5">
									<input
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										placeholder="ex. jean.dupont@jeandupont.fr"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
									Message
								</label>
								<div className="mt-2.5">
									<textarea
										onChange={(e) => setMessage(e.target.value)}
										value={message}
										id="message"
										name="message"
										rows={4}
										placeholder="ex. Bonjour, je souhaiterais plus d'informations sur..."
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div className="mt-10">
							<button
								onClick={handleSubmit}
								disabled={isLoading}
								className={`${
									isLoading ? "cursor-not-allowed" : ""
								} block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
							>
								{!isLoading ? <p>Envoyer</p> : <Spin indicator={<LoadingOutlined spin className="text-white" />} />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
