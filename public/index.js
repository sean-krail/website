let backgroundImages = [
  {src: "i/Mount-Diablo-Bay-View.min.jpg", loaded: false},
  {src: "i/Mission-Dolores-Park.min.jpg", loaded: false},
  {src: "i/Alameda-South-Shore-Beach.min.jpg", loaded: false}
];
let backgroundImage = backgroundImages[0];
let backgroundElement = document.getElementById("background");
let numLoaded = 0;

function setBackgroundImage(image) {
  backgroundImage = image;
  backgroundElement.style.backgroundImage = "url(" + image.src + ")";
}

function changeImage() {
  let images = backgroundImages.filter((image) => image.loaded);
  if (images.length > 1) {
    let index = images.indexOf(backgroundImage);
    index++;
    if (index === images.length) index = 0;
    setBackgroundImage(images[index]);
  }
}

backgroundImages.forEach((image) => {
  let element = document.createElement("img");
  element.onload = () => {
    image.loaded = true;
    if (numLoaded === 0) {
      setBackgroundImage(image);
      setInterval(changeImage, 15000);
    }
    numLoaded++;
    element.remove();
  };
  element.src = image.src;
});

const myface_container = document.getElementById("myface-container");
const myface_border = document.getElementById("myface-border");
const myface_image = document.getElementById("myface-image");

let run_loop = true;
let top_right = false;
let bottom_right = true;
let bottom_left = false;
let top_left = false;

function updateBorderRadius() {
  let className = "";
  className += top_right ? "top-right " : "";
  className += bottom_right ? "bottom-right " : "";
  className += bottom_left ? "bottom-left " : "";
  className += top_left ? "top-left" : "";
  myface_border.className = className
}

myface_container.addEventListener("mouseout", e => {
  run_loop = true;
});

myface_container.addEventListener("mousemove", e => {
  const x0 = e.target === myface_container ? e.target.clientLeft : (e.target === myface_image ? e.target.parentElement.clientLeft : null);
  const y0 = e.target === myface_container ? e.target.clientTop : (e.target === myface_image ? e.target.parentElement.clientTop : null);
  const x1 = e.target === myface_container ? e.target.clientWidth + x0 : (e.target === myface_image ? e.target.parentElement.clientWidth + x0 : null);
  const y1 = e.target === myface_container ? e.target.clientHeight +y0 : (e.target === myface_image ? e.target.parentElement.clientHeight + y0 : null);
  if (x0 === null || y0 === null || x1 === null || y1 === null) {
    console.error("Whoops! There's a bug. Help me by reporting it at https://github.com/sean-krail/website/issues/new");
  }
  run_loop = false;
  const xHalf = x0 + (x0 + x1) / 2;
  const yHalf = y0 + (y0 + y1) / 2;
  const x = e.layerX;
  const y = e.layerY;
  top_right = false;
  bottom_right = false;
  bottom_left = false;
  top_left = false;
  if (x < xHalf) {
    if (y < yHalf) {
      top_left = true;
    } else {
      bottom_left = true;
    }
  } else {
    if (y < yHalf) {
      top_right = true;
    } else {
      bottom_right = true;
    }
  }
  updateBorderRadius();
});

setInterval(function() {
  if (!run_loop) return;
  if (top_right) {
    top_right = false;
    bottom_right = true;
  } else if (bottom_right) {
    bottom_right = false;
    bottom_left = true;
  } else if (bottom_left) {
    bottom_left = false;
    top_left = true;
  } else {
    top_left = false;
    top_right = true;
  }
  updateBorderRadius();
}, 3219);
