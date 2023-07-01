module.exports = {
	daisyui: {
		themes: ['emerald', 'corporate']
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
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
					maxWidth: '100%', // add required value here
				  }
				}
			  }
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
