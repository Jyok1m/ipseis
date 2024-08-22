import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
	title: "Ipseis",
	description:
		"Ipseis est un organisme de formation spécialisé dans l'accompagnement des professionnels de la santé dans le domaine de la réflexologie et de l'accompagnement des personnes agées.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className="font-serif">
			<body className="flex flex-col justify-between min-h-screen">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
