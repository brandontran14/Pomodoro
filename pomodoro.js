let workTime = 1500; //sets default work clock time
let breakTime = 0; //sets default break time
let currentTime = workTime
let timerActive = false; 
let intervalId;

//query selectors
const clockDisplay = document.querySelector("#display");
const toggleButton = document.querySelector("#timerToggleBtn");



//this function updates the timer to change your session/break time
function updateTime() {
    let seconds = (currentTime%60).toFixed(0) || "00";
    let minutes = ((cururrentTime/60) % 60).toFixed(0); 
    seconds = (seconds<10) ? "0" + seconds : seconds;
    (minutes >= 1) ? (minutes -= 1) : minutes;
    let displayTime = `${minutes}:${seconds}`;
    clockDisplay.textContent = displayTime;  
    currentTime--;
    //checkTime();
} 

//this function toggles the timer to start/pause
function toggleTimer(){
    if(timerActive){
        stopTimer();
        timerActive = false;
        toggleButton.textContent = "Start";
}
    //timeractive == false 
    else{
        startTimer();
        timerActive = true;
        toggleButton.textContent = "Pause";
    }
}

//this function starts the timer by calling setInterval
function startTimer(){
    intervalId = setInterval(updateTime ,1000);
}

//this function stops the timer 
function stopTimer(){
    clearInterval(intervalId);
}

function checkTime(){
    if (breakTime === 0)
        (startTimer )
    }
    else{
        breakTime = 300
        currentTime = workTime
    }
}

//event listeners
toggleButton.addEventListener("click",toggleTimer);
