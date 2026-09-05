import oklabFunction from "@csstools/postcss-oklab-function";
import colorMixFunction from "@csstools/postcss-color-mix-function";

const config = {
  plugins: {
    tailwindcss: {},
    "@csstools/postcss-oklab-function": { preserve: true },
    "@csstools/postcss-color-mix-function": { preserve: true },
    autoprefixer: {},
  },
};

export default config;
