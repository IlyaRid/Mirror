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
      <p><small>Ended: ${end}</small></p>
    </div>
    </div>`;

  cards.appendChild(col);
}

//// Отрисовка страницы
const paint = async () => {
  async function paintStartCards() {
    const indexs = JSON.parse(localStorage.favArray);
    //// Циклом вызывается отрисовка всех карточек
    for (let i = 0; i < indexs.length; i++) {
      const data = `https://api.tvmaze.com/shows/${indexs[i]}`;
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
