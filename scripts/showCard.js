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

export default showCard;
