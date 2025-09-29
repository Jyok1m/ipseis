"use client"

type FeaturedCompanyLogoProps = {
	title: string;
	alt: string;
	src: string;
};

import React from "react";
import Image from "next/image";

const FeaturedCompanyLogo = (props: FeaturedCompanyLogoProps) => {
	return (
		<Image
			title={props.title}
			alt={props.alt}
			src={props.src}
			width={158}
			height={48}
			className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
		/>
	);
};

export default FeaturedCompanyLogo;
