let favorites = JSON.parse(localStorage.favArray); //// массив с избранными сериалами

const openModule = async (url) => {
  const windowEl = document.querySelector(".moduleBack");
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
        <img src="${windowApi.image.original}" class="img-module" alt="${
      windowApi.name
    }" />
        <div class="module-text">
          <img src="/img/cross.svg" class="close-button" alt="close button"/>
          <h5 class="title-module">${windowApi.name}</h5><br>
          <p><b>Genres:</b> ${windowApi.genres}<br><br>
          <b>Rating: <span class="rating">${rat}</span></b>
          ${windowApi.summary}</p>
          <p class="module-ended"><small>Ended: ${end}</small></p>
          <button class="${
            favorites.includes(String(windowApi.id))
              ? "favorites favorites-true"
              : "favorites"
          }" type="checkbox" id="${windowApi.id}">To favorites</button>
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
    if (favorites.includes(String(checkbox.id))) {
      checkbox.classList.remove("favorites-true");
      favorites = favorites.filter((item) => item != checkbox.id);
    } else {
      checkbox.classList.add("favorites-true");
      favorites.push(checkbox.id);
    }
    // console.log(favorites);
    localStorage.favArray = JSON.stringify(favorites);
  });

  function closeModule() {
    windowEl.classList.remove("module-show");
  }

  const closeButton = document.querySelector(".close-button"); //// Ловим кнопку закрытия
  closeButton.addEventListener("click", () => closeModule());

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
};

export default openModule;
