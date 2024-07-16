import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";

export default function FormationPage() {
	return (
		<div className="bg-white px-6 py-8">
			<div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Introduction à la réflexologie</h1>
				<p className="mt-6 text-xl leading-8">
					Cette formation vous permettra de découvrir les bases de la réflexologie et de vous initier à cette pratique. Vous apprendrez à soulager les
					maux du quotidien et à accompagner vos patients dans leur bien-être.
				</p>
				<div className="mt-10 max-w-2xl">
					<p>
						Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
						praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim
						sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
					</p>
					<ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
						<li className="flex gap-x-3">
							<CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
							<span>
								<strong className="font-semibold text-gray-900">Data types.</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
								impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
							</span>
						</li>
						<li className="flex gap-x-3">
							<CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
							<span>
								<strong className="font-semibold text-gray-900">Loops.</strong> Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
								cupidatat commodo.
							</span>
						</li>
						<li className="flex gap-x-3">
							<CheckCircleIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
							<span>
								<strong className="font-semibold text-gray-900">Events.</strong> Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
								magna sit morbi lobortis.
							</span>
						</li>
					</ul>
					<p className="mt-8">
						Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam
						tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel
						integer orci.
					</p>
					<h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">From beginner to expert in 3 hours</h2>
					<p className="mt-6">
						Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
						mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
						Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.
					</p>
					<p className="mt-10">
						Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
						praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
					</p>
				</div>
				<figure className="mt-16">
					<Image
						alt=""
						src="/formation-images/formation-1-image.jpg"
						className="aspect-video rounded-xl bg-gray-50 object-cover"
						width={1310}
						height={873}
					/>
					<figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
						<InformationCircleIcon aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-gray-300" />
						Faucibus commodo massa rhoncus, volutpat.
					</figcaption>
				</figure>
				<div className="mt-16 max-w-2xl">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">Everything you need to get up and running</h2>
					<p className="mt-6">
						Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
						cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis
						auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.
					</p>
					<p className="mt-8">
						Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
						praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
					</p>
				</div>
			</div>
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<Link
					href="/contact"
					className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Nous contacter
				</Link>
			</div>
		</div>
	);
}
