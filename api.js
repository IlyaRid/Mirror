const searchApi = `https://api.tvmaze.com/search/shows?q=`;
let card;

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
    }
  } catch (error) {
    console.log(error.message);
  }
};

for (let index = 1; index <= 8; index++) {
  const data = `https://api.tvmaze.com/shows/${index}`;
  getData(data);
}

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

  card = document.querySelector(".card");
  console.log(card);
}

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

    const window = document.querySelector(".moduleWin");
    window.innerHTML = `<img src="" class="card-img-top" alt="" />
     <div class="truncate-text">
      <h5 class="card-title">Name</h5>
      <p class="card-text">
        Description
      </p>
     </div>
      <p class="card-text" style="margin-top: 15px;"><small>Ended: </small></p>`;
  } catch (error) {
    console.log(error.message);
  }
};

card.addEventListener("click", () => {
  openModule(`https://api.tvmaze.com/shows/${card.id}`);
  console.log(moduleWin.id);
});
