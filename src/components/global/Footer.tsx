import React from "react";
import { HeartIcon } from "@heroicons/react/20/solid";

const Footer = () => {
	return (
		<div className="mx-auto px-6 lg:px-8 w-full">
			<footer aria-labelledby="footer-heading" className="relative border-t border-gray-900/10 py-5 mt-32 sm:mt-16 sm:py-10">
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="flex items-center justify-center gap-x-1">
					<p className="text-sm">Créé avec </p>
					<HeartIcon className="h-[14px]" />
					<p className="text-sm"> par Joachim Jasmin et Titouan Gignouard pour Ipseis</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
