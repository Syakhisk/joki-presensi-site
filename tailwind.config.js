const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			black: "#000000",
			gray: colors.blueGray,
			purple: colors.indigo,
			blue: colors.cyan,
			green: colors.emerald,
			red: colors.rose,
			yellow: colors.amber,
		},
		extend: {
			fontFamily: {
				sans: [
					"Montserrat",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					'"Segoe UI"',
					"Roboto",
					'"Helvetica Neue"',
					"Arial",
					'"Noto Sans"',
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				body: ["'Nunito Sans'"],
			},
		},
	},
	variants: {
		extend: {
			fontSize: ["group-hover"],
		},
	},
	plugins: [require("tailwindcss-filters")],
};
