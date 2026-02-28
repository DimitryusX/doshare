/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gh: {
                    fg: {
                        default: "rgb(var(--color-fg-default) / <alpha-value>)",
                        muted: "rgb(var(--color-fg-muted) / <alpha-value>)",
                        onEmphasis: "rgb(var(--color-fg-on-emphasis) / <alpha-value>)",
                        danger: "rgb(var(--color-danger-fg) / <alpha-value>)",
                        attention: "rgb(var(--color-attention-fg) / <alpha-value>)",
                        success: "rgb(var(--color-success-fg) / <alpha-value>)",
                    },
                    canvas: {
                        default: "rgb(var(--color-canvas-default) / <alpha-value>)",
                        subtle: "rgb(var(--color-canvas-subtle) / <alpha-value>)",
                    },
                    border: {
                        default: "rgb(var(--color-border-default) / <alpha-value>)",
                        muted: "rgb(var(--color-border-muted) / <alpha-value>)",
                    },
                    accent: {
                        fg: "rgb(var(--color-accent-fg) / <alpha-value>)",
                        emphasis: "rgb(var(--color-accent-emphasis) / <alpha-value>)",
                        emphasisHover: "rgb(var(--color-accent-emphasis-hover) / <alpha-value>)",
                    },
                    success: {
                        emphasis: "rgb(var(--color-success-emphasis) / <alpha-value>)",
                        emphasisHover: "rgb(var(--color-success-emphasis-hover) / <alpha-value>)",
                        subtle: "rgb(var(--color-success-subtle) / <alpha-value>)",
                    },
                    danger: {
                        subtle: "rgb(var(--color-danger-subtle) / <alpha-value>)",
                    },
                    attention: {
                        subtle: "rgb(var(--color-attention-subtle) / <alpha-value>)",
                    },
                    neutral: {
                        muted: "rgb(var(--color-neutral-muted) / <alpha-value>)",
                    },
                    header: {
                        bg: "rgb(var(--color-header-bg) / <alpha-value>)",
                        fg: "rgb(var(--color-header-fg) / <alpha-value>)",
                    },
                },
            },
        },
    },
    plugins: [],
}