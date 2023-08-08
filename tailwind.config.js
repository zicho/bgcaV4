module.exports = {
	daisyui: {
		themes: [
			"emerald",
			"corporate",
			{
				garden: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require("daisyui/src/theming/themes")["[data-theme=garden]"],
					primary: "#5a7c65",
					"primary-focus": "#48604f",
					"primary-content": "#ffffff",
					"secondary-content": "#ffffff",
					"--rounded-btn": ".2rem",
					"base-100": "#f9f9f9",
					"base-200": "#d1cccc",
					"base-300": "#b9b1b1",
					"base-content": "#100f0f"
				}
			}
		]
	},
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			// padding: {
			// 	DEFAULT: '1rem',
			// 	sm: '2rem',
			// 	lg: '4rem',
			// 	xl: '5rem',
			// 	'2xl': '6rem'
			// }
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "100%" // add required value here
					}
				}
			}
		}
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
