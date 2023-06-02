export function registerHotkeys(elVideo: HTMLVideoElement): void {
  const elVideoDiv = elVideo.parentElement;
  const elLessons = [...document.querySelectorAll(".session-item")] as HTMLElement[];
  const elSpeeds = [...document.querySelectorAll(".playback-speed-popover ul > li")] as HTMLElement[];
  const elButtonFullscreen = document.querySelector(".vjs-fullscreen-control") as HTMLButtonElement;
  const elButtonMute = document.querySelector(".vjs-mute-control") as HTMLButtonElement;
  const elButtonTheater = document.querySelector(".playlist-close-button") as HTMLButtonElement;

  const events = {
    mouseenter: new Event("mouseenter"),
    mouseleave: new Event("mouseleave")
  };

  const secondsUntilControlsHide = 5;

  // Make sure the controls will work as soon as the video is loaded
  elVideoDiv.focus();
  elVideo.addEventListener("canplay", async () => {
    elVideoDiv.focus();
    await elVideo.play();
  });

  addIdleListener();
  addFullscreenListener();

  document.addEventListener("keydown", async (e: KeyboardEvent) => {
    const { code, key, shiftKey, ctrlKey } = e;
    const elVideo = document.querySelector("video");

    const secondsToSeek = 5;
    const volumeChangeRate = 5;

    // If the user is focused in an input, don't do anything
    if (document.activeElement.matches("input, textarea, select")) {
      return;
    }

    switch (code) {
      case "KeyC": // Toggle closed captions
        {
          const elButtonCC: HTMLButtonElement = document.querySelector(".vjs-transcript-mode");
          if (!elButtonCC) {
            return;
          }

          const getActiveCc = (): HTMLLIElement => {
            const selectorSelectedLiCc = ".list-item.selected";
            try {
              return document.querySelector(`${selectorSelectedLiCc}:has([data-language-id])`);
            } catch {
              for (const elLiSelected of document.querySelectorAll(selectorSelectedLiCc)) {
                if (elLiSelected.querySelector("[data-language-id]")) {
                  return elLiSelected as HTMLLIElement;
                }
              }
            }
          };

          const elCcItemActive = getActiveCc();

          const getCcOption = (languageId: string): HTMLAnchorElement =>
            document.querySelector(`[data-language-id*="${languageId}"], [data-language-id="en-US"]`);

          const languageIdOff = "__language_id_off__";
          const languageIdCurrent = location.pathname.split("/")[0];

          const elCcOptionOff = getCcOption(languageIdOff);
          const elCcOptionCurrent = getCcOption(languageIdCurrent);

          if (!elCcItemActive || elCcItemActive.querySelector("[data-language-id]") === elCcOptionOff) {
            elCcOptionCurrent.click();
          } else {
            elCcOptionOff.click();
          }
          elVideoDiv.focus();
        }
        break;

      case "KeyM": // Mute/unmute
        elButtonMute.click();
        elVideoDiv.focus();
        break;

      case "KeyF": // Toggle full-screen mode
        if (!getIsFullScreen()) {
          await elVideoDiv.requestFullscreen();
          elVideoDiv.focus();
          return;
        }

        await document.exitFullscreen();
        break;

      case "KeyT": // Toggle theater mode
        elButtonTheater.click();
        break;

      case "Home": // Go to the beginning of the video
        // Preventing the default behavior - scrolling to the top
        e.preventDefault();
        elVideo.currentTime = 0;
        break;

      case "End": // Go to the end of the video
        // Preventing the default behavior - scrolling to the end
        e.preventDefault();
        elVideo.currentTime = elVideo.duration;
        break;

      case "Space": // Play/pause
        // Preventing the default behavior - scrolling down
        e.preventDefault();
        if (elVideo.paused) {
          elVideo.pause();
          return;
        }
        await elVideo.play();
        break;

      case "ArrowLeft": // Go X seconds back (default: 5)
        elVideo.currentTime -= secondsToSeek;
        break;

      case "ArrowRight": // Go X seconds forward (default: 5)
        elVideo.currentTime += secondsToSeek;
        break;

      case "ArrowUp": // Volume up by X percent (default: 5)
        {
          e.preventDefault();
          const volumeNew = (elVideo.volume * 100 + volumeChangeRate) / 100;
          if (volumeNew <= 1) {
            elVideo.volume = volumeNew;
          }
        }
        break;

      case "ArrowDown": // Volume down by X percent (default: 5)
        {
          e.preventDefault();
          const volumeNew = (elVideo.volume * 100 - volumeChangeRate) / 100;
          if (volumeNew >= 0) {
            elVideo.volume = volumeNew;
          }
        }
        break;

      case "Comma": // < - Slow down the video
      case "Period": // > - Speed up the video
        {
          if (!shiftKey) {
            return;
          }

          const iSpeed = getCurrentIndex(elSpeeds);
          clickNextItemIfPossible({
            items: elSpeeds,
            i: iSpeed,
            isNext: code === "Period"
          });
        }
        break;

      case "KeyP": // Shift + P - Go to the previous video in the playlist
      case "KeyN": // Shift + N - Go to the next video in the playlist
        {
          if (!shiftKey) {
            return;
          }
          new MutationObserver((_, observer) => {
            if (document.activeElement.matches("button")) {
              elVideoDiv.focus();
              observer.disconnect();
            }
          }).observe(elVideoDiv, { childList: true, subtree: true });

          const iLesson = getCurrentIndex(elLessons);
          clickNextItemIfPossible({
            items: elLessons,
            i: iLesson,
            isNext: code === "KeyN"
          });
        }
        break;

      default:
        // Seek to (number + 0) % of the video, e.g. 10%
        if (!isNaN(+key) && !ctrlKey) {
          elVideo.currentTime = (elVideo.duration * Number(key + 0)) / 100;
        }
    }
  });

  document.addEventListener(
    "click",
    (e: MouseEvent) => {
      // When the user clicks a lesson from a lessons list on the right side,
      // the video will be focused
      const element = e.target as HTMLElement;
      if (!element.closest(".session-item")) {
        return;
      }

      requestAnimationFrame(() => {
        elVideoDiv.focus();
      });
    },
    { capture: true }
  );

  function addIdleListener(): void {
    let timeoutMouseMove;
    let timeoutPlayPause;

    const onMouseMoveOrSeeked = (): void => {
      if (!getIsFullScreen()) {
        return;
      }

      showPlayerControls();
      clearTimeout(timeoutMouseMove);
      timeoutMouseMove = setTimeout(() => {
        elVideo = document.querySelector("video");
        if (!elVideo.paused) {
          hidePlayerControls();
        }
      }, secondsUntilControlsHide * 1000);
    };
    elVideoDiv.addEventListener("mousemove", onMouseMoveOrSeeked);

    const prepareToHideControls = (): void => {
      timeoutPlayPause = setTimeout(() => {
        if (!elVideo.paused) {
          hidePlayerControls();
        }
      }, secondsUntilControlsHide * 1000);
    };

    const prepareToShowControls = (): void => {
      clearTimeout(timeoutPlayPause);
      showPlayerControls();
    };

    const onCanPlay = ({ target }): Promise<void> => target.play();

    const toggleVideoListeners = (elVideo: HTMLVideoElement, isAdd: boolean): void => {
      if (isAdd) {
        elVideo.addEventListener("canplay", onCanPlay);
        elVideo.addEventListener("play", prepareToHideControls);
        elVideo.addEventListener("pause", prepareToShowControls);
        elVideo.addEventListener("seeked", onMouseMoveOrSeeked);
        elVideoDiv.addEventListener("fullscreenchange", prepareToHideControls);
        return;
      }

      elVideo.removeEventListener("canplay", onCanPlay);
      elVideo.removeEventListener("play", prepareToHideControls);
      elVideo.removeEventListener("pause", prepareToShowControls);
      elVideo.removeEventListener("seeked", onMouseMoveOrSeeked);
      elVideoDiv.removeEventListener("fullscreenchange", prepareToHideControls);
    };

    // If another video in the playlist was clicked
    new MutationObserver(() => {
      const elVideo = document.querySelector("video");
      toggleVideoListeners(elVideo, false);
      toggleVideoListeners(elVideo, true);
    }).observe(elVideoDiv, { childList: true });
  }

  function addFullscreenListener(): void {
    elButtonFullscreen.addEventListener("click", () => {
      elVideoDiv.focus();
    });
  }

  function showPlayerControls(): void {
    elVideoDiv.dispatchEvent(events.mouseenter);
  }

  function hidePlayerControls(): void {
    elVideoDiv.dispatchEvent(events.mouseleave);
  }

  function getIsFullScreen(): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Boolean(document.webkitIsFullScreen || document.isFullScreen);
  }

  function getCurrentIndex(items: HTMLElement[]): number {
    return items.findIndex(item => item.classList.contains("active"));
  }

  function clickNextItemIfPossible({ items, i, isNext }: { items: HTMLElement[]; i: number; isNext: boolean }): void {
    if (!isNext) {
      if (i > 0) {
        items[i - 1].click();
      }
    } else if (i < items.length) {
      items[i + 1].click();
    }
  }
}
