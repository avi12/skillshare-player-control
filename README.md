# Skillshare Player Control

Adds basic keyboard controls to the Skillshare player:

|                             Key | Description                       |
|--------------------------------:|-----------------------------------|
|               Left / Right keys | Backward/Forward 5 seconds        |
|  <kbd>J</kbd>/<kbd>K</kbd> keys | Backward/Forward 10 seconds       |
|                    Up/Down keys | Volume up/down                    |
|                <kbd>Space</kbd> | Pause/Play                        |
|                    <kbd>M</kbd> | Toggle mute                       |
|                    <kbd>T</kbd> | Toggle Theater Mode               |
| <kbd>Shift</kbd> + <kbd>P</kbd> | Play previous video on playlist   |
| <kbd>Shift</kbd> + <kbd>N</kbd> | Play next video on playlist       |
|                    <kbd><</kbd> | Slow down the video               |
|                    <kbd>></kbd> | Speed up the video                |
|  <kbd>Home</kbd>/<kbd>End</kbd> | Beginning/End of video            |
|       <kbd>0</kbd>-<kbd>9</kbd> | Seek to (Number + 0) % , e.g. 10% |
|                    <kbd>F</kbd> | Full-screen                       |
|              Double-click video | Full-screen                       |

Additional features:

1. Auto-hiding the player controls when being idle in full-screen mode.

Available for:

- [Google Chrome](https://chrome.google.com/webstore/detail/agbhgcomfpcfboebbfmefbicfkpnlfeg) ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/agbhgcomfpcfboebbfmefbicfkpnlfeg?color=white&label=users&style=flat-square)
- [Mozilla Firefox](https://addons.mozilla.org/addon/skillshare-player-control) 109+ ![Mozilla Add-on](https://img.shields.io/amo/users/skillshare-player-control?color=white&label=users&style=flat-square)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/ldgdglnmpaghmpoabbfadpnnaobhjffe) ![users count](https://img.shields.io/badge/dynamic/json?label=users&query=activeInstallCount&style=flat-square&color=white&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ldgdglnmpaghmpoabbfadpnnaobhjffe)
- [Opera](https://addons.opera.com/en/extensions/details/skillshare-player-control)

Made by [Avi](https://avi12.com).

## Requirements for setting up

1. Install [Node.js](https://nodejs.org) and [PNPM](https://pnpm.io/installation)
2. Start a [subscription](https://www.skillshare.com/membership/checkout). I recommend using [DuckDuckGo](https://duckduckgo.com/email/settings/autofill) to create a temporary account
3. You can [cancel the subscription](https://www.paypal.com/myaccount/autopay) and freely test the extension for a week

## Install dependencies

```shell script
pnpm i
```

## Start the dev server & run in a test browser

### Chrome

```shell script
pnpm dev
```

### Edge

```shell
pnpm dev:edge
```

### Opera

```shell
pnpm dev:opera
```

### Firefox

Currently [unsupported](https://github.com/wxt-dev/wxt/issues/230#issuecomment-1806881653)  
Instead, after building you can follow [this guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox)

## Build

### Chrome/Edge

```shell script
pnpm build
```

### Opera

```shell
pnpm build:opera
```

### Firefox

```shell
pnpm build:firefox
```

## Package

### Chrome/Edge

```shell
pnpm package
```

### Opera

```shell
pnpm package:opera
```

### Firefox

```shell
pnpm package:firefox
```

## Shorthands

### Chrome/Edge

```shell
pnpm build:package
```

### Opera

```shell
pnpm build:package:opera
```

### Firefox

```shell
pnpm build:package:firefox
```

## Contribution

Feel free to contribute! Keep in mind that the license I chose is [GPL v3](https://github.com/avi12/skillshare-player-control/blob/main/LICENSE)  
If you want to fork, make sure to credit [Avi](https://avi12.com) and link to this repository
