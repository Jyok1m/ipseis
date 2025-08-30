import Image from "next/image";

type TitleSectionProps = {
	centered?: boolean;
	tag?: string;
	title: string;
	description: string;
};

const TitleSection = ({ centered, tag, title, description }: TitleSectionProps) => {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 tracking-wider">
			<div className={`text-2xl sm:text-4xl tracking-wider text-univers ${centered ? "text-center" : ""}`}>
				{tag && (
					<div className="flex items-center mb-3 text-base sm:text-xl font-semibold leading-6 text-cohesion">
						<Image
							src={require("../../_images/logo/star_orange.svg")}
							alt="Image de l'élément de tag"
							width={64}
							height={64}
							className="-ml-4 w-16 aspect-square"
						/>
						<h2>{tag}</h2>
					</div>
				)}
				<p className="text-2xl sm:text-4xl tracking-wider font-semibold text-univers">{title}</p>
				<p className="mt-6 leading-6 text-base sm:text-xl">{description}</p>
			</div>
		</div>
	);
};

export default TitleSection;
