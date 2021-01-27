# Skillshare Player Control
Adds basic keyboard controls to the Skillshare player:

| Key | Description
| ---:|:-----------
| Left/Right keys | Backward/Forward
| Up/Down keys | Volume up/down
| Space | Pause/Play
| M | Toggle mute
| T | Toggle Theater Mode
| Shift + P | Play previous video on playlist
| Shift + N | Play next video on playlist
| < | Slow down the video
| \> | Speed up the video
| Home/End | Beginning/End of video
| 0-9 | Set time to (Number + 0) % , e.g. 10%
| F | Full-screen
| Double-click video | Full-screen

Available for [Google Chrome](https://chrome.google.com/webstore/detail/agbhgcomfpcfboebbfmefbicfkpnlfeg), [Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/skillshare-player-control), [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/ldgdglnmpaghmpoabbfadpnnaobhjffe), and [Opera](https://addons.opera.com/en/extensions/details/skillshare-player-control).  
Made by [avi12](https://avi12.com).

## Requirements for setting up
Install [Node.js](https://nodejs.org) and [PNPM](https://pnpm.js.org/en/installation).

## Install dependencies
```shell
pnpm i
```

## Start Rollup for development
```shell
pnpm dev
```

## Running
### Chrome/Chromium
```shell
pnpm run-chromium
```

### Firefox
```shell
pnpm run-firefox
```

### Other browsers
1. Open the extensions page in your browser.
1. Enable the developer tools (top-right corner usually).
1. Either drag-drop the `dist` folder onto the browser or click "Load unpacked extension" and choose it.

## Build
```shell
pnpm build
```

## Pack
```shell
pnpm run pack
```

## Pack source code
```shell
pnpm pack-self
```

## Do you want to contribute?
Feel free to!  
If you want to fork, just make sure to credit me and link this repository and [my website](https://avi12.com).