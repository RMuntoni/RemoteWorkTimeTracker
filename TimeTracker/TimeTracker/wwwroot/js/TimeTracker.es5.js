//Define variables
"use strict";

var toggleTimerButton = null;
var resetTimerButton = null;
var saveTimerButton = null;
var timer = null;
var startTime = null;
var timeSpan = 0;
var pausedTime = 0;
var isPaused = false;
var interval = null;

var toggleTimerClickFunction = function toggleTimerClickFunction(event) {
    if (!toggleTimerButton || !timer) {
        console.log("toggleTimerButton or timer not set");
        return;
    }

    if (timeSpan === 0) {
        startTime = new Date();
        interval = setInterval(timerIntervalFunction, 1000);
        toggleTimerButton.innerText = "Pause";
    } else if (toggleTimerButton.innerText === "Pause") {
        isPaused = true;
        toggleTimerButton.innerText = "Start";
    } else {
        // toggleTimerButton.innerText === "start" && timeSpan !== 0
        isPaused = false;
        toggleTimerButton.innerText = "Pause";
    }
};

var resetTimerClickFunction = function resetTimerClickFunction(event) {
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
};

var saveTimerClickFunction = function saveTimerClickFunction(event) {
    if (!saveTimerButton || !timer) {
        console.log("saveTimerButton or timer not set");
        return;
    }

    //save a task => change to the task form and add the timer data?
    console.log("would save");
};

var timerIntervalFunction = function timerIntervalFunction() {
    if (!timer) {
        console.log("timer not set");
        return;
    }

    if (isPaused) {
        pausedTime = new Date() - startTime - timeSpan; //update the pause time with the difference since the stop
    } else {
            timeSpan = new Date() - startTime - pausedTime; //add the ticks to the timespan and remove pause times
            timer.innerText = new Date(timeSpan).toLocaleString("de-DE", { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }); //display the timespan
        }
};

//register functionality to buttons and elements
var initTimeTracker = function initTimeTracker() {
    toggleTimerButton = document.getElementById("toggleTimerButton");
    resetTimerButton = document.getElementById("resetTimerButton");
    saveTimerButton = document.getElementById("saveTimerButton");
    timer = document.getElementById("timer");

    if (!!toggleTimerButton) toggleTimerButton.addEventListener("click", toggleTimerClickFunction);
    if (!!resetTimerButton) resetTimerButton.addEventListener("click", resetTimerClickFunction);
    if (!!saveTimerButton) saveTimerButton.addEventListener("click", saveTimerClickFunction);
};

