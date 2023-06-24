let minutes = 25;
let seconds = 0;
let timer;
let isPaused = false;

function startTimer() {
  if (isPaused) {
    isPaused = false;
  } else {
    if (document.getElementById('goal').textContent === '') {
      openModal();
    }
    minutes = 25;
    seconds = 0;
  }
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      alert('Challenge completed!');
      startBreak();
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  document.getElementById('minutes').textContent = padTime(minutes);
  document.getElementById('seconds').textContent = padTime(seconds);
}

function startBreak() {
  minutes = 5;
  seconds = 0;
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function resetTimer() {
  clearInterval(timer);
  minutes = 25;
  seconds = 0;
  isPaused = true;
  document.getElementById('minutes').textContent = padTime(minutes);
  document.getElementById('seconds').textContent = padTime(seconds);
  document.getElementById('goal').textContent = '';
  openModal();
}

function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  const closeBtn = document.getElementsByClassName('close')[0];
  const goalBtn = document.getElementById('goalBtn');

  closeBtn.onclick = closeModal;
  goalBtn.onclick = setGoal;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function setGoal() {
  const goalInput = document.getElementById('goalInput');
  const goal = goalInput.value.trim();

  if (goal) {
    document.getElementById('goal').textContent = goal;
    closeModal();
  }
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('breakBtn').addEventListener('click', pauseTimer);
