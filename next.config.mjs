/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tailwindui.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
	env: {
		NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
		NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
	},
};

export default nextConfig;
