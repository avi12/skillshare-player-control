# Skillshare Player Control
Adds basic keyboard controls to the Skillshare player:

* Left/Right keys - Backward/Forward
* Up/Down keys - Volume up/down
* Space - Pause/Play
* M - Toggle mute
* T - Toggle Theater Mode
* Shift + P - Play previous video on playlist
* Shift + N - Play next video on playlist
* Home/End - Beginning/End of video
* 0-9 - Set time to (Number + 0) % , e.g. 10%
* F - Full-screen
* Double-click video - Full-screen

Officially published for [Chrome Web Store](https://chrome.google.com/webstore/detail/agbhgcomfpcfboebbfmefbicfkpnlfeg) and [Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/skillshare-player-control).  
Made by [avi12](https://avi12.com).

## Do you want to contribute?
Feel free to!  
If you want to fork, just make sure to credit me and link this repository and [my website](https://avi12.com).

## Install dependencies
```
yarn
```
## Build
```
yarn run build-minify
```
## Pack
```
yarn run pack && yarn run pack-self
```
## Shorthand for build & pack
```
yarn run build-pack
```