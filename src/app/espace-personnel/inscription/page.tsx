"use client";

import RegisterForm from "@/components/espace-personnel/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function InscriptionPage() {
	return (
		<div className="min-h-screen bg-support flex flex-col items-center justify-center px-4 py-12">
			<Link href="/" className="mb-8">
				<Image src={require("/src/_images/logo/logo_green.svg")} alt="Logo IPSEIS" height={60} />
			</Link>
			<RegisterForm />
		</div>
	);
}
