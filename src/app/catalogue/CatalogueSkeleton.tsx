import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import starOrange from "@/_images/logo/star_orange.svg";

const SkeletonBubble = ({ index }: { index: number }) => {
	const positions = [
		"col-start-2 row-start-1 justify-self-center w-[130px] sm:w-full",
		"col-start-3 row-start-2 justify-self-center w-[130px] sm:w-full",
		"col-start-2 row-start-3 justify-self-center w-[130px] sm:w-full",
		"col-start-1 row-start-2 justify-self-center w-[130px] sm:w-full",
	];

	return (
		<div
			key={index}
			className={`${
				positions[index % positions.length]
			} flex justify-center items-center aspect-1 ring-2 ring-cohesion/30 cursor-wait rounded-full shadow-2xl p-2 animate-pulse duration-500`}
		>
			<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
				<Spin indicator={<LoadingOutlined spin />} size="large" className="text-cohesion" />
			</div>
		</div>
	);
};

const BubbleContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="grid grid-cols-3 grid-rows-3 gap-2 items-center justify-center max-w-2xl mb-10">{children}</div>
);

export default function CatalogueSkeleton() {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center mt-10">
			<BubbleContainer>
				<div className="col-start-2 row-start-2 flex justify-center items-center w-full">
					<Image
						src={starOrange}
						alt="Logo Ipseis"
						title="Logo Ipseis"
						height={200}
						width={200}
						className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
					/>
				</div>
				{[1, 2, 3, 4].map((_, index) => (
					<SkeletonBubble key={index} index={index} />
				))}
			</BubbleContainer>
		</div>
	);
}
