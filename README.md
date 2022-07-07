# Skillshare Player Control

Adds basic keyboard controls to the Skillshare player:

|                Key | Description                           |
| -----------------: | ------------------------------------- |
|    Left/Right keys | Backward/Forward                      |
|       Up/Down keys | Volume up/down                        |
|              Space | Pause/Play                            |
|                  M | Toggle mute                           |
|                  T | Toggle Theater Mode                   |
|          Shift + P | Play previous video on playlist       |
|          Shift + N | Play next video on playlist           |
|                  < | Slow down the video                   |
|                 \> | Speed up the video                    |
|           Home/End | Beginning/End of video                |
|                0-9 | Set time to (Number + 0) % , e.g. 10% |
|                  F | Full-screen                           |
| Double-click video | Full-screen                           |

Additional features:

1. Auto-hiding the player controls when being idle in full-screen mode.

Available for:

- [Google Chrome](https://chrome.google.com/webstore/detail/agbhgcomfpcfboebbfmefbicfkpnlfeg) ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/agbhgcomfpcfboebbfmefbicfkpnlfeg?color=white&label=users&style=flat-square)
- [Mozilla Firefox](https://addons.mozilla.org/addon/skillshare-player-control) ![Mozilla Add-on](https://img.shields.io/amo/users/skillshare-player-control?color=white&label=users&style=flat-square)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/ldgdglnmpaghmpoabbfadpnnaobhjffe) ![users count](https://img.shields.io/badge/dynamic/json?label=users&query=activeInstallCount&style=flat-square&color=white&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ldgdglnmpaghmpoabbfadpnnaobhjffe)
- [Opera](https://addons.opera.com/en/extensions/details/skillshare-player-control)

Made by [avi12](https://avi12.com).

## Requirements for setting up

Install [Node.js](https://nodejs.org) and [PNPM](https://pnpm.js.org/en/installation).

## Install dependencies

```shell script
pnpm i
```

## Start Rollup for development

```shell script
pnpm dev
```

## Running

### Note that to fully test all the features, you need a [Skillshare subscription](https://www.skillshare.com/membership/checkout).

### Chromium/Chrome

```shell script
pnpm run-chromium
```

### Edge on Windows 10/11

```shell
pnpm run-edge-windows
```

### Browsers that don't support Manifest v3

1. Build the extension for Firefox/Opera (see below).
2. Open the extensions page in that browser.
3. Enable the developer mode (top-right corner usually).
4. Either drag-drop the browser-compatible ZIP onto the browser or click "Load unpacked extension" and choose it.

## Build & pack

```shell
pnpm build-pack
```

### Build for Firefox (first run `pnpm build-pack`)

```shell
pnpm build-for-firefox
```

## Do you want to contribute?

Feel free to! Make sure to comply with the license, [GPL v3](https://github.com/avi12/skillshare-player-control/blob/main/LICENSE).
