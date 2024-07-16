import React from "react";
import { HeartIcon } from "@heroicons/react/20/solid";

const Footer = () => {
	return (
		<div className="mx-auto mt-12 px-6 lg:px-8 w-full">
			<footer aria-labelledby="footer-heading" className="relative border-t border-gray-900/10 py-5 sm:mt-32 sm:py-10">
				<h2 id="footer-heading" className="sr-only">
					Footer
				</h2>
				<div className="flex items-center justify-center gap-x-2">
					<p>Créé avec </p>
					<HeartIcon className="h-5" />
					<p> par Joachim Jasmin pour Ipseis</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
