/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
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
		NODEMAILER_EMAIL_TO: process.env.NODEMAILER_EMAIL_TO,
		BACKEND_URL: process.env.BACKEND_URL,
	},
};

export default nextConfig;
