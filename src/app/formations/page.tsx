import SectionTitle from "@/components/global/SectionTitle";
import FormationCard from "@/components/formations/FormationCard";

const formations = [
	{
		id: 1,
		title: "Introduction à la réflexologie",
		href: "/formations",
		description:
			"Cette formation vous permettra de découvrir les bases de la réflexologie et de vous initier à cette pratique. Vous apprendrez à soulager les maux du quotidien et à accompagner vos patients dans leur bien-être.",
		uri: "/images/foot-massage-image.jpg",
	},
];

export default function Formations() {
	return (
		<div className="bg-white py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<SectionTitle
					title="Nos formations"
					description="Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In
							mi viverra elit nunc."
				/>
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{formations.map((formation, index: number) => (
						<FormationCard key={index} {...formation} />
					))}
				</div>
			</div>
		</div>
	);
}
