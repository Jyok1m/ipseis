"use client";

import React, { useState } from "react";
import Button from "@/components/global/Button";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Modal, ConfigProvider, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";

const navigation = [
	{ name: "Nous connaître", href: "/a-propos", ready: true },
	{ name: "Pédagogie", href: "/pedagogie", ready: true },
	{ name: "Secteur santé", href: "/secteur-sante", ready: true },
	{ name: "Autres secteurs", href: "/", ready: false },
];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);

	return (
		<header className="bg-univers z-20 w-screen">
			{/* Desktop */}

			<nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Ipseis</span>
						<Image src={require("/src/_images/logo/logo_beige.svg")} alt="Logo Ipseis" title="Logo Ipseis" height={60} />
					</Link>
				</div>
				<div className="hidden md:flex md:gap-x-12">
					{navigation.map((item) =>
						item.ready ? (
							<Link key={item.name} href={item.href} className="text-lg font-normal text-support hover:underline hover:underline-offset-8">
								{item.name}
							</Link>
						) : (
							<button
								key={item.name}
								onClick={() => setShowModal(true)}
								className="text-lg font-normal text-support hover:underline hover:underline-offset-8"
							>
								{item.name}
							</button>
						)
					)}
				</div>
				<div className="flex flex-1 items-center justify-end gap-x-6">
					<Link
						href="/contact"
						className="rounded-md bg-maitrise px-3 py-1 text-base md:text-lg text-support font-normal shadow-sm hover:bg-maitrise/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise"
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

			{/* Mobile */}

			<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
				<div className="fixed inset-0 z-20" />
				<DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-maitrise px-6 py-6 sm:max-w-sm">
					<div className="flex items-center gap-x-6">
						<Link href="/" className="-m-1.5 p-1.5" tabIndex={-1}>
							<span className="sr-only">Ipseis</span>
							<Image src={require("/src/_images/logo/logo_beige.svg")} alt="Logo Ipseis" title="Logo Ipseis" height={60} />
						</Link>

						<Link
							href="/contact"
							onClick={() => setMobileMenuOpen(false)}
							className="ml-auto rounded-md bg-univers px-3 py-1 text-base md:text-lg font-normal text-support shadow-sm hover:bg-univers/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
								{navigation.map((item) =>
									item.ready ? (
										<Link
											key={item.name}
											href={item.href}
											onClick={() => setMobileMenuOpen(false)}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-univers hover:bg-support"
										>
											{item.name}
										</Link>
									) : (
										<button
											key={item.name}
											onClick={() => setShowModal(true)}
											className="-ml-3 rounded-lg px-3 py-2 text-base font-semibold text-univers hover:bg-support w-full flex"
										>
											{item.name}
										</button>
									)
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>

			{/* Modal */}

			<ConfigProvider
				theme={{
					components: {
						Modal: {
							titleFontSize: 18,
							titleColor: "#263c27",
							headerBg: "#fffce8",
							contentBg: "#fffce8",
						},
					},
					token: {
						fontFamily: "Halibut",
					},
				}}
			>
				<Modal
					title={<p className="text-lg sm:text-xl font-bold tracking-wider text-univers">Un peu de patience...</p>}
					centered
					open={showModal}
					footer={null}
					width={600}
					onCancel={() => setShowModal(false)}
				>
					<p className="text-base sm:text-lg text-univers">Cette page sera bientôt disponible !</p>
				</Modal>
			</ConfigProvider>
		</header>
	);
};

export default Header;
