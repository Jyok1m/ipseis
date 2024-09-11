import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
	title: "Ipseis",
	description:
		"Ipseis est un organisme de formation spécialisé dans l'accompagnement des professionnels de la santé dans le domaine de la réflexologie et de l'accompagnement des personnes agées.",
	icons: {
		apple: [
			{ url: "/apple-icon-57x57.png", sizes: "57x57" },
			{ url: "/apple-icon-60x60.png", sizes: "60x60" },
			{ url: "/apple-icon-72x72.png", sizes: "72x72" },
			{ url: "/apple-icon-76x76.png", sizes: "76x76" },
			{ url: "/apple-icon-114x114.png", sizes: "114x114" },
			{ url: "/apple-icon-120x120.png", sizes: "120x120" },
			{ url: "/apple-icon-144x144.png", sizes: "144x144" },
			{ url: "/apple-icon-152x152.png", sizes: "152x152" },
			{ url: "/apple-icon-180x180.png", sizes: "180x180" },
		],
		icon: [
			{ url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
	},
	manifest: "/manifest.json",
	themeColor: "#ffffff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className="font-serif ">
			<body className="flex flex-col justify-between h-screen bg-support">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
