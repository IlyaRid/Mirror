let index = 2;

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const obj = await response.json();
    console.log(obj);
    console.log(`title${[index]}`);
    document.getElementById(`title${[index]}`).innerHTML = obj.name;
    document.getElementById(`img${[index]}`).src = obj.image.original;
    document.getElementById(`description${[index]}`).innerHTML = obj.summary;
  } catch (error) {
    console.log(error.message);
  }
};

do {
  const data = `https://api.tvmaze.com/shows/${[index]}`;
  console.log(index);
  getData(data);
  index++;
} while (index < 3);
