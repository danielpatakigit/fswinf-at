/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "ui-sans-serif"],
			header: ["Bitter"],
		},
		extend: {
			colors: {
				slate: {
					925: "#0d1822",
				},
				winfbaige: {
					100: "hsl(47, 100%, 100%)",
					200: "hsl(47, 100%, 99%)",
					300: "hsl(47, 100%, 98%)",
					400: "hsl(47, 100%, 97%)",
					500: "hsl(47, 100%, 96%)", // Original value
					600: "hsl(47, 100%, 80%)",
					700: "hsl(47, 100%, 75%)",
					800: "hsl(47, 100%, 70%)",
					900: "hsl(47, 100%, 65%)",
				},
				winfgreen: {
					100: "hsl(99, 41%, 70%)",
					200: "hsl(99, 41%, 63%)",
					300: "hsl(99, 41%, 56%)",
					400: "hsl(99, 41%, 60%)",
					500: "hsl(99, 41%, 57%)", // Original value
					600: "hsl(99, 41%, 45%)",
					700: "hsl(99, 41%, 40%)",
					800: "hsl(99, 41%, 35%)",
					900: "hsl(99, 41%, 30%)",
				},
				winfblue: {
					100: "hsl(201, 73%, 70%)",
					200: "hsl(201, 73%, 65%)",
					300: "hsl(201, 73%, 60%)",
					400: "hsl(201, 73%, 62%)",
					500: "hsl(201, 73%, 59%)", // Original value
					600: "hsl(201, 73%, 47%)",
					700: "hsl(201, 73%, 42%)",
					800: "hsl(201, 73%, 37%)",
					900: "hsl(201, 73%, 32%)",
				},
			},
		},
	},
};

export default config;
