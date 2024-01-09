/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				slate: {
					925: "#0d1822",
				},
			},
		},
	},
};

export default config;
