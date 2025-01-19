
const stopwatchDisplay = document.querySelector('h1');
const startButton = document.querySelector('.button:nth-of-type(1)');
const stopButton = document.querySelector('.button:nth-of-type(2)');
const resetButton = document.querySelector('.button:nth-of-type(3)');
const lapButton = document.querySelector('.button:nth-of-type(4)');
const lapsContainer = document.querySelector('.laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            stopwatchDisplay.textContent = formatTime(elapsedTime);
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    stopwatchDisplay.textContent = "00:00:00";
    lapsContainer.innerHTML = ""; // Clear all laps
}

function addLap() {
    if (elapsedTime > 0) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}


startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);

