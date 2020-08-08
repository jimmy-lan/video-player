// Selectors
const videoPlayer = document.querySelector("video.video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const btnPlay = document.getElementById("btn-play");
const btnVolume = document.getElementById("btn-volume");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const lblCurrentTime = document.querySelector(".time-elapsed");
const lblDuration = document.querySelector(".time-duration");
const btnFullscreen = document.getElementById("btn-fullscreen");

// Listeners
btnPlay.addEventListener("click", togglePlay);

videoPlayer.addEventListener("click", togglePlay);
videoPlayer.addEventListener("ended", () => setBtnPlayIcon(false));
videoPlayer.addEventListener("timeupdate", updateProgressBar);
videoPlayer.addEventListener("canplay", updateProgressBar);

progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);

// Helpers
function setBtnPlayIcon(isPlaying) {
  if (isPlaying) {
    btnPlay.classList.replace("fa-play", "fa-pause");
    btnPlay.setAttribute("title", "Pause");
  } else {
    btnPlay.classList.replace("fa-pause", "fa-play");
    btnPlay.setAttribute("title", "Play");
  }
}

function togglePlay() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    setBtnPlayIcon(true);
  } else {
    videoPlayer.pause();
    setBtnPlayIcon(false);
  }
}

function updateProgressBar() {
  progressBar.style.width = `${
    (videoPlayer.currentTime / videoPlayer.duration) * 100
  }%`;
  lblCurrentTime.textContent = formatDisplayTime(videoPlayer.currentTime) + "/";
  lblDuration.textContent = formatDisplayTime(videoPlayer.duration);
}

/**
 * format seconds into a time-representing string.
 * @param {Number} seconds
 */
function formatDisplayTime(seconds) {
  let m = `${Math.floor(seconds / 60)}`;
  let s = `${Math.ceil(seconds % 60)}`;
  if (s.length === 1) {
    s = "0" + s;
  }
  return m + ":" + s;
}

function setProgress(e) {
  const newPosition = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newPosition * 100}%`;
  videoPlayer.currentTime = newPosition * videoPlayer.duration;
}

function changeVolume(e) {
  // change volume progress bar appearance
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  } else if (volume > 0.9) {
    volume - 1;
  }
  volumeBar.style.width = `${volume * 100}%`;

  videoPlayer.volume = volume;

  // change volume icon
  btnVolume.className = "";
  if (volume > 0.7) {
    btnVolume.classList.add("fas", "fa-volume-up");
  } else if (volume <= 0.7 && volume > 0) {
    btnVolume.classList.add("fas", "fa-volume-down");
  } else {
    btnVolume.classList.add("fas", "fa-volume-off");
  }
}
