/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            'rgba(0, 0, 0, 0.07) 0px 1px 2px',
            'rgba(0, 0, 0, 0.07) 0px 2px 4px',
            'rgba(0, 0, 0, 0.07) 0px 4px 8px',
            'rgba(0, 0, 0, 0.07) 0px 8px 16px',
            'rgba(0, 0, 0, 0.07) 0px 16px 32px',
            'rgba(0, 0, 0, 0.07) 0px 32px 64px'
        ]
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'poppins': ['Rubik', 'sans-serif']
      },
    },
  },
  plugins: [],
}

