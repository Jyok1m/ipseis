"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";

export default function Catalogue() {
	// const [themes, setThemes] = useState([]);

	// useEffect(() => {
	// 	const fetchThemes = async () => {
	// 		const response = await axios.get(`${process.env.BACKEND_URL}/themes/list`);

	// 		if (response.status === 200) {
	// 			setThemes(response.data);
	// 		}
	// 	};

	// 	fetchThemes();
	// }, []);

	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
				<div className="mx-auto max-w-2xl text-center text-univers mb-16">
					<h1 className="mt-2 text-4xl font-bold tracking-wider sm:text-4xl text-center uppercase">Catalogue de formations</h1>
					{/* <p className="mt-6 text-xl leading-6">
						Découvrez nos secteurs d&apos;activité et explorez les différentes thématiques que nous proposons pour répondre à vos besoins
						professionnels.
					</p> */}
				</div>
				<div className="grid grid-cols-3 grid-rows-3 gap-2 items-center justify-center max-w-xl"></div>
			</div>
		</div>
	);
}
