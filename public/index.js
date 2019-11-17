let backgroundImages = [
  {src: "assets/Mount-Diablo-Bay-View.min.jpg", loaded: false},
  {src: "assets/Mission-Dolores-Park.min.jpg", loaded: false},
  {src: "assets/Alameda-South-Shore-Beach.min.jpg", loaded: false}
];
let backgroundImage = backgroundImages[0];
let backgroundElement = document.getElementById("background");
let numLoaded = 0;

function setBackgroundImage(image) {
  let url = "url(" + image.src + ")";
  backgroundImage = image;
  backgroundElement.style.backgroundImage = url;
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
