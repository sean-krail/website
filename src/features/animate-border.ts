const MY_FACE_CONTAINER = document.getElementById("myface-container");
const MY_FACE = document.getElementById("myface");

let intervalId = -1;
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
  MY_FACE.className = className;
}

function startLoop() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
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

export default async function animateBorder() {
  MY_FACE_CONTAINER.addEventListener("mouseout", () => startLoop());
  MY_FACE_CONTAINER.addEventListener("mouseup", () => startLoop());

  MY_FACE_CONTAINER.addEventListener("mousemove", (e) => {
    // Pause the border radius loop while mouse is in this element
    clearInterval(intervalId);

    /*
    (x0,y0)------+
       |         |
       |  (x,y)  |
       |         |
       +------(x1,y1)
    */
    const rect = MY_FACE_CONTAINER.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const x0 = 0;
    const y0 = 0;
    const x1 = rect.width;
    const y1 = rect.height;
    // console.log("x:", x, ", y:", y, ", x0:", x0, ", y0", y0, ", x1:", x1, ", y1:", y1);

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

  startLoop();
}
