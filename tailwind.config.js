/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Blue-500 equivalent, vibrant aquatic blue
        secondary: "#0EA5E9", // Sky-500
        accent: "#8B5CF6", // Violet from the button in the screenshot
        "background-light": "#F0F9FF", // Very light blue tint
        "background-dark": "#0F172A", // Slate-900
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E293B", // Slate-800
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        'xl': "1rem",
        '2xl': "1.5rem",
      },
    },
  },
  plugins: [],
}
