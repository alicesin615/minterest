import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                system: '#101321',
                'brand-primary': '#0fb4d1',
                'brand-primary-light': '#3fbbd9',
                'brand-primary-muted': 'rgba(8, 145, 178,0.6)',
                'brand-secondary': '#db2777',
                'brand-secondary-light': '#ec4899',
                'slate-2': '#e2e8f0',
                'slate-3': '#cbd5e1',
                'slate-4': '#94a3b8',
                'slate-5': '#64748b',
                'slate-6': '#475569'
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
