import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
	title: "Ipseis",
	description:
		"Ipseis est un organisme de formation spécialisé dans l'accompagnement des professionnels de la santé dans le domaine de la réflexologie et de l'accompagnement des personnes agées.",
	icons: {
		apple: [
			{ url: "/icons/apple-icon-57x57.png", sizes: "57x57" },
			{ url: "/icons/apple-icon-60x60.png", sizes: "60x60" },
			{ url: "/icons/apple-icon-72x72.png", sizes: "72x72" },
			{ url: "/icons/apple-icon-76x76.png", sizes: "76x76" },
			{ url: "/icons/apple-icon-114x114.png", sizes: "114x114" },
			{ url: "/icons/apple-icon-120x120.png", sizes: "120x120" },
			{ url: "/icons/apple-icon-144x144.png", sizes: "144x144" },
			{ url: "/icons/apple-icon-152x152.png", sizes: "152x152" },
			{ url: "/icons/apple-icon-180x180.png", sizes: "180x180" },
		],
		icon: [
			{ url: "/icons/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
			{ url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
	},
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className="font-serif">
			<Analytics />
			<body className="flex flex-col justify-between min-h-screen max-w-screen bg-support overflow-x-hidden">
				<Header />
				<div className="h-[calc(100vh-108px)] bg-univers">{children}</div>
				{/* <Footer /> */}
			</body>
		</html>
	);
}
