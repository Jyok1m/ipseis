type TitleSectionProps = {
	tag?: string;
	title: string;
	description: string;
};

const TitleSection = ({ tag, title, description }: TitleSectionProps) => {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10 tracking-wider">
			<div className="text-2xl sm:text-4xl tracking-wider text-univers">
				{tag && <h2 className="text-base font-semibold leading-6 text-cohesion mb-3">{tag}</h2>}
				<p className="text-2xl sm:text-4xl tracking-wider font-semibold text-univers">{title}</p>
				<p className="mt-6 leading-6 text-base sm:text-xl">{description}</p>
			</div>
		</div>
	);
};

export default TitleSection;
