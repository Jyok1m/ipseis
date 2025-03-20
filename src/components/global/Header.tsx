"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const navigation = [
	{ name: "Accueil", href: "/" },
	{ name: "Nos formations", href: "/catalogue" },
	{ name: "Notre organisme", href: "/a-propos" },
];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-univers z-20">
			<nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Ipseis</span>
						<Image src={require("/src/_images/logo/logo_beige.svg")} alt="Logo Ipseis" title="Logo Ipseis" height={45} />
					</Link>
				</div>
				<div className="hidden md:flex md:gap-x-12">
					{navigation.map((item) => (
						<Link key={item.name} href={item.href} className="text-lg font-normal text-support">
							{item.name}
						</Link>
					))}
				</div>
				<div className="flex flex-1 items-center justify-end gap-x-6">
					<Link
						href="/contact"
						className="rounded-md bg-maitrise px-3 py-1 text-md md:text-lg text-support font-normal shadow-sm hover:bg-maitrise/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise"
					>
						<span className="flex items-center gap-x-2">
							<EnvelopeIcon aria-hidden="true" className="size-3 md:size-6" />
							Contact
						</span>
					</Link>
				</div>
				<div className="flex md:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-support"
					>
						<span className="sr-only">Ouvrir le menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
			</nav>

			<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
				<div className="fixed inset-0 z-20" />
				<DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-maitrise px-6 py-6 sm:max-w-sm">
					<div className="flex items-center gap-x-6">
						<Link href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Ipseis</span>
							<Image src={require("/src/_images/logo/logo_beige.svg")} alt="Logo Ipseis" title="Logo Ipseis" height={45} />
						</Link>

						<Link
							href="/contact"
							className="ml-auto rounded-md bg-univers px-3 py-1 text-md md:text-lg font-normal text-support shadow-sm hover:bg-univers/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							<span className="flex items-center gap-x-2">
								<EnvelopeIcon aria-hidden="true" className="size-3 md:size-6" />
								Contact
							</span>
						</Link>
						<button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-univers">
							<span className="sr-only">Fermer le menu</span>
							<XMarkIcon aria-hidden="true" className="size-6" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										onClick={() => setMobileMenuOpen(false)}
										className="-mx-3 block rounded-lg px-3 py-2 text-md font-semibold text-univers hover:bg-support"
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default Header;
