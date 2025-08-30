import Image from "next/image";

const Divider = () => {
	return (
		<div className="flex justify-center items-center mx-auto max-w-7xl">
			<Image src={require("../../_images/logo/star_green.svg")} alt="Image de l'élément de séparation 1" width={35} height={35} />
			<Image src={require("../../_images/logo/star_green.svg")} alt="Image de l'élément de séparation 2" width={35} height={35} />
			<Image src={require("../../_images/logo/star_green.svg")} alt="Image de l'élément de séparation 3" width={35} height={35} />
		</div>
	);
};

export default Divider;
