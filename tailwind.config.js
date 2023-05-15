import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                system: '#141931',
                'brand-primary': '#0891b2',
                'brand-primary-light': '#3fbbd9',
                'brand-primary-muted': 'rgba(8, 145, 178,0.6)',
                'brand-secondary': '#db2777'
            },
            boxShadow: {
                card: '0 0 10px 1px rgba(0, 0, 0, 0.25)'
            }
        }
    },
    plugins: [
        plugin(function ({ addVariant, addUtilities }) {
            addVariant('active-class', '&.active');
        })
    ]
};
