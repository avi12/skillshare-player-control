"use strict";

const elVideo = document.documentElement.querySelector("video");
const elVideoDiv = elVideo.parentElement;
const elLessons = document.getElementsByClassName("session-item");

// Make sure the controls will work as soon as the video is loaded
elVideoDiv.focus();
elVideo.addEventListener("canplay", () => {
  elVideoDiv.focus();
  elVideo.play();
});

elVideoDiv.addEventListener("keydown", e => {
  const { code, key, shiftKey } = e;
  const elVideo = document.querySelector("video");
  const elButtonPlayPause = document.querySelector(".vjs-play-control");
  const elButtonCC = document.querySelector(".vjs-transcript-mode");
  const elButtonTheater = document.querySelector(".playlist-close-button");

  const secondsToSeek = 5;
  const volumeChangeRate = 5;

  switch (code) {
    case "KeyC": // Toggle closed captions
      {
        if (elButtonCC) {
          elButtonCC.click();
          elVideoDiv.focus();
        }
      }
      break;

    case "KeyM": // Mute/unmute
      {
        elVideoDiv.focus();
        elVideo.muted = !getIsMuted();
      }
      break;

    case "KeyF": // Toggle full-screen mode
      {
        if (!getIsFullScreen()) {
          elVideoDiv.requestFullscreen();
        }
      }
      break;

    case "KeyT": // Toggle theater mode
      {
        elButtonTheater.click();
        elVideoDiv.focus();
      }
      break;

    case "Home": // Go to the beginning of the video
      {
        // Preventing the default behavior - scrolling to the top
        e.preventDefault();
        elVideo.currentTime = 0;
      }
      break;

    case "End": // Go to the end of the video
      {
        // Preventing the default behavior - scrolling to the end
        e.preventDefault();
        elVideo.currentTime = elVideo.duration;
      }
      break;

    case "Space": // Play/pause
      {
        // Preventing the default behavior - scrolling down
        e.preventDefault();
        elButtonPlayPause.click();
      }
      break;

    case "ArrowLeft": // Go X seconds back (default: 5)
      {
        elVideo.currentTime -= secondsToSeek;
      }
      break;

    case "ArrowRight": // Go X seconds forward (default: 5)
      {
        elVideo.currentTime += secondsToSeek;
      }
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

    default: {
      if (shiftKey) {
        // Go to the previous video in the playlist
        if (code === "KeyP") {
          const i = getCurrentLessonIndex();
          if (i - 1 >= 0) {
            elLessons[i - 1].click();
          }
          // Go to the next video in the playlist
        } else if (code === "KeyN") {
          const i = getCurrentLessonIndex();
          if (i + 1 < elLessons.length) {
            elLessons[i + 1].click();
          }
        }
        return;
      }

      const isNumber = !isNaN(key);
      if (isNumber) {
        elVideo.currentTime = (elVideo.duration * (key + 0)) / 100;
      }
    }
  }
});

function getIsFullScreen() {
  return document.webkitIsFullScreen || document.isFullScreen;
}

// Listen to F while in full-screen mode to exit it
document.addEventListener("keydown", ({ code }) => {
  if (getIsFullScreen()) {
    switch (code) {
      case "KeyF":
        document.exitFullscreen();
        break;
    }
  }
});

function getCurrentLessonIndex() {
  return [...elLessons].findIndex(elLesson =>
    elLesson.classList.contains("active")
  );
}

function getIsMuted() {
  const elLevel = document.querySelector(".vjs-volume-level");
  const level = Number(elLevel.style.width.replace("%", ""));
  return level === 0;
}
