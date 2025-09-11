import type { Metadata } from "next";
import Footer from "@/components/global/Footer";
import { buildMetadata } from "@/components/utils/seo";
import TrainingClient from "./_components/TrainingClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const id = params.id;
	return buildMetadata({
		title: "Formation professionnelle - IPSEIS",
		description: "Détails d'une formation IPSEIS : objectifs pédagogiques, programme, méthodes et modalités.",
		path: `/catalogue/formation/${id}`,
	});
}

export default function FormationPage({ params }: { params: { id: string } }) {
	return (
		<>
			<TrainingClient id={params.id} />
			<Footer />
		</>
	);
}
