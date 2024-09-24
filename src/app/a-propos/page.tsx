"use client";

import React from "react";
import Image from "next/image";

// import { type Metadata } from "next";

// export const metadata: Metadata = {
// 	title: "About",
// 	description: "I’m Spencer Sharp. I live in New York City, where I design the future.",
// };

export default function APropos() {
	return (
		<div className="bg-support py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
					<div className="lg:pl-20">
						<div className="max-w-xs px-2.5 lg:max-w-none">
							<Image
								src="/images/about-image.jpg"
								alt="Photo d'une femme en train de masser le pied d'une autre femme"
								sizes="(min-width: 1024px) 32rem, 20rem"
								width={1024}
								height={2048}
								className="rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
							/>
						</div>
					</div>
					<div className="lg:order-first lg:row-span-2">
						<div className="text-5xl font-bold tracking-wider text-univers py-5">
							<h1>
								<span className="text-cohesion">Ipseis</span> a été fondé dans le but de <span className="text-cohesion">former</span> les aidants de{" "}
								<span className="text-cohesion">demain</span>.
							</h1>
							<div className="border border-cohesion w-12 my-8"></div>
						</div>
						<div className="mt-6 space-y-7 text-xl text-zinc-600">
							<p>
								I’ve loved making things for as long as I can remember, and wrote my first program when I was 6 years old, just two weeks after my mom
								brought home the brand new Macintosh LC 550 that I taught myself to type on.
							</p>
							<p>
								The only thing I loved more than computers as a kid was space. When I was 8, I climbed the 40-foot oak tree at the back of our yard
								while wearing my older sister’s motorcycle helmet, counted down from three, and jumped — hoping the tree was tall enough that with
								just a bit of momentum I’d be able to get to orbit.
							</p>
							<p>
								I spent the next few summers indoors working on a rocket design, while I recovered from the multiple surgeries it took to fix my badly
								broken legs. It took nine iterations, but when I was 15 I sent my dad’s Blackberry into orbit and was able to transmit a photo back
								down to our family computer from space.
							</p>
							<p>
								Today, I’m the founder of Planetaria, where we’re working on civilian space suits and manned shuttle kits you can assemble at home so
								that the next generation of kids really <em>can</em> make it to orbit — from the comfort of their own backyards.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
