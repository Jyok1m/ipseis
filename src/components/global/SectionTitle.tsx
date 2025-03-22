type SectionTitleProps = {
	tag?: string;
	title: string;
	description: string;
};

const SectionTitle = ({ tag, title, description }: SectionTitleProps) => {
	return (
		<div className="mx-auto max-w-2xl text-center mb-8 text-univers">
			{tag && <h2 className="text-base font-semibold leading-6 text-cohesion">{tag}</h2>}
			<p className="mt-2 text-2xl font-bold tracking-wider sm:text-4xl">{title}</p>
			<p className="mt-6 text-md sm:text-lg leading-6">{description}</p>
		</div>
	);
};

export default SectionTitle;
