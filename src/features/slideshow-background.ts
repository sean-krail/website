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
const CARD_ELEMENT = document.getElementById("card");

let backgroundImage = BACKGROUND_IMAGES[0];
let numLoaded = 0;

function setBackgroundImage(image: Image, first?: boolean) {
  backgroundImage = image;
  if (!first) {
    BACKGROUND_ELEMENT.style.opacity = "0";
  }
  BACKGROUND_ELEMENT.style.backgroundImage = `url(${image.src})`;
  BACKGROUND_ELEMENT.style.opacity = "1";
  if (first) {
    CARD_ELEMENT.style.boxShadow = "var(--black-box-shadow)";
  }
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

export default async function slideshowBackground() {
  BACKGROUND_IMAGES.forEach((image) => {
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
  });
}
