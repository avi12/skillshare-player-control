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

## Start development server

```shell script
pnpm dev
```

## Start development server for Firefox

```shell script
pnpm dev:firefox
```

## Running

### Note:

To fully test all the features, you'll need a [Skillshare subscription](https://www.skillshare.com/membership/checkout).  
I recommend creating a temporary Skillshare account while
using [DuckDuckGo](https://duckduckgo.com/email/settings/autofill) to set up a temporary email that will forward to your
personal email, so you can easily delete the temporary email address when you're done testing.

### Chrome

```shell
pnpm run:chrome
```

### Firefox

```shell
pnpm run:firefox
```

## Build & pack

```shell
pnpm build-pack
```

### Build & pack for Firefox

```shell
pnpm build-pack:firefox
```

## Do you want to contribute?

Feel free to! Make sure to comply with the
license, [GPL v3](https://github.com/avi12/skillshare-player-control/blob/main/LICENSE).
