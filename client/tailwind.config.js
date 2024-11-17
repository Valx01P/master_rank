/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-background": "rgba(var(--background))",
        "app-text": "rgba(var(--text))",
        "nav-background": "rgba(var(--nav-background))",
        "markdown-background": "rgba(var(--markdown-background))",
        "editor-nav-background": "rgba(var(--editor-nav-background))",
        "editor-background": "rgba(var(--editor-background))",
        "editor-output-background": "rgba(var(--editor-output-background))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",
        "scrollbar-track": "rgba(var(--scrollbar-track))",
        "scrollbar-thumb": "rgba(var(--scrollbar-thumb))",
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
}