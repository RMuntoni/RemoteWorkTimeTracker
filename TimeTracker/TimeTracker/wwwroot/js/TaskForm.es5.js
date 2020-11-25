//Todo: Refactor this to typescript. Use a common error or logging function
//Define variables
"use strict";

var saveTaskForm = null;
var saveTaskFormButton = null;
var durationUserInput = null;
var durationInput = null;
var descriptionInput = null;
var finishDateInput = null;
var errorSpan = null;

var validate = function validate() {
    errorSpan.innerText = "";

    if (!finishDateInput || !finishDateInput.value) {
        errorSpan.innerText += "Das Task Datum muss einen validen Wert enthalten! ";
        return false;
    }
    if (!descriptionInput || !descriptionInput.value) {
        errorSpan.innerText += "Die Beschreibung muss einen validen Wert enthalten! ";
        return false;
    }

    if (!durationInput || !durationInput.value || durationInput.value <= 0) {
        errorSpan.innerText += "Die Duration muss einen validen Wert enthalten! ";
        return false;
    }

    return true;
};

var convertUserInputToTimeSpan = function convertUserInputToTimeSpan() {
    event.preventDefault();

    if (!durationInput || !durationUserInput || !durationUserInput.value) return;

    var regex = /\d{1,2}/g;
    var values = durationUserInput.value.match(regex);

    //we only interpret the last three values or the length of the values       
    var timeSpan = 0;

    if (values.length > 0) {
        var seconds = values.pop();
        timeSpan += seconds * 1000;
    }
    if (values.length > 0) {
        var minutes = values.pop();
        timeSpan += minutes * 60 * 1000;
    }
    if (values.length > 0) {
        var hours = values.pop();
        timeSpan += hours * 60 * 60 * 1000;
    }
    durationInput.value = timeSpan;
};

var saveTaskFormFunction = function saveTaskFormFunction() {
    event.preventDefault();

    if (!saveTaskForm) {
        console.log("saveTaskForm not set");
        return false;
    }

    if (!errorSpan) errorSpan.innerText = "";

    if (!validate()) {
        console.log("Fehler bei der Validierung");
        return false;
    }

    saveTaskForm.submit();
    return true;
};

//register functionality to buttons and elements
var initTaskForm = function initTaskForm() {
    saveTaskForm = document.getElementById('saveTaskForm');
    saveTaskFormButton = document.getElementById('saveTaskFormButton');
    errorSpan = document.getElementById('errorSpan');
    durationUserInput = document.getElementById('durationUser');
    durationInput = document.getElementById('duration');
    descriptionInput = document.getElementById('description');
    finishDateInput = document.getElementById('finishDate');

    if (!!saveTaskFormButton) saveTaskFormButton.addEventListener('click', saveTaskFormFunction);
    if (!!durationUserInput) durationUserInput.onchange = convertUserInputToTimeSpan;
};

