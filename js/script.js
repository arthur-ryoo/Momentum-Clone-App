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

function init() {
  showTime();
  setInterval(showTime, 1000);
}

init();
