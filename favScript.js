import getData from "./scripts/getData.js";
import hookCard from "./scripts/hookCard.js";
import search from "./scripts/search.js";

//// Отрисовка страницы
const paint = async () => {
  async function paintStartCards() {
    const indexs = JSON.parse(localStorage.favArray); //// Выгрузка избранного из localStorage
    //// Циклом вызывается отрисовка всех карточек
    for (let i = 0; i < indexs.length; i++) {
      const data = `https://api.tvmaze.com/shows/${indexs[i]}`;
      await getData(data);
    }
  }
  await paintStartCards();
  hookCard(); //// Захват каждой карточки для дальнейшего взаимодействия
};

paint(); //// Вызов отрисовки страницы

const form = document.querySelector("form");

//// Поиск по нажатию Enter
form.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
});

//// Поиск по нажатию кнопки
const search_btn = document.querySelector(".btn");
search_btn.addEventListener("click", () => search());
