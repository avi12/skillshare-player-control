import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import { terser } from "rollup-plugin-terser";
import { emptyDir } from "rollup-plugin-empty-dir";
import zip from "rollup-plugin-zip";

const isProduction = !process.env.ROLLUP_WATCH;
export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),
    isProduction && simpleReloader(),
    emptyDir(),
    isProduction && terser(),
    isProduction && zip({ dir: "dist_packed" }),
  ],
};
