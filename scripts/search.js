import hookCard from "./hookCard.js";
import getData from "./getData.js";

const searchApi = `https://api.tvmaze.com/search/shows?q=`;

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

export default search;
