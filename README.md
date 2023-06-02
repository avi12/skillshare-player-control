# Skillshare Player Control

Adds basic keyboard controls to the Skillshare player:

|                             Key | Description                       |
| ------------------------------: | --------------------------------- |
|                 Left/Right keys | Backward/Forward                  |
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

## Start the dev server

### Chromium browsers

```shell script
pnpm dev
```

### Firefox

```shell script
pnpm dev:firefox
```

### Note:

To fully test all the features, you'll need a [Skillshare subscription](https://www.skillshare.com/membership/checkout).

You can do it for free by:

1. Create a Skillshare account (I recommend using [DuckDuckGo](https://duckduckgo.com/email/settings/autofill))
2. Start the first free month with PayPal
3. [Cancel the subscription](https://www.paypal.com/myaccount/autopay)

After the cancellation, you'll be able to continue testing the extension for a month.

## Running

### Chromium/Chrome

1. ```shell script
   pnpm run-chromium
   ```
2. Login to Skillshare and start testing

### Edge on Windows 10/11

1. ```shell
   pnpm run-edge:windows
   ```
2. Login to Skillshare and start testing

### Opera on Windows 10/11

1. ```shell
   pnpm run-opera:windows
   ```
2. Login to Skillshare and start testing

### Firefox

1. ```shell
   pnpm run-firefo
   ```
2. Go to `about:addons` (shortcut <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>)
3. Click on "Skillshare Player Control"
4. "Permissions" tab
5. Make sure that "Access your data for https://www.skillshare.com" is enabled
6. Login to Skillshare and start testing

## Build & pack

```shell
pnpm build-pack
```

### Build & pack for Firefox

```shell
pnpm build-pack:firefox
```

## Contribution

Feel free to contribute! Keep in mind that the license I chose
is [GPL v3](https://github.com/avi12/youtube-auto-hd/blob/main/LICENSE).  
If you want to fork, make sure to credit [avi12](https://avi12.com) and link to this repository.
