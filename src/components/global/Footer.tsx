"use client";

import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
	return (
		<div className="mx-auto w-screen text-sm sm:text-base text-univers">
			<footer
				aria-labelledby="footer-heading"
				className="relative border-t border-gray-900/10 flex flex-col gap-y-2 sm:flex-row items-center justify-evenly py-5"
			>
				<span>
					Site web par{" "}
					<Link href="https://www.linkedin.com/in/joachim-jasmin/" target="_blank" className="font-semibold hover:underline underline-offset-4">
						Joachim Jasmin
					</Link>
				</span>
				<span className="hidden sm:flex sm:justify-center sm:items-center sm:gap-x-2">
					Créé avec <FontAwesomeIcon icon={faHeart} className="h-3 sm:h-[14px] text-cohesion -mb-1" /> pour Ipseis
				</span>
				<span>
					Design par{" "}
					<Link href="https://www.malt.fr/profile/titouanguignouard/" target="_blank" className="font-semibold hover:underline underline-offset-4">
						Titouan Gignouard
					</Link>
				</span>
				<span className="sm:hidden flex justify-center items-center gap-x-2">
					Créé avec <FontAwesomeIcon icon={faHeart} className="h-3 sm:h-[14px] text-cohesion -mb-1" /> pour Ipseis
				</span>
			</footer>
		</div>
	);
};

export default Footer;
