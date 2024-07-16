type SectionTitleProps = {
	tag: string;
	title: string;
	description: string;
};

import React from "react";

const SectionTitle = ({ tag, title, description }: SectionTitleProps) => {
	return (
		<div className="mx-auto max-w-2xl text-center mb-16">
			<h2 className="text-base font-semibold leading-7 text-indigo-600">{tag}</h2>
			<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</p>
			<p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
		</div>
	);
};

export default SectionTitle;
