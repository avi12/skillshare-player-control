import { defineConfig, type UserManifest } from "wxt";
import packageJson from "./package.json" assert { type: "json" };

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifest({ browser }) {
    const url = packageJson.repository;
    const [, author, email] = packageJson.author.match(/(.+) <(.+)>/)!;
    let manifest: UserManifest = {
      name: "Skillshare Player Control",
      description: "Basic keyboard controls for the Skillshare player.",
      homepage_url: url,
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/author
      author: browser === "opera" || browser === "firefox" ? packageJson.author : { email }
    };
    if (browser === "firefox") {
      manifest = {
        ...manifest,
        browser_specific_settings: {
          gecko: {
            id: "Skillshare_player_controller@gmail.com"
          }
        },
        developer: {
          name: author,
          url
        }
      };
    } else {
      manifest.offline_enabled = true;
    }
    return manifest;
  },
  outDir: "build",
  outDirTemplate: "{{browser}}-mv{{manifestVersion}}-{{mode}}",
  zip: {
    excludeSources: ["*.env", ".env*"],
    artifactTemplate: "{{name}}-{{version}}-{{browser}}.zip",
    sourcesTemplate: "{{name}}-{{version}}-{{browser}}-source.zip"
  }
});
