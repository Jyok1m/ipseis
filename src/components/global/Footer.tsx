import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
	return (
		<div className="mx-auto px-6 lg:px-8 w-screen">
			<footer aria-labelledby="footer-heading" className="relative border-t border-gray-900/10 py-6 lg:py-8">
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-x-1 text-xs sm:text-sm">
					<span className="flex items-center gap-x-1">
						<p>Créé avec </p>
						<FontAwesomeIcon icon={faHeart} className="h-3 sm:h-[14px] text-cohesion" />
					</span>

					<p> par Joachim Jasmin et Titouan Gignouard pour Ipseis</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
