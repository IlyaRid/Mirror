import showCard from "./showCard.js";

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

export default getData;
