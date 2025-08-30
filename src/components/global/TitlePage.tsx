type TitlePageProps = {
	title: string;
	descriptionNode: React.ReactNode;
};

const TitlePage = ({ title, descriptionNode }: TitlePageProps) => {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
			<div className="text-2xl sm:text-4xl tracking-wider text-univers text-center">
				<h1 className="mt-2 font-bold tracking-wider uppercase">{title}</h1>
				<p className="mt-6 leading-6 text-base sm:text-xl">{descriptionNode}</p>
			</div>
		</div>
	);
};

export default TitlePage;
