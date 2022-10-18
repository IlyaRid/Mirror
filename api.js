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

for (let index = 1; index <= 8; index++) {
  const data = `https://api.tvmaze.com/shows/${index}`;
  getData(data);
}

function showCard(serial) {
  const cards = document.querySelector(".row");

  const card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `<div class="card text-bg-dark h-100">
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
  cards.appendChild(card);
}
