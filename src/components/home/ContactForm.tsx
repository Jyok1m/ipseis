"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [budget, setBudget] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [success, setSuccess] = useState("");

	const handleSubmit = async () => {
		const payload = { firstName, lastName, budget, email, message };

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
				window.alert(data.error);
			}
		} catch (error: any) {
			window.alert(error.message);
		}
	};

	return (
		<div className="relative isolate bg-white px-6 lg:px-8">
			<svg
				aria-hidden="true"
				className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
			>
				<defs>
					<pattern x="50%" y={-64} id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width={200} height={200} patternUnits="userSpaceOnUse">
						<path d="M100 200V.5M.5 .5H200" fill="none" />
					</pattern>
				</defs>
				<svg x="50%" y={-64} className="overflow-visible fill-gray-50">
					<path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z" strokeWidth={0} />
				</svg>
				<rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
			</svg>
			<div className="mx-auto max-w-xl lg:max-w-4xl">
				<div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
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
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="budget" className="block text-sm font-semibold leading-6 text-gray-900">
									Budget
								</label>
								<div className="mt-2.5">
									<input
										onChange={(e) => setBudget(e.target.value)}
										value={budget}
										id="budget"
										name="budget"
										type="text"
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
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div className="mt-10">
							<button
								onClick={handleSubmit}
								className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Envoyer
							</button>
						</div>
					</div>
					<div className="lg:mt-6 lg:w-80 lg:flex-none">
						<Image alt="" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" width={48} height={48} className="h-12 w-auto" />
						<figure className="mt-10">
							<blockquote className="text-lg font-semibold leading-8 text-gray-900">
								<p>
									“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in
									laborum sed rerum et corporis.”
								</p>
							</blockquote>
							<figcaption className="mt-10 flex gap-x-6">
								<Image
									alt=""
									width={48}
									height={48}
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
									className="h-12 w-12 flex-none rounded-full bg-gray-50"
								/>
								<div>
									<div className="text-base font-semibold text-gray-900">Brenna Goyette</div>
									<div className="text-sm leading-6 text-gray-600">CEO of Workcation</div>
								</div>
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</div>
	);
}
