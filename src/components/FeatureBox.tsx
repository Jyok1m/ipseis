export function FeatureBox({
	title,
	description,
	bgColor,
	className,
	centered,
}: {
	title?: string;
	description: React.ReactNode;
	bgColor: "support" | "maitrise";
	className?: string;
	centered?: boolean;
}) {
	return (
		<div
			className={`p-4 bg-${bgColor} rounded-3xl shadow-lg border-[1px] border-maitrise text-${
				bgColor === "support" ? "maitrise" : "support"
			} h-full text-center flex flex-col justify-center ${className || ""}`}
		>
			{title && <p className="mt-2 text-lg sm:text-xl font-bold tracking-tight items-center">{title}</p>}
			<span className={`mt-2 text-base sm:text-lg ${centered ? "text-center" : "text-left"}`}>{description}</span>
		</div>
	);
}
