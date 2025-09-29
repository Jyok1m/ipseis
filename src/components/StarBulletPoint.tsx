import Image from "next/image";
import starOrange from "@/_images/logo/star_orange.svg";
import starBeige from "@/_images/logo/star_beige.svg";
import starGreen from "@/_images/logo/star_green.svg";

export function StarBulletPoint({
	dataNode,
	isWhite,
	starColor = "orange",
}: {
	dataNode: React.ReactNode;
	isWhite?: boolean;
	starColor?: "orange" | "beige" | "green";
}) {
	const getStarImage = () => {
		switch (starColor) {
			case "orange":
				return starOrange;
			case "beige":
				return starBeige;
			case "green":
				return starGreen;
			default:
				return starOrange;
		}
	};

	return (
		<div className={`relative pl-10 text-base sm:text-lg tracking-wider leading-6 ${isWhite ? "text-support" : "text-univers"}`}>
			<span className="absolute left-0 -top-[6px]">
				<Image src={getStarImage()} alt="Check" width={40} height={40} className="w-10 h-10 flex-shrink-0 object-contain align-top" />
			</span>
			{dataNode}
		</div>
	);
}
