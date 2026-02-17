type TitlePageProps = {
	title: string;
	descriptionNode?: React.ReactNode;
	centered?: boolean;
	paddingHorizontal?: boolean;
	paddingBottom?: boolean;
};

const TitlePage = ({ title, descriptionNode, centered = true, paddingHorizontal = true, paddingBottom = true }: TitlePageProps) => {
	return (
		<div className={`mx-auto max-w-7xl ${paddingHorizontal ? "px-6 lg:px-8" : ""} ${paddingBottom ? "pb-10" : "pb-0"} pt-10`}>
			<div className={`text-2xl sm:text-4xl tracking-wider text-univers ${centered ? "text-center" : ""}`}>
				<h1 className="mt-2 font-bold tracking-wider uppercase">{title}</h1>
				<span className="mt-6 leading-6 text-base sm:text-lg font-bold">{descriptionNode}</span>
			</div>
		</div>
	);
};

export default TitlePage;
