//get current day
var todayEl = document.querySelector('.today');
var containerEl = document.querySelector('.container')
var colElHour;
var inputEl;
var hoursPerDay = 24;
var time = [];
var index = [];

console.log(moment().format('MM/DD/YYYY'));
todayEl.textContent = "Today is " + moment().format('MM/DD/YYYY') + ".";
//get the number of hours in a day

function timeOneDay() {
    var formattedTime;
    for (i = 0; i < hoursPerDay; i++) {
        formattedTime = (moment().startOf('day').subtract(i, "hours")).format("hA");
        time.unshift(formattedTime);
    }
}
//render calendar
function renderCalendar() {
    for (i = 0; i < hoursPerDay; i++) {
        var rowEl = document.createElement('div');
        rowEl.setAttribute("class", "row");
        colElHour = document.createElement('div');
        colElHour.setAttribute("class", "col-lg-1 hour")
        colElHour.textContent = time[i];
        var colElDesc = document.createElement('div');
        colElDesc.setAttribute("class", "col-lg-10")
        inputEl = document.createElement('input');
        inputEl.setAttribute('type', "textarea")
        inputEl.setAttribute("class", "description")
        inputEl.setAttribute("id", i)
        index.push(parseInt(inputEl.getAttribute("id")));
        var colElSave = document.createElement('div')
        colElSave.setAttribute("class", "col-lg-1");
        var saveBtn = document.createElement('button');
        saveBtn.setAttribute("class", "saveBtn i");
        saveBtn.setAttribute("type", "submit");
        saveBtn.textContent = "Save";
        colElSave.appendChild(saveBtn);
        colElDesc.appendChild(inputEl)
        rowEl.appendChild(colElHour);
        rowEl.appendChild(colElDesc);
        rowEl.appendChild(colElSave);
        containerEl.appendChild(rowEl);
    }
}

function currentTime() {
    var currentHour = parseInt(moment().hour());
    console.log(currentHour);
    console.log(index);
    for (i = 0; i < index.length; i++) {
        var timeSlot = document.getElementById(i);
        console.log(timeSlot);
        if ((currentHour - 1) === index[i])  {
            timeSlot.setAttribute("class", "description present")
        }
        else if ((currentHour - 1) > index[i]){
            timeSlot.setAttribute("class", "description past")
        }
        else {
            timeSlot.setAttribute("class", "description future")
        }
    }
}
timeOneDay();
renderCalendar();
console.log(time);
currentTime();
//