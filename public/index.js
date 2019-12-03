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
myface_container.addEventListener("mousemove", e => {
  const x0 = e.target === myface_container ? e.target.clientLeft : (e.target === myface_image ? e.target.parentElement.clientLeft : null);
  const y0 = e.target === myface_container ? e.target.clientTop : (e.target === myface_image ? e.target.parentElement.clientTop : null);
  const x1 = e.target === myface_container ? e.target.clientWidth + x0 : (e.target === myface_image ? e.target.parentElement.clientWidth + x0 : null);
  const y1 = e.target === myface_container ? e.target.clientHeight +y0 : (e.target === myface_image ? e.target.parentElement.clientHeight + y0 : null);
  if (!x0 || !y0 || !x1 || !y1) {
    console.error("Whoops! There's a bug. Help me by reporting it at https://github.com/sean-krail/website/issues/new");
  }
  const xHalf = x0 + (x0 + x1) / 2;
  const yHalf = y0 + (y0 + y1) / 2;
  const x = e.layerX;
  const y = e.layerY;
  if (x < xHalf) {
    if (y < yHalf) {
      myface_border.className = "top-left"
    } else {
      myface_border.className = "bottom-left"
    }
  } else {
    if (y < yHalf) {
      myface_border.className = "top-right"
    } else {
      myface_border.className = "bottom-right"
    }
  }
});
