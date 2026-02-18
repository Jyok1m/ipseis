"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem("cookie-consent")) {
			setVisible(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("cookie-consent", "true");
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-univers/10 bg-support shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
			<div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
				<p className="text-sm text-univers/80 text-center sm:text-left">
					Ce site utilise des cookies essentiels pour le fonctionnement du service.{" "}
					<Link href="/politique-de-confidentialite" className="text-cohesion hover:underline font-medium">
						En savoir plus
					</Link>
				</p>
				<button
					onClick={handleAccept}
					className="shrink-0 rounded-lg bg-univers px-6 py-2.5 text-sm font-bold text-support shadow-sm hover:bg-univers/90 transition-colors duration-200 cursor-pointer"
				>
					Accepter
				</button>
			</div>
		</div>
	);
}
