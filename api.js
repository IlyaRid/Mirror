const searchApi = `https://api.tvmaze.com/search/shows?q=`;
let favorites = []; //// массив с избранными сериалами

//// Выгрузка API
const getData = async (url) => {
  try {
    const response = await fetch(url);
    const api = await response.json();
    // console.log(api);

    if (Array.isArray(api)) {
      //// Передача API массивом (после поискового запроса)
      document.querySelector(".row").innerHTML = ""; //// Обновление страницы, стирание предыдущего вывода
      api.forEach((element) => {
        showCard(element.show);
      });
    } else {
      showCard(api); //// Передача API при первоначальной загрузке
      // console.log(card);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//// Отрисовка каждой карточки
function showCard(serial) {
  const cards = document.querySelector(".row");
  const col = document.createElement("div");
  col.classList.add("col");
  let end;
  if (serial.ended == null) {
    end = "continues";
  } else {
    end = serial.ended;
  }

  col.innerHTML = `<div class="card text-bg-dark h-100" id="${serial.id}">
  <img src="${serial.image.original}" class="card-img-top" alt="${serial.name}" />
  <div class="card-img-overlay">
   <div class="truncate-text">
    <h5 class="card-title">${serial.name}</h5>
    <p class="card-text">
      ${serial.summary}
    </p>
   </div>
    <p class="card-text" style="margin-top: 15px;"><small>Ended: ${end}</small></p>
  </div>
  </div>`;

  cards.appendChild(col);
}

//// Отрисовка страницы
const paint = async () => {
  async function paintStartCards() {
    //// Циклом вызывается отрисовка всех карточек
    for (let index = 1; index <= 40; index++) {
      const data = `https://api.tvmaze.com/shows/${index}`;
      await getData(data);
    }
  }
  await paintStartCards();
  hookCard(); //// Захват каждой карточки для дальнейшего взаимодействия
};

//// Функция захвата карточек
function hookCard() {
  const card = document.querySelectorAll(".card");
  // console.log(card);
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", () => {
      openModule(`https://api.tvmaze.com/shows/${card[i].id}`);
      // console.log(card[i].id);
    });
  }
}

paint(); //// Вызов отрисовки страницы

const form = document.querySelector("form");
//console.log(form);

////////////////////////////////////////////////////// Поиск ///////////////////////////////////////////////////////
function search() {
  const input = document.querySelector("input");
  const keyword = `${searchApi}${input.value}`;
  //console.log(keyword);
  if (input.value) {
    async function printSearch() {
      await getData(keyword);
      hookCard(); //// Захват карточек после вывода поиска
    }
    printSearch();
  }
  input.value = "";
}

//// Поиск по нажатию Enter
form.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
});

//// Поиск по нажатию кнопки
const search_btn = document.querySelector(".btn");
search_btn.addEventListener("click", () => search());

///////////////////////////////////////////////// Модальное окно ////////////////////////////////////////////////////
const windowEl = document.querySelector(".moduleBack");
// console.log(windowEl);

const openModule = async (url) => {
  try {
    const response = await fetch(url);
    const windowApi = await response.json();
    // console.log(windowApi);

    windowEl.classList.add("module-show");
    let end, rat;
    if (windowApi.ended == null) {
      end = "continues";
    } else {
      end = windowApi.ended;
    }

    if (windowApi.rating.average == null) {
      rat = "-";
    } else {
      rat = windowApi.rating.average;
    }
    windowEl.innerHTML = `
    <div class="moduleWin">
      <img src="${windowApi.image.original}" class="img-module" alt="${windowApi.name}" />
      <div class="module-text">
        <img src="/img/cross.svg" class="close-button" alt="close button"/>
        <h5 class="title-module">${windowApi.name}</h5><br>
        <p><b>Genres:</b> ${windowApi.genres}<br><br>
        <b>Rating: <span class="rating">${rat}</span></b>
        ${windowApi.summary}</p>
        <button class="favorites" type="checkbox" id="${windowApi.id}">To favorites</button>
        <p class="module-ended"><small>Ended: ${end}</small></p>
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

  const checkbox = document.querySelector(".favorites"); //// Добавляем в избранное
  checkbox.addEventListener("click", () => {
    checkbox.classList.add("favorites-true");
    favorites.push(checkbox.id);
    console.log(favorites);
  });

  const closeButton = document.querySelector(".close-button"); //// Ловим кнопку закрытия
  closeButton.addEventListener("click", () => closeModule());
};

//// Функция закрытия модалки
function closeModule() {
  windowEl.classList.remove("module-show");
}

//// Закрытие по нажатию мимо модалки
window.addEventListener("click", (e) => {
  if (e.target === windowEl) {
    closeModule();
  }
});

//// Закрытие по нажатию Esc
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModule();
  }
});

export { favorites };

// export default new Promise(async ($export) => {
//   // await anything that needs to be imported
//   // await anything that asynchronous
//   // finally export the module resolving the Promise
//   // as object, function, class, ... anything
//   $export(favorites);
// });
