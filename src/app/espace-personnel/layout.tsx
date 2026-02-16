import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Espace Personnel",
	description: "Accédez à votre Espace Personnel IPSEIS.",
	robots: { index: false, follow: false },
};

export default function EspacePersonnelLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<SocketProvider>{children}</SocketProvider>
		</AuthProvider>
	);
}
