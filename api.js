const getData = async (url) => {
  try {
    const response = await fetch(url);
    const obj = await response.json();
    console.log(obj);
    showCard(obj);
  } catch (error) {
    console.log(error.message);
  }
};

for (let index = 1; index <= 3; index++) {
  const data = `https://api.tvmaze.com/shows/${index}`;
  getData(data);
}

function showCard(serial) {
  const cards = document.querySelector(".row");

  const card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `<div class="card h-100">
  <img src="${serial.image.original}" class="card-img-top" alt="${serial.name}" />
  <div class="card-body">
    <h5 class="card-title">${serial.name}</h5>
    <p class="card-text">
      ${serial.summary}
    </p>
  </div>
  <div class="card-footer">
    <small class="text-muted">Ended: ${serial.ended}</small>
  </div></div>`;
  cards.appendChild(card);
}
