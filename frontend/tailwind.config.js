/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  // Doesn't work for some reason?
  // Enable class-based dark mode
  // theme: {
  //   extend: {
  //     colors: {
  //       // Dark theme colors
  //       "dark-bg": "#0A2647",
  //       "dark-surface": "#144272",
  //       "dark-elevated": "#205295",
  //       "dark-border": "#3a3a3a",
  //       "dark-text-primary": "#2C74B3",
  //       "dark-text-secondary": "#a0a0a0",
  //       "dark-text-tertiary": "#707070",

  //       // Light theme colors
  //       "light-bg": "#ffffff",
  //       "light-surface": "#f8f9fa",
  //       "light-elevated": "#ffffff",
  //       "light-border": "#e5e7eb",
  //       "light-text-primary": "#1a1a1a",
  //       "light-text-secondary": "#6b7280",
  //       "light-text-tertiary": "#9ca3af",
  //     },
  //   },
  // },
  plugins: [],
};
