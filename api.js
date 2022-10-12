const getData = async (url) => {
  const obj = fetch(url);
  return (await obj).json();
};

const data = "https://api.tvmaze.com/search/shows?q=girls";
try {
  const res = await getData(data);
  document.querySelector(".card-title").innerHTML = res[0].show.name;
} catch (error) {
  console.error(error.message);
}
