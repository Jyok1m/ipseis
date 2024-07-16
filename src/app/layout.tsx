import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

const inter = Inter({ subsets: ["latin"] });

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
		<html lang="en">
			<body className={`${inter.className} flex flex-col justify-between min-h-screen`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
