const myFaceContainer = document.getElementById("myface-container");
const myFaceBorder = document.getElementById("myface-border");
const myFaceImage = document.getElementById("myface-image");

let runLoop = true;
let topRight = false;
let bottomRight = true;
let bottomLeft = false;
let topLeft = false;

function updateBorderRadius() {
  let className = "";
  className += topRight ? "top-right " : "";
  className += bottomRight ? "bottom-right " : "";
  className += bottomLeft ? "bottom-left " : "";
  className += topLeft ? "top-left" : "";
  myFaceBorder.className = className;
}

export default function animateBorder() {
  myFaceContainer.addEventListener("mouseout", () => {
    runLoop = true;
  });

  myFaceContainer.addEventListener("mousemove", (e) => {
    const target = e.target as HTMLElement;
    let x0;
    let y0;
    let x1;
    let y1;
    if (target === myFaceContainer) {
      x0 = target.clientLeft;
      y0 = target.clientTop;
      x1 = target.clientWidth + x0;
      y1 = target.clientHeight + y0;
    } else if (target === myFaceImage) {
      x0 = target.parentElement.clientLeft;
      y0 = target.parentElement.clientTop;
      x1 = target.parentElement.clientWidth + x0;
      y1 = target.parentElement.clientHeight + y0;
    }
    if (x0 === null || y0 === null || x1 === null || y1 === null) {
      console.error(
        "Whoops! There's a bug. Help me by reporting it: https://github.com/sean-krail/website/issues/new"
      );
      return;
    }
    runLoop = false;
    const xHalf = x0 + (x0 + x1) / 2;
    const yHalf = y0 + (y0 + y1) / 2;
    // @ts-ignore
    const x = e.layerX as number;
    // @ts-ignore
    const y = e.layerY as number;
    topRight = false;
    bottomRight = false;
    bottomLeft = false;
    topLeft = false;
    if (x < xHalf) {
      if (y < yHalf) {
        topLeft = true;
      } else {
        bottomLeft = true;
      }
    } else if (y < yHalf) {
      topRight = true;
    } else {
      bottomRight = true;
    }
    updateBorderRadius();
  });

  setInterval(() => {
    if (!runLoop) {
      return;
    }
    if (topRight) {
      topRight = false;
      bottomRight = true;
    } else if (bottomRight) {
      bottomRight = false;
      bottomLeft = true;
    } else if (bottomLeft) {
      bottomLeft = false;
      topLeft = true;
    } else {
      // topLeft
      topLeft = false;
      topRight = true;
    }
    updateBorderRadius();
  }, 3219);
}
