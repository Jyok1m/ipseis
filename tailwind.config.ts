import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				"serif-expanded": ["Halibut_Expanded", "serif"],
				serif: ["Halibut", "serif"],
				sans: ["DM_Sans", "sans-serif"],
			},
			colors: {
				univers: "#263C27",
				cohesion: "#FF4E00",
				maitrise: "#6F9271",
				support: "#FFFCE8",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
export default config;
