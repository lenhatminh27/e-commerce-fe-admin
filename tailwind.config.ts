import { type Config } from "tailwindcss"
import { heroui } from "@heroui/theme"

const config: Config = {
  content: [
    "./node_modules/@heroui/theme/dist/components/button.js",
    "./node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}

export default config
