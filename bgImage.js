const MAX_IMG_NUM = 5;

const body = document.querySelector("body");

function getImageNumber() {
  return Math.floor(Math.random() * MAX_IMG_NUM + 1);
}

function init() {
  const bgImg = new Image();
  bgImg.classList.add("bgImage");
  bgImg.src = `images/${getImageNumber()}.jpg`;
  bgImg.onload = () => {
    body.appendChild(bgImg);
  };
}

init();
