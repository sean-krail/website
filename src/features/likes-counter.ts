const LIKES_COUNTER_URL = "https://api.seankrail.dev/count/likes";
const MAX_LIKES_PER_SESSION = 3;
const LIKES_CONTAINER = document.getElementById("likes-container");
const LIKES_THUMB = document.getElementById("likes-thumb");
const LIKES_COUNT = document.getElementById("likes-count");

let isLikeEnabled = false;
let totalLikes = 0;
let likesThisSession = 0;

function setLikesCount(likes: number) {
  LIKES_CONTAINER.style.visibility = "visible";
  LIKES_COUNT.innerHTML = `${likes}`;
  LIKES_CONTAINER.style.opacity = "1";
  isLikeEnabled = true;
}

async function getLikes(): Promise<number> {
  const response = await window.fetch(LIKES_COUNTER_URL, { method: "GET" });
  totalLikes = Number(await response.text());
  return totalLikes;
}

async function like() {
  if (isLikeEnabled) {
    if (likesThisSession < MAX_LIKES_PER_SESSION) {
      window.fetch(LIKES_COUNTER_URL, { method: "POST" });
      LIKES_THUMB.style.fontVariationSettings = "'FILL' 1";
    }
    likesThisSession += 1;
    totalLikes += 1;
    setLikesCount(totalLikes);
  }
}

export async function loadLikesCounter() {
  setLikesCount(await getLikes());

  LIKES_CONTAINER.addEventListener("click", () => like());
}
