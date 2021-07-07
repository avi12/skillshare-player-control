/**
 * @param {HTMLVideoElement} elVideo
 */
export function registerHotkeys(elVideo) {
  const elVideoDiv = elVideo.parentElement;
  const elLessons = document.getElementsByClassName("session-item");
  const elSpeeds = document.querySelectorAll(".playback-speed-popover ul > li");
  const elButtonPlayPause = document.querySelector(".vjs-play-control");
  const elButtonFullscreen = document.querySelector(".vjs-fullscreen-control");

  const events = {
    mouseenter: new Event("mouseenter"),
    mouseleave: new Event("mouseleave")
  };

  const secondsUntilControlsHide = 5;

  // Make sure the controls will work as soon as the video is loaded
  elVideoDiv.focus();
  elVideo.addEventListener("canplay", () => {
    elVideoDiv.focus();
    elVideo.play();
  });

  addIdleListener();
  addFullscreenListener();

  elVideoDiv.addEventListener("keydown", e => {
    const { code, key, shiftKey, ctrlKey } = e;
    const elVideo = document.querySelector("video");
    const elButtonCC = document.querySelector(".vjs-transcript-mode");
    const elButtonTheater = document.querySelector(".playlist-close-button");

    const secondsToSeek = 5;
    const volumeChangeRate = 5;

    switch (code) {
      case "KeyC": // Toggle closed captions
        if (elButtonCC) {
          elButtonCC.click();
          elVideoDiv.focus();
        }
        break;

      case "KeyM": // Mute/unmute
        elVideo.muted = !getIsMuted();
        elVideoDiv.focus();
        break;

      case "KeyT": // Toggle theater mode
        elButtonTheater.click();
        elVideoDiv.focus();
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
        elButtonPlayPause.click();
        break;

      case "ArrowLeft": // Go X seconds back (default: 5)
        elVideo.currentTime -= secondsToSeek;
        break;

      case "ArrowRight": // Go X seconds forward (default: 5)
        elVideo.currentTime += secondsToSeek;
        break;

      case "ArrowUp": // Increase the volume by X percent (default: 5)
        {
          e.preventDefault();
          const volumeNew = (elVideo.volume * 100 + volumeChangeRate) / 100;
          if (volumeNew <= 1) {
            elVideo.volume = volumeNew;
          }
        }
        break;

      case "ArrowDown": // Decrease the volume by X percent (default: 5)
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
        if (!shiftKey) {
          return;
        }

        const iSpeed = getCurrentIndex(elSpeeds);
        clickNextItemIfPossible(elSpeeds, iSpeed, code === "Period");
        elVideoDiv.focus();
        break;

      case "KeyP": // Shift + P - Go to the previous video in the playlist
      case "KeyN": // Shift + N - Go to the next video in the playlist
        if (!shiftKey) {
          return;
        }

        const iLesson = getCurrentIndex(elLessons);
        clickNextItemIfPossible(elLessons, iLesson, code === "KeyN");
        elVideoDiv.focus();
        break;

      default:
        // Go to (number + 0) % of the video, e.g. 10%
        const isNumber = !isNaN(key);
        if (!isNumber || ctrlKey) {
          return;
        }
        elVideo.currentTime = (elVideo.duration * (key + 0)) / 100;
    }
  });

  document.addEventListener(
    "click",
    e => {
      // When the user clicks a lesson from a lessons list on the right side,
      // the video will be focused
      if (!e.target.closest(".session-item")) {
        return;
      }

      requestAnimationFrame(() => {
        elVideoDiv.focus();
      });
    },
    { capture: true }
  );

  function addIdleListener() {
    let timeoutMouseMove;
    let timeoutPlayPause;

    const onMouseMoveOrSeeked = () => {
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

    const prepareToHideControls = () => {
      timeoutPlayPause = setTimeout(() => {
        if (!elVideo.paused) {
          hidePlayerControls();
        }
      }, secondsUntilControlsHide * 1000);
    };

    const prepareToShowControls = () => {
      clearTimeout(timeoutPlayPause);
      showPlayerControls();
    };

    const onCanPlay = ({ target }) => target.play();

    const toggleVideoListeners = (elVideo, isAdd) => {
      if (isAdd) {
        elVideo.addEventListener("canplay", onCanPlay);
        elVideo.addEventListener("play", prepareToHideControls);
        elVideo.addEventListener("pause", prepareToShowControls);
        elVideo.addEventListener("seeked", onMouseMoveOrSeeked);
        elVideoDiv.addEventListener("fullscreenchange", prepareToHideControls);
      } else {
        elVideo.removeEventListener("canplay", onCanPlay);
        elVideo.removeEventListener("play", prepareToHideControls);
        elVideo.removeEventListener("pause", prepareToShowControls);
        elVideo.removeEventListener("seeked", onMouseMoveOrSeeked);
        elVideoDiv.removeEventListener(
          "fullscreenchange",
          prepareToHideControls
        );
      }
    };

    // If another video in the playlist was clicked
    new MutationObserver(() => {
      const elVideo = document.querySelector("video");
      toggleVideoListeners(elVideo, false);
      toggleVideoListeners(elVideo, true);
    }).observe(elVideoDiv, { childList: true });
  }

  function addFullscreenListener() {
    elButtonFullscreen.addEventListener("click", () => {
      elVideoDiv.focus();
    });
  }

  function showPlayerControls() {
    elVideoDiv.dispatchEvent(events.mouseenter);
  }

  function hidePlayerControls() {
    elVideoDiv.dispatchEvent(events.mouseleave);
  }

  /**
   * @returns {boolean}
   */
  function getIsFullScreen() {
    return Boolean(document.webkitIsFullScreen || document.isFullScreen);
  }

  /**
   * @returns {number}
   */
  function getCurrentIndex(items) {
    return [...items].findIndex(element =>
      element.classList.contains("active")
    );
  }

  /**
   * @param {NodeListOf} items
   * @param {number} i
   * @param {boolean} isNext
   */
  function clickNextItemIfPossible(items, i, isNext) {
    if (!isNext) {
      if (i > 0) {
        items[i - 1].click();
      }
    } else if (i < items.length) {
      items[i + 1].click();
    }
  }

  /**
   * @returns {boolean}
   */
  function getIsMuted() {
    const elButtonMute = document.querySelector(".vjs-mute-control");
    return elButtonMute.classList.contains("vjs-vol-0");
  }
}
