import { defineConfig } from "wxt";
import packageJson from "./package.json" assert { type: "json" };

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifest({ browser }) {
    const url = packageJson.repository;
    const [, author, email] = packageJson.author.match(/(.+) <(.+)>/)!;

    return {
      name: "Skillshare Player Control",
      description: "Basic keyboard controls for the Skillshare player.",
      homepage_url: url,
      author: browser === "opera" || browser === "firefox" ? packageJson.author : { email },
      ...(browser !== "firefox" && { offline_enabled: true }),
      ...(browser === "firefox" && {
        browser_specific_settings: {
          gecko: {
            id: "Skillshare_player_controller@gmail.com"
          }
        },
        developer: {
          name: author,
          url
        }
      })
    };
  },
  outDir: "build",
  outDirTemplate: "{{browser}}-mv{{manifestVersion}}-{{mode}}",
  zip: {
    excludeSources: ["*.env", ".env*"],
    artifactTemplate: "{{name}}-{{version}}-{{browser}}.zip",
    sourcesTemplate: "{{name}}-{{version}}-{{browser}}-source.zip"
  }
});
