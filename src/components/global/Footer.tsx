"use client";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
	return (
		<div className="mx-auto w-screen text-sm sm:text-base text-univers">
			<footer
				aria-labelledby="footer-heading"
				className="relative border-t border-gray-900/10 flex flex-col gap-y-2 sm:flex-row items-center justify-evenly py-5"
			>
				<span>Site web par Joachim Jasmin</span>
				<span className="hidden sm:block">
					Créé avec <FontAwesomeIcon icon={faHeart} className="h-3 sm:h-[14px] text-cohesion" /> pour Ipseis
				</span>
				<span>Design par Titouan Gignouard</span>
				<span className="block sm:hidden">
					Créé avec <FontAwesomeIcon icon={faHeart} className="h-3 sm:h-[14px] text-cohesion" /> pour Ipseis
				</span>
			</footer>
		</div>
	);
};

export default Footer;
