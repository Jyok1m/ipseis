import React from "react";
import Image from "next/image";
import Link from "next/link";

import ContactForm from "@/components/home/ContactForm";

export default function Accueil() {
	return (
		<div className="bg-white">
			<main className="isolate">
				{/* Hero section */}
				<div className="relative pt-14">
					<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
						<div
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
							className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						/>
					</div>
					<div className="py-20">
						<div className="mx-auto max-w-7xl px-6 lg:px-8">
							<div className="mx-auto max-w-2xl text-center">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Des formations adaptées à vos besoins</h1>
								<p className="mt-6 text-lg leading-8 text-gray-600">
									Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
									fugiat aliqua.
								</p>
								<div className="mt-10 flex items-center justify-center gap-x-6">
									<Link
										href="/formations"
										className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Nos formations
									</Link>
									<Link href="/a-propos" className="text-sm font-semibold leading-6 text-gray-900">
										En savoir plus <span aria-hidden="true">→</span>
									</Link>
								</div>
							</div>
							<div className="mt-16 flow-root sm:mt-24">
								<div className="-m-2 rounded-xl bg-gray-900/5 lg:rounded-2xl">
									<Image
										src="/images/home-hero-image.jpg"
										alt="Image de main avec une en train de verser de l'huile de massage dans l'autre"
										width={2432}
										height={1442}
										className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						aria-hidden="true"
						className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					>
						<div
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
							className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						/>
					</div>
				</div>

				{/* Logo cloud */}
				<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20 mt-24">
					<div className="mx-auto max-w-2xl text-center mb-16">
						<h2 className="text-base font-semibold leading-7 text-indigo-600">Une formation humaine</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ils sont satisfaits</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
							mi viverra elit nunc.
						</p>
					</div>

					<div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						<img
							alt="Transistor"
							src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
							width={158}
							height={48}
							className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
						/>
						<img
							alt="Reform"
							src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
							width={158}
							height={48}
							className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
						/>
						<img
							alt="Tuple"
							src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
							width={158}
							height={48}
							className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
						/>
					</div>
				</div>

				{/* Contact form */}
				<div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
					<div className="mx-auto max-w-2xl text-center mb-16">
						<h2 className="text-base font-semibold leading-7 text-indigo-600">100% personnalisé</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Parlons de votre projet</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
							mi viverra elit nunc.
						</p>
					</div>
					<ContactForm />
				</div>
			</main>
		</div>
	);
}
