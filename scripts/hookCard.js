import openModule from "./openModule.js";

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

export default hookCard;
