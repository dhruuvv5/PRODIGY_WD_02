// Stopwatch functionality
let timer;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

// DOM elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseResumeButton = document.getElementById('pause-resume');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

// Format time in HH:MM:SS:MS
function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = ms % 1000;
    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(3, '0')
    };
}

// Update time display
function updateTimeDisplay() {
    const time = formatTime(elapsedTime);
    hoursDisplay.textContent = time.hours;
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
    millisecondsDisplay.textContent = time.milliseconds;
}

// Start stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime += 10; // Increment by 10ms for better precision
            updateTimeDisplay();
        }, 10);
        startButton.disabled = true;
        pauseResumeButton.textContent = 'Pause';
        pauseResumeButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

// Pause or resume stopwatch
function pauseResumeStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    } else {
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime += 10;
            updateTimeDisplay();
        }, 10);
        pauseResumeButton.textContent = 'Pause';
    }
}

// Reset stopwatch
function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateTimeDisplay();
    lapList.innerHTML = ''; // Clear lap times
    startButton.disabled = false;
    pauseResumeButton.textContent = 'Pause';
    pauseResumeButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapCounter = 1; // Reset lap counter
}

// Add lap
function addLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime.hours}:${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}`;
        lapList.appendChild(lapItem);
    }
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseResumeButton.addEventListener('click', pauseResumeStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);
