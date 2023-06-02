import type { PlasmoCSConfig } from "plasmo";
import { registerHotkeys } from "~cs-utils/skillshare-content-script-hotkeys";

new MutationObserver((_, observer) => {
  const elVideo: HTMLVideoElement = document.querySelector(`video[src*="skillshare.com"]`);
  if (!elVideo) {
    return;
  }

  registerHotkeys(elVideo);
  observer.disconnect();
}).observe(document.documentElement, { childList: true, subtree: true });

export const config: PlasmoCSConfig = {
  matches: ["https://www.skillshare.com/*"]
};
