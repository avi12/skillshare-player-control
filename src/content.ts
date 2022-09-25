import { registerHotkeys } from "~contents/skillshare-content-script-hotkeys";
import type { PlasmoContentScript } from "plasmo";

new MutationObserver((_, observer) => {
  const elVideo = document.querySelector<HTMLVideoElement>(`video[src*="skillshare.com"]`);
  if (!elVideo) {
    return;
  }

  registerHotkeys(elVideo);
  observer.disconnect();
}).observe(document.documentElement, { childList: true, subtree: true });

export const config: PlasmoContentScript = {
  matches: ["https://www.skillshare.com/*"]
};
