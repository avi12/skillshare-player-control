import { terser } from "rollup-plugin-terser";
import html from "@web/rollup-plugin-html";

const isProduction = !process.env.ROLLUP_WATCH;

function createConfig(filename) {
  return {
    input: `src/${filename}.js`,
    output: {
      format: "cjs",
      file: `dist/build/${filename}.js`
    },
    plugins: [isProduction && terser()],
    watch: { clearScreen: true }
  };
}

function createOptionsPageConfig(dirOptions) {
  return {
    input: `src/${dirOptions}/options.html`,
    output: {
      dir: `dist/build/${dirOptions}`
    },
    plugins: [html({ minify: true })],
    watch: { clearScreen: true }
  };
}

export default [
  createConfig("scripts/skillshare-content-script-initialize"),
  createOptionsPageConfig("options")
];
