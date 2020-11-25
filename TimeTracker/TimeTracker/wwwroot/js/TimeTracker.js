//Todo: Refactor this to typescript. Use a common error or logging function
//Define variables
let toggleTimerButton = null;
let resetTimerButton = null;
let saveTimerButton = null;
let timer = null;
let startTime = null;
let timeSpan = 0;
let pausedTime = 0;
let isPaused = false;
let interval = null;


let toggleTimerClickFunction = function (event) {
    if (!toggleTimerButton || !timer) {
        console.log("toggleTimerButton or timer not set");
        return;
    }

    if (timeSpan === 0) {
        startTime = new Date();        
        interval = setInterval(timerIntervalFunction, 1000);
        toggleTimerButton.innerText = "Pause";
    }        
    else if (toggleTimerButton.innerText === "Pause") {
        isPaused = true;
        toggleTimerButton.innerText = "Start";
    }
        
    else { // toggleTimerButton.innerText === "start" && timeSpan !== 0
        isPaused = false;
        toggleTimerButton.innerText = "Pause";
    }
}

let resetTimerClickFunction = function (event) {
    if (!resetTimerButton || !timer) {
        console.log("resetTimerButton or timer not set");
        return;
    }

    clearInterval(interval);
    interval = null;
    timer.innerText = "00:00:00";
    toggleTimerButton.innerText = "Start";
    startTime = null;
    isPaused = false;
    timeSpan = 0;
    pausedTime = 0;
}

let saveTimerClickFunction = function (event) {
    if (!saveTimerButton || !timer) {
        console.log("saveTimerButton or timer not set");
        return;
    }

    //Todo: should maybe not know the other fields.
    durationInput.value = timeSpan;
    let date = new Date();
    finishDateInput.value = date.toISOString().substring(0, 10);
    
    let promise = new Promise(function (resolve, reject) {        
        let result = saveTaskFormFunction();

        if (result)
            resolve();
        else
            reject();
    }).then(resetTimerClickFunction, function () { console.log("error during save") });

    return promise;
}

let timerIntervalFunction = function () {
    if (!timer) {
        console.log("timer not set");
        return;
    }

    if (isPaused) {
        pausedTime = new Date() - startTime - timeSpan //update the pause time with the difference since the stop
    }
    else {
        timeSpan = new Date() - startTime - pausedTime; //add the ticks to the timespan and remove pause times
        timer.innerText = new Date(timeSpan).toLocaleString("de-DE", { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }); //display the timespan
    }
}

//register functionality to buttons and elements
let initTimeTracker = function () {
    toggleTimerButton = document.getElementById("toggleTimerButton");
    resetTimerButton = document.getElementById("resetTimerButton");
    saveTimerButton = document.getElementById("saveTimerButton");
    timer = document.getElementById("timer");


    if (!!toggleTimerButton)
        toggleTimerButton.addEventListener("click", toggleTimerClickFunction)
    if (!!resetTimerButton)
        resetTimerButton.addEventListener("click", resetTimerClickFunction)
    if (!!saveTimerButton)
        saveTimerButton.addEventListener("click", saveTimerClickFunction)
}

