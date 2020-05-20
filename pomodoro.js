let workTime = 1500; //sets default work clock time
let breakTime = 300; //sets default break time
let currentTime = workTime;
let timerActive = false; 
let timerMode = "work"
let intervalId;

//query selectors
const clockDisplay = document.querySelector("#display");
const startstopbtn = document.querySelector("#startstopbtn");
const displayModeDiv = document.querySelector("#displayMode");
const WorkandBreakContainer = document.querySelector("#WorkandBreakContainer");
const workTimeDisplay = document.querySelector("#workTimeDisplay");
const breakTimeDisplay = document.querySelector("#breakTimeDisplay");
const pageTitle = document.querySelector("title");
const resetbtn = document.querySelector("#reset");
const workbtn = document.querySelector("#workbtn");
const breakbtn = document.querySelector("#breakbtn");



//this function updates the timer to change your session/break time
function updateTime() {
    currentTime--; 
    updateDisplay();
    updateTitle();
    checkTime();
} 

function updateDisplay(){
    clockDisplay.textContent = convertToDisplayTime(currentTime);   
}

function updateTitle(){
    pageTitle.textContent = `Pomodoro Timer ${convertToDisplayTime(currentTime)} ${timerMode.toUpperCase()}`;
}

//converts display time into nice numbers
function convertToDisplayTime(time){
    let minutes = Math.floor(time / 60); 
    let seconds = (time - minutes * 60);
    seconds = (seconds<10) ? "0" + seconds : seconds; //formatting seconds
    return `${minutes}:${seconds}`;
}
//this function toggles the timer to start/pause
function toggleTimer(){
    if(timerActive){
        stopTimer();
        timerActive = false;
        startstopbtn.textContent = "Start";
}
    //timeractive == false 
    else{
        startTimer();
        timerActive = true;
        startstopbtn.textContent = "Pause";
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


//this function switches work/break once time runs out
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

//this function changes how much worktime/breaktime there is
function changeTimeValue(event){
    if(event.target.value === "workIncrease"){
        workTime += 60; //workTime units is seconds
        workTimeDisplay.textContent = convertToDisplayTime(workTime);
    } 
    else if(event.target.value == "workDecrease"){
        workTime = (workTime <= 0) ? 0 : workTime -= 60; //doesnt allow negatives in the display
        workTimeDisplay.textContent = convertToDisplayTime(workTime);
    }
    else if(event.target.value == "breakIncrease"){
        breakTime += 60;
        breakTimeDisplay.textContent = convertToDisplayTime(breakTime);
    }
    else if (event.target.value == "breakDecrease"){
        breakTime = (breakTime <= 0) ? 0 : breakTime -= 60;
        breakTimeDisplay.textContent = convertToDisplayTime(breakTime);
    }
}

//this function resets everything (defaults to work mode)
function reset(){
    stopTimer();
    currentTime = workTime;
    timerActive = false;
    timerMode = "work"
    workTimeDisplay.textContent = convertToDisplayTime(currentTime);
    displayModeDiv.textContent = "work"
    startstopbtn.textContent = "Start"
    updateDisplay();
    updateTitle();
}

function switchtowork(){
    reset();

}

function switchtobreak(){
    reset();
    timerMode = "break"
    currentTime = breakTime;
    breakTimeDisplay.textContent = convertToDisplayTime(currentTime);
    displayModeDiv.textContent = "break"
    updateDisplay();
    updateTitle();
}


//event listeners
startstopbtn.addEventListener("click",toggleTimer);
WorkandBreakContainer.addEventListener("click", changeTimeValue);
resetbtn.addEventListener("click", reset);
workbtn.addEventListener("click",switchtowork);
breakbtn.addEventListener("click",switchtobreak);