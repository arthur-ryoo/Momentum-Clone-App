// Geolocation
const COORDS = 'coords';
let latitude;
let longitude;

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askCoordinates();
  } else {
    const jsonParse = JSON.parse(loadedCoords);
    latitude = jsonParse.latitude;
    longitude = jsonParse.longitude;
    loadWeather();
  }

  function askCoordinates() {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    const coordsObject = { latitude, longitude };
    saveCoords(coordsObject);
  }

  function error() {
    console.log("Can't access geo location");
  }

  function saveCoords(coordsObject) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
  }
}

// Weather API

function loadWeather() {
  console.log(latitude + longitude);
  const weatherPosition = `lat=${latitude}&lon=${longitude}`;
  const API_KEY = '&appid=b9f45391760c4343ac18d9fe52f90d80';
  const weatherUrl =
    'http://api.openweathermap.org/data/2.5/weather?' +
    weatherPosition +
    API_KEY;
  const promise = $.ajax({
    url: weatherUrl
  });
  promise.then(
    data => {
      let temp = data.main.temp - 273.15;
      $('#temp').html(temp.toString().substring(0, 3) + ' °C');
      $('#description').html(data.weather[0].description);
      $('#icon').empty();
      $('#icon').prepend(
        '<img id="image" src=http://openweathermap.org/img/wn/' +
        data.weather[0].icon +
        '@2x.png>'
      );
    },
    error => {
      console.log('bad request: ', error);
    }
  );
}

// Unsplash API
function unsplashRandomBackground() {
  const accessKey =
    '517cc5617a9b969a5b3a6f756d3f5662f41668588bed14acb8fc351b37cde8d8';
  const url = 'https://api.unsplash.com/photos/random?client_id=' + accessKey;
  const promise = $.ajax({
    url: url
  });
  promise.then(
    data => {
      $('#unsplash').css('background-image', 'url(' + data.urls.regular + ')');
      $('.image-location').html(data.user.location);
      $('.first-last-name').html(
        'Photo by ' +
        data.user.first_name +
        ' ' +
        data.user.last_name +
        ' / Unsplash'
      );
    },
    error => {
      console.log('bad request: ', error);
    }
  );
}

// Clock
const clockContainer = document.querySelector('.clock');
const clockTitle = document.querySelector('.clock-title');

function showTime() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  clockTitle.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
    }:${second < 10 ? `0${second}` : second}`;
}

// To do list
const toDoListContainer = document.querySelector('.todolist');
const toDoListInput = document.querySelector('.todolist-input');
const toDoListItem = document.querySelector('.todolist-item');

function addToDoList(text) {
  const liList = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = text;
  liList.appendChild(span);
  toDoListItem.appendChild(liList);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = toDoListInput.value;
  addToDoList(inputValue);
  toDoListInput.value = '';
}

function init() {
  // Clock
  showTime();
  setInterval(showTime, 1000);

  // To do list
  toDoListContainer.addEventListener('submit', handleSubmit);

  // Unsplash
  unsplashRandomBackground();

  // Geolocation
  loadCoords();
}
init();
