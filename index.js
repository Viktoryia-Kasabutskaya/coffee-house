// burger

const menuBtn = document.querySelector(".btn-burger");
const menu = document.querySelector(".nav");
const menuLink = document.querySelector(".menu-link");
const body = document.body;

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");
  menuLink.classList.toggle("active");
  body.classList.toggle("stop-scroll");
});

const menuLinks = document.querySelectorAll(".nav-link");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    menu.classList.remove("active");
    menuLink.classList.remove("active");
    body.classList.remove("stop-scroll");
  });
});

window.addEventListener("click", (e) => {
  const target = e.target;
  if (
    !target.closest(".nav") &&
    !target.closest(".btn-burger") &&
    !target.closest(".menu-link")
  ) {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
    menuLink.classList.remove("active");
    body.classList.remove("stop-scroll");
  }
});

//========================================================

// Slider

const slider = document.querySelector(".slider");
const slideControls = document.querySelectorAll(".slide-control");
const arrowLeft = document.querySelector(".slider__btn-prev");
const arrowRight = document.querySelector(".slider__btn-next");

let currentSlide = 0;
let isPaused = false;
let xTouchStart = 0;
let xTouchEnd = 0;

slideControls[currentSlide].classList.add("slide-active");

function handlePause(eventType) {
  if (matchMedia("(pointer: coarse)").matches && eventType === "mouseover")
    return;
  isPaused = eventType === "mouseover" || eventType === "touchstart";
  slideControls[currentSlide].classList.toggle("paused", isPaused);
}

["mouseover", "touchstart", "mouseleave", "touchend"].forEach((event) => {
  slider.addEventListener(event, () => handlePause(event));
});

slider.addEventListener("touchstart", (e) => {
  xTouchStart = e.touches[0].clientX;
  handlePause("touchstart");
});

slider.addEventListener("touchend", (e) => {
  xTouchEnd = e.changedTouches[0].clientX;
  if (Math.abs(xTouchStart - xTouchEnd) >= 5) {
    xTouchStart < xTouchEnd
      ? handleSlideChange("left")
      : handleSlideChange("right");
  }
  handlePause("touchend");
});

arrowLeft.addEventListener("click", () => handleSlideChange("left"));
arrowRight.addEventListener("click", () => handleSlideChange("right"));

slideControls.forEach((element) => {
  element.addEventListener("animationend", () => handleSlideChange("right"));
});

function handleSlideChange(direction) {
  direction === "left" ? currentSlide-- : currentSlide++;
  if (currentSlide < 0) currentSlide = 2;
  if (currentSlide >= 3) currentSlide = 0;
  changeSlide();
}

function changeSlide() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  slideControls.forEach((element) => element.classList.remove("slide-active"));
  slideControls[currentSlide].classList.add("slide-active");
}
