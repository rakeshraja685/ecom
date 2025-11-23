import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#111a22",
                surface: "#192633",
                border: "#233648",
                primary: "#1380ec",
                text: {
                    DEFAULT: "#ffffff",
                    muted: "#92adc9"
                }
            },
            fontFamily: {
                sans: ['"Space Grotesk"', '"Noto Sans"', 'sans-serif'],
                display: ['"Space Grotesk"', 'sans-serif'],
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
export default config;
