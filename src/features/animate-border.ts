const myFaceContainer = document.getElementById("myface-container");
const myFace = document.getElementById("myface");

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
  myFace.className = className;
}

export default async function animateBorder() {
  myFaceContainer.addEventListener("mouseout", () => {
    runLoop = true;
  });

  myFaceContainer.addEventListener("mousemove", (e) => {
    /*
    (x0,y0)------+
       |         |
       |  (x,y)  |
       |         |
       +------(x1,y1)
    */
    const rect = myFaceContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const x0 = 0;
    const y0 = 0;
    const x1 = rect.width;
    const y1 = rect.height;
    // console.log("x:", x, ", y:", y, ", x0:", x0, ", y0", y0, ", x1:", x1, ", y1:", y1);

    // Pause the border radius loop while mouse is in this element
    runLoop = false;

    /*
    (x0,y0)---------xHalf------------+
       |   top-left   |  top-right   |
     yHalf----------(x,y)----------yHalf
       | bottom-left  | bottom-right |
       +------------xHalf---------(x1,y1)
    */
    const xHalf = x0 + (x0 + x1) / 2;
    const yHalf = y0 + (y0 + y1) / 2;
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
