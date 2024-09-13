"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
	{ name: "Accueil", href: "/" },
	{ name: "Formations", href: "/formations" },
	{ name: "À propos", href: "/a-propos" },
];

const Header = () => {
	return (
		<header className="inset-x-0 top-0 z-50 bg-univers">
			<nav aria-label="Global" className="flex flex-col items-center justify-center py-2 lg:p-6 gap-y-2 lg:gap-0">
				<div className="block lg:absolute lg:left-6">
					<Link href="/">
						<span className="sr-only">Ipseis</span>
						<Image src={require("/src/_images/logo/logo_beige.svg")} alt="Logo Ipseis" title="Logo Ipseis" height={45} />
					</Link>
				</div>
				<div className="flex gap-x-12 mb-5 lg:mb-0">
					{navigation.map((item) => (
						<Link key={item.name} href={item.href} className="text-md font-normal leading-6 text-support">
							{item.name}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Header;
