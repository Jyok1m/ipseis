import React from "react";
import Link from "next/link";

interface ButtonProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ href, children, className = "" }) => {
	return (
		<Link
			href={href}
			className={`flex flex-col justify-center items-center gap-y-1 rounded-md bg-maitrise px-3 py-2 sm:py-3 text-base sm:text-md sm:text-lg text-support font-normal shadow-sm hover:bg-maitrise/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maitrise ${className}`}
		>
			{children}
		</Link>
	);
};

export default Button;
