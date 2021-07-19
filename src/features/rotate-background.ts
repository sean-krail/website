import mountDiablo from "url:../images/Mount-Diablo-Bay-View.jpg?as=webp";
import doloresPark from "url:../images/Mission-Dolores-Park.jpg?as=webp";
import alamedaSouthShore from "url:../images/Alameda-South-Shore-Beach.jpg?as=webp";

type Image = {
  src: string;
  loaded: boolean;
};

const BACKGROUND_IMAGES: Image[] = [
  { src: mountDiablo, loaded: false },
  { src: doloresPark, loaded: false },
  { src: alamedaSouthShore, loaded: false },
];
const BACKGROUND_ELEMENT = document.getElementById("background");

let backgroundImage = BACKGROUND_IMAGES[0];
let numLoaded = 0;

function setBackgroundImage(image: Image) {
  backgroundImage = image;
  BACKGROUND_ELEMENT.style.backgroundImage = `url(${image.src})`;
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

export default function continuouslyRotateBackgroundImage() {
  BACKGROUND_IMAGES.forEach((image) => {
    const element = document.createElement("img");
    element.onload = () => {
      // eslint-disable-next-line no-param-reassign
      image.loaded = true;
      if (numLoaded === 0) {
        setBackgroundImage(image);
        setInterval(changeImage, 15000);
      }
      numLoaded += 1;
      element.remove();
    };
    element.src = image.src;
  });
}
