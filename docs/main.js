function displayCurrentTime() {
  const currentTime = document.querySelector('.current-time');
  const date = new Date();
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const time = date.toLocaleTimeString('en-US', options);
  currentTime.innerText = `Current time: ${time}`;
}

// setInterval(displayCurrentTime(), 1000);
displayCurrentTime();

const hourly = document.querySelector('.hourly');
const daily = document.querySelector('.daily');

hourly.addEventListener('click', () => {
  hourly.style.border = '1px solid black';
  daily.style.border = 'none';
});

daily.addEventListener('click', () => {
  daily.style.border = '1px solid black';
  hourly.style.border = 'none';
});
