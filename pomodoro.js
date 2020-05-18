let workTime = 1500; //sets default work clock time
let breakTime = 300; //sets default break time
let currentTime = workTime;
let timerActive = false; 
let timerMode = "work"
let intervalId;

//query selectors
const clockDisplay = document.querySelector("#display");
const toggleButton = document.querySelector("#timerToggleBtn");
const displayModeDiv = document.querySelector("#displayMode")
const timeValueContainer = document.querySelector("#timeValueContainer")
const workTimeDisplay = document.querySelector("#workTimeDisplay")
const breakTimeDisplay = document.querySelector("#breakTimeDisplay")




//this function updates the timer to change your session/break time
function updateTime() {
    currentTime--;
    clockDisplay.textContent = convertToDisplayTime(currentTime);    
    
    checkTime();
} 

function convertToDisplayTime(time){
    let seconds = (currentTime%60).toFixed(0) || "00";
    let minutes = ((currentTime/60) % 60).toFixed(0); 
    seconds = (seconds<10) ? "0" + seconds : seconds;
    (minutes >= 1) ? (minutes -= 1) : minutes;
    return `${minutes}:${seconds}`;
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
    if (currentTime <= 0 && timerMode === "work"){ //switch to break time
        currentTime = breakTime;
        timerMode = "break";
        displayModeDiv.textContent = "break"
        clockDisplay.textContent = convertToDisplayTime(breakTime);
        toggleTimer();
    }
    else if (currentTime <= 0 && timerMode === "break"){ //switch to work time
        currentTime = workTime;
        timerMode = "work";
        displayModeDiv.textContent = "work"
        clockDisplay.textContent = convertToDisplayTime(workTime);
        toggleTimer();
    }
}

function changeTimeValue(event){
    console.log("hi")
   // if (event.target.className !== "increment") return; //ends the function if the selected element isn't a button

    if(event.target.value === "workIncrease"){
        workTime++;
        console.log(workTime);
        workTimeDisplay.textContent = convertToDisplayTime(workTime);
    } 
    else if(event.target.value == "workIncrease"){
        workTime--;
        workTimeDisplay.value = convertToDisplayTime(workTime);
    }
    else if(event.target.value == "workIncrease"){
        breakTime++;
        breakTimeDisplay.textContent = convertToDisplayTime(breakTime);
    }
    else if (event.target.value == "workIncrease"){
        breakTime--;
        breakTimeDisplay.textContent = convertToDisplayTime(breakTime);
    }
}

//event listeners
toggleButton.addEventListener("click",toggleTimer);
timeValueContainer.addEventListener("click", changeTimeValue);

