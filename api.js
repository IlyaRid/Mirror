const searchApi = `https://api.tvmaze.com/search/shows?q=`;

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const api = await response.json();
    // console.log(api);

    if (Array.isArray(api)) {
      document.querySelector(".row").innerHTML = "";
      api.forEach((element) => {
        showCard(element.show);
      });
    } else {
      showCard(api);
      // console.log(card);
    }
  } catch (error) {
    console.log(error.message);
  }
};

function showCard(serial) {
  const cards = document.querySelector(".row");
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = `<div class="card text-bg-dark h-100" id="${serial.id}">
  <img src="${serial.image.original}" class="card-img-top" alt="${serial.name}" />
  <div class="card-img-overlay">
   <div class="truncate-text">
    <h5 class="card-title">${serial.name}</h5>
    <p class="card-text">
      ${serial.summary}
    </p>
   </div>
    <p class="card-text" style="margin-top: 15px;"><small>Ended: ${serial.ended}</small></p>
  </div>
  </div>`;

  cards.appendChild(col);
}

const paint = async () => {
  async function paintStartCards() {
    for (let index = 1; index <= 8; index++) {
      const data = `https://api.tvmaze.com/shows/${index}`;
      await getData(data);
    }
  }
  await paintStartCards();
  const card = document.querySelectorAll(".card");
  // console.log(card);
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", () => {
      openModule(`https://api.tvmaze.com/shows/${card[i].id}`);
      // console.log(card[i].id);
    });
  }
};

paint();

const form = document.querySelector("form");
//console.log(form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  const keyword = `${searchApi}${input.value}`;
  //console.log(keyword);
  if (input.value) {
    getData(keyword);
  }
  input.value = "";
});

//Module window

const openModule = async (url) => {
  try {
    const response = await fetch(url);
    const windowApi = await response.json();
    console.log(windowApi);

    const window = document.querySelector(".moduleBack");
    window.classList.add("module-show");
    window.innerHTML = `
    <div class="moduleWin">
      <img src="${windowApi.image.original}" class="img-module" alt="${windowApi.name}" />
      <div class="module-text">
        <h5 class="title-module">${windowApi.name}</h5><br>
        <p><b>Genres:</b> ${windowApi.genres}<br><br>
        <b>Rating: <span class="rating">${windowApi.rating.average}</span></b>
        ${windowApi.summary}</p>
        <p class="module-ended"><small>Ended: ${windowApi.ended}</small></p>
      </div>
    </div>`;
    const rating = document.querySelector(".rating");
    if (windowApi.rating.average >= 8) {
      rating.classList.add("rating-green");
    } else if (windowApi.rating.average < 8 && windowApi.rating.average >= 6) {
      rating.classList.add("rating-orange");
    } else {
      rating.classList.add("rating-red");
    }
  } catch (error) {
    console.log(error.message);
  }
};
