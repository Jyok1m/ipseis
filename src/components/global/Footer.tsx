import React from "react";
import { HeartIcon } from "@heroicons/react/20/solid";

const Footer = () => {
	return (
		<div className="mx-auto px-6 lg:px-8 w-screen">
			<footer aria-labelledby="footer-heading" className="relative border-t border-gray-900/10 py-5 mt-32 sm:mt-16 sm:py-10">
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-x-1">
					<span className="flex items-center gap-x-1">
						<p className="text-xs sm:text-sm">Créé avec </p>
						<HeartIcon className="h-[14px]" />
					</span>

					<p className="text-xs text-sm"> par Joachim Jasmin et Titouan Gignouard pour Ipseis</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
