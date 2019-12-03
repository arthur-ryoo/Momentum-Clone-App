// Weather API

$('form').on('submit', event => {
  event.preventDefault();
  const userInput = $('input[type = "text"]').val();
  console.log(userInput);
  const promise = $.ajax({
    url:
      'http://api.openweathermap.org/data/2.5/weather?appid=b9f45391760c4343ac18d9fe52f90d80&q=' +
      userInput
  });
  promise.then(
    data => {
      $('#temp').html(data.main.temp - 273.15);
      console.log(data.main.temp);
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
});

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
const toDoListLocalStorage = 'toDo';

function addToDoList(text) {
  const liList = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  const span = document.createElement('span');
  span.innerText = text;
  liList.appendChild(span);
  liList.appendChild(deleteButton);
  toDoListItem.appendChild(liList);

  console.log(text);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = toDoListInput.value;
  addToDoList(inputValue);
  toDoListInput.value = '';
}

function loadToDoList() {
  const toDo = localStorage.getItem(toDoListLocalStorage);
}

function init() {
  // Clock
  showTime();
  setInterval(showTime, 1000);

  // To do list
  loadToDoList();
  toDoListContainer.addEventListener('submit', handleSubmit);
}
init();
