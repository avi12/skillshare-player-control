import { registerHotkeys } from "./hotkeys";

export default defineContentScript({
  matches: ["https://www.skillshare.com/*"],
  main() {new MutationObserver((_, observer) => {
    const elVideo = document.querySelector<HTMLVideoElement>(`video[src*="skillshare.com"]`);
    if (!elVideo) {
      return;
    }

    registerHotkeys(elVideo);
    observer.disconnect();
  }).observe(document.documentElement, { childList: true, subtree: true });
  }
});
