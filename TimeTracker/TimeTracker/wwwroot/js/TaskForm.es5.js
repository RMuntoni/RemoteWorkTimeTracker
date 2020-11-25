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
    if (!finishDateInput || !finishDateInput.value) {
        errorSpan.innerText += "Das Task Datum muss einen validen Wert enthalten! ";
        return false;
    }
    if (!descriptionInput || !descriptionInput.value) {
        errorSpan.innerText += "Die Beschreibung muss einen validen Wert enthalten! ";
        return false;
    }

    if ((!durationInput || !durationInput.value) && (!durationUserInput || !durationUserInput.value)) {
        errorSpan.innerText += "Die Duration muss einen validen Wert enthalten! ";
        return false;
    } else if (!durationInput.value && durationUserInput.value) {
        var regex = /\d{1,2}/g;
        var values = durationUserInput.value.match(regex);

        //we only interpret the last three values or the length of the values       
        var timeSpan = 0;
        for (var i = 0; i < Math.min(3, values.length); i++) {
            var crnt = values.pop();

            if (i === 0) //seconds
                timeSpan += crnt * 1000;else if (i === 1) //minutes
                timeSpan += crnt * 60 * 1000;else // hours
                timeSpan += crnt * 60 * 60 * 1000;
        }

        durationInput.value = timeSpan;
    }

    if (!durationInput || !durationInput.value || durationInput.value < 0) {
        errorSpan.innerText += "Die Duration muss einen validen Wert enthalten! ";
        return false;
    }

    return true;
};

var saveTaskFormFunction = function saveTaskFormFunction() {
    if (!saveTaskForm) console.log("saveTaskForm not set");

    if (!errorSpan) errorSpan.innerText = "";

    if (!validate()) {
        console.log("Fehler bei der Validierung");
        return;
    }

    saveTaskForm.submit();
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
};

