import Image from "next/image";

export function StarBulletPoint({
	dataNode,
	isWhite,
	starColor = "orange",
}: {
	dataNode: React.ReactNode;
	isWhite?: boolean;
	starColor?: "orange" | "beige" | "green";
}) {
	return (
		<div className={`relative pl-10 text-base sm:text-lg tracking-wider leading-6 ${isWhite ? "text-support" : "text-univers"}`}>
			<span className="absolute left-0 -top-[6px]">
				<Image
					src={require(`@/_images/logo/star_${starColor}.svg`)}
					alt="Check"
					width={40}
					height={40}
					className="w-10 h-10 flex-shrink-0 object-contain align-top"
				/>
			</span>
			{dataNode}
		</div>
	);
}
