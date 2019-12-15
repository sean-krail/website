type Image = {
  src: string,
  loaded: boolean,
};

const BACKGROUND_IMAGES: Image[] = [
  { src: 'i/Mount-Diablo-Bay-View.min.jpg', loaded: false },
  { src: 'i/Mission-Dolores-Park.min.jpg', loaded: false },
  { src: 'i/Alameda-South-Shore-Beach.min.jpg', loaded: false },
];
const BACKGROUND_ELEMENT = document.getElementById('background');

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
    index++;
    if (index === images.length) {
      index = 0;
    }
    setBackgroundImage(images[index]);
  }
}

export function continuouslyRotateBackgroundImage() {
  BACKGROUND_IMAGES.forEach((image) => {
    const element = document.createElement('img');
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
}
