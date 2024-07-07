const SearchInput = document.querySelector(".SearchInput");
const SearchBtn = document.querySelector(".Search");
const ShowMore = document.querySelector(".ShowMore");
const imgResult = document.querySelector(".imgResult");

let Keyword = "";
let page = 1;
let accessKey = "hO3OBvXrrnucNuOXeOOd9OQbvaJ1IX4TSBANyQ2N1hA";

async function searchImage() {
  Keyword = SearchInput.value;
  const urlAPI = `https://api.unsplash.com/search/photos?page=${page}&query=${Keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(urlAPI);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    imgResult.innerHTML = "";
  }
  results.map((result) => {
    const image = document.createElement("img");
    const imageLink = document.createElement("a");
    image.src = result.urls.small;
    imageLink.href = result.urls.full;
    imageLink.target = "_blank";
    imageLink.download = `image_${result.id}.jpg`;
    imageLink.classList.add("img_created");
    imageLink.appendChild(image);
    imgResult.appendChild(imageLink);
  });
  ShowMore.style.display = "block";
}

SearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

ShowMore.addEventListener("click", () => {
  page++;
  searchImage();
});
