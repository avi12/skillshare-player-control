import { registerHotkeys } from "./skillshare-content-script-hotkeys";

new MutationObserver((_, observer) => {
  const elVideo = document.querySelector(`video[src*="skillshare.com"]`);
  if (!elVideo) {
    return;
  }

  registerHotkeys(elVideo);
  observer.disconnect();
}).observe(document.documentElement, { childList: true, subtree: true });
