import mountDiablo from "url:../images/Mount-Diablo-Bay-View.jpg?as=webp";
import doloresPark from "url:../images/Mission-Dolores-Park.jpg?as=webp";
import alamedaSouthShore from "url:../images/Alameda-South-Shore-Beach.jpg?as=webp";

type Image = {
  src: string;
  loaded: boolean;
  element?: HTMLImageElement;
};

const BACKGROUND_IMAGES: Image[] = [
  { src: mountDiablo, loaded: false },
  { src: doloresPark, loaded: false },
  { src: alamedaSouthShore, loaded: false },
];
const BACKGROUND_ELEMENT = document.getElementById("background");

let backgroundImage = BACKGROUND_IMAGES[0];
let numLoaded = 0;

function setBackgroundImage(image: Image, first?: boolean) {
  backgroundImage = image;
  if (!first) {
    BACKGROUND_ELEMENT.style.opacity = "0";
  }
  BACKGROUND_ELEMENT.style.backgroundImage = `url(${image.src})`;
  BACKGROUND_ELEMENT.style.opacity = "1";
}

function changeImage() {
  const images = BACKGROUND_IMAGES.filter((image) => image.loaded);
  if (images.length > 1) {
    let index = images.indexOf(backgroundImage);
    index += 1;
    if (index === images.length) {
      index = 0;
    }
    setBackgroundImage(images[index]);
  }
}

function startSlideshow(mediaQuery: MediaQueryList | MediaQueryListEvent) {
  if (mediaQuery.matches) {
    BACKGROUND_IMAGES.forEach((image) => {
      if (!image.element) {
        const element = new Image();
        element.onload = () => {
          image.loaded = true;
          if (numLoaded === 0) {
            setBackgroundImage(image, true);
            setInterval(changeImage, 15000);
          }
          numLoaded += 1;
        };
        element.src = image.src;
        image.element = element;
      }
    });
  }
}

export default async function slideshowBackground() {
  const mediaQuery = window.matchMedia("(min-width: 1000px)");
  startSlideshow(mediaQuery);
  mediaQuery.addEventListener("change", startSlideshow);
}
