//Define variables
let saveTaskForm = null;
let saveTaskFormButton = null;
let durationUserInput = null;
let durationInput = null;
let descriptionInput = null;
let finishDateInput = null;
let errorSpan = null;

let validate = function () {
    errorSpan.innerText = "";

    if (!finishDateInput || !finishDateInput.value) {
        errorSpan.innerText += "Das Task Datum muss einen validen Wert enthalten! "
        return false;
    }
    if (!descriptionInput || !descriptionInput.value) {
        errorSpan.innerText += "Die Beschreibung muss einen validen Wert enthalten! "
        return false;
    }
    
    if (!durationInput || !durationInput.value || durationInput.value <= 0) {
        errorSpan.innerText += "Die Duration muss einen validen Wert enthalten! "
        return false;
    }

    return true;
}

let convertUserInputToTimeSpan = function () {
    event.preventDefault();

    if (!durationInput || !durationUserInput || !durationUserInput.value)
        return;

    let regex = /\d{1,2}/g;
    let values = durationUserInput.value.match(regex);

    //we only interpret the last three values or the length of the values        
    let timeSpan = 0;

    if (values.length > 0) {
        let seconds = values.pop();
        timeSpan += seconds * 1000;
    }
    if (values.length > 0) {
        let minutes = values.pop();
        timeSpan += minutes * 60 * 1000;
    }
    if (values.length > 0) {
        let hours = values.pop();
        timeSpan += hours * 60 * 60 * 1000;
    }    
    durationInput.value = timeSpan;
}

let saveTaskFormFunction = function () {
    event.preventDefault();

    if (!saveTaskForm)
        console.log("saveTaskForm not set");

    if (!errorSpan)
        errorSpan.innerText = "";

    if (!validate()) {
        console.log("Fehler bei der Validierung")
        return;
    }
        
    saveTaskForm.submit();
}

//register functionality to buttons and elements
let initTaskForm = function () {
    saveTaskForm = document.getElementById('saveTaskForm');
    saveTaskFormButton = document.getElementById('saveTaskFormButton');
    errorSpan = document.getElementById('errorSpan');
    durationUserInput = document.getElementById('durationUser');
    durationInput = document.getElementById('duration');
    descriptionInput = document.getElementById('description');
    finishDateInput = document.getElementById('finishDate');

    if (!!saveTaskFormButton)
        saveTaskFormButton.addEventListener('click', saveTaskFormFunction);
    if (!!durationUserInput)
        durationUserInput.onchange = convertUserInputToTimeSpan;
    

}

