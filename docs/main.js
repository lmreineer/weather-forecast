function displayCurrentTime() {
  const currentTime = document.querySelector('.current-time');
  const date = new Date();
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const time = date.toLocaleTimeString('en-US', options);
  currentTime.innerText = `Current time: ${time}`;
}

displayCurrentTime();
