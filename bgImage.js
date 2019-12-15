const MAX_IMG_NUM = 5;
const BG_IMG_CN = "bgImage";

const body = document.querySelector("body");
let lastImgNum = null;

function getImageNumber() {
  let number = Math.floor(Math.random() * MAX_IMG_NUM);
  if (number === lastImgNum) {
    number = (number + 1) % MAX_IMG_NUM;
  }
  lastImgNum = number;
  return number;
}

function changeImage() {
  const oldBgImg = document.querySelector("." + BG_IMG_CN);
  const newBgImg = new Image();
  newBgImg.classList.add(BG_IMG_CN);
  newBgImg.src = `images/${getImageNumber()}.jpg`;
  newBgImg.style.opacity = 0;
  newBgImg.onload = () => {
    body.appendChild(newBgImg);
    setTimeout(() => {
      if (oldBgImg !== null) {
        oldBgImg.style.opacity = 0;
        oldBgImg.addEventListener("transitionend", () => {
          oldBgImg.remove();
        });
      }
      newBgImg.style.opacity = 1;
    }, 100);
  };
}

function init() {
  changeImage();
  setInterval(changeImage, 3000);
}

init();
