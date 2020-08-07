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
}
