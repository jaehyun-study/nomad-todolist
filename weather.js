const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      const temp = json.main.temp;
      const name = json.name;
      weather.innerText = `${temp}℃ @ ${name}`;
    });
}

function loadCoords() {
  return JSON.parse(localStorage.getItem(COORDS));
}

function saveCoords(coords) {
  return localStorage.setItem(COORDS, JSON.stringify(coords));
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(
    // success
    pos => {
      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };
      saveCoords(coords);
      getWeather(coords.latitude, coords.longitude);
    },
    // error
    () => {
      console.error("can't get current position");
    }
  );
}

function renderWeather() {
  let coords = loadCoords();
  if (coords === null) {
    coords = askCoords();
  } else {
    getWeather(coords.latitude, coords.longitude);
  }
}

function init() {
  renderWeather();
}

init();
