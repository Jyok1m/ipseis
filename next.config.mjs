/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
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
	webpack: (config) => {
		// react-pdf / pdfjs-dist uses canvas for Node SSR — ignore it in browser builds
		config.resolve.alias.canvas = false;
		return config;
	},
};

export default nextConfig;
