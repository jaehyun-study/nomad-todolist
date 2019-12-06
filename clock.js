const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function lPadZero(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${lPadZero(hours)}:${lPadZero(minutes)}:${lPadZero(
    seconds
  )}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
