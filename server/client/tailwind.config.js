/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            },
            colors: {
                // Light mode
                light: {
                    bg: {
                        primary: '#FAFAFA',
                        secondary: '#FFFFFF',
                        tertiary: '#F5F5F5',
                    },
                    text: {
                        primary: '#1A1A1A',
                        secondary: '#6B7280',
                        tertiary: '#9CA3AF',
                    },
                    border: '#E5E7EB',
                    accent: '#3B82F6',
                    'accent-hover': '#2563EB',
                },
                // Dark mode
                dark: {
                    bg: {
                        primary: '#0A0A0A',
                        secondary: '#171717',
                        tertiary: '#262626',
                    },
                    text: {
                        primary: '#FAFAFA',
                        secondary: '#A3A3A3',
                        tertiary: '#737373',
                    },
                    border: '#404040',
                    accent: '#60A5FA',
                    'accent-hover': '#3B82F6',
                },
            },
            boxShadow: {
                'minimal': '0 1px 3px rgba(0, 0, 0, 0.04)',
                'minimal-md': '0 4px 6px rgba(0, 0, 0, 0.04)',
                'minimal-lg': '0 10px 15px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    plugins: [],
}
