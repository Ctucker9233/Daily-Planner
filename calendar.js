let todayEl = $('.today');
let containerEl = $('.container')
var rowEl;
var hoursPerDay = 9;
var currentHour;
var time = [];
let colElHour;
let inputEl;
let saveBtn;
let colElSave;
let colElDesc;
var index = [];

//get current day
//console.log(moment().format('MM/DD/YYYY'));
todayEl.text("Today is " + moment().format('MM/DD/YYYY') + ".");
//console.log(moment().startOf('day').add('8', 'hours').format("h:mmA"))

//get the number of hours in a work day
function timeOneDay() {
    var formattedTime = [];
    time = formattedTime;
    for (i = 0; i < hoursPerDay; i++) {
        var timePoint = (9 + i);
        formattedTime.push((moment().startOf('day').add(timePoint, 'hours').format("HH:mm A")));
    }

}

//render calendar
function renderCalendar() {
    for (i = 0; i < hoursPerDay; i++) {
        rowEl = $('<div>').attr("class", "row");
        colElHour = $('<div>' + time[i] + '</div>').attr("class", "col-lg-1 hour");
        colElDesc = $('<div>').attr("class", "col-lg-10");
        inputEl = $('<textarea>').attr('value', "").attr("class", "description").attr("id", time[i]);
        index.push(inputEl.attr("id"));
        colElSave = $('<div>').attr("class", "col-lg-1")
        saveBtn = $('<button>').attr("class", "saveBtn").attr("id", time[i]).attr("type", "submit").text("Save");
        colElDesc.append(inputEl)
        colElSave.append(saveBtn);
        rowEl.append(colElHour);
        rowEl.append(colElDesc);
        rowEl.append(colElSave);
        containerEl.append(rowEl);
    }
    $(document).on("click", ".saveBtn", saveSchedule);
}

//determine current time
function currentTime() {
    //console.log(moment().format("HH:mm A"));
    currentHour = moment().format("HH:mm A");
    //console.log(currentHour);
    var timeStamp = $('textarea').get();
    var getSched;
    $.each(timeStamp, function (i) {
        //console.log(timeStamp[i]);
        //console.log(parseInt(currentHour));
        var timeId = parseInt(timeStamp[i].id);
        //console.log(parseInt(currentHour));
        //console.log(timeStamp[i].classList.value)
        console.log(timeStamp[i])
        if (parseInt(currentHour) > timeId) {
            //console.log("Past Time " + timeId)
            //console.log(timeStamp.classList)
            timeStamp[i].classList.value = "description past";
            //
            getSched = localStorage.getItem(timeStamp[i].id)
            console.log(getSched);
            timeStamp[i].value = getSched;
        }
        else if (parseInt(currentHour) < timeId) {
            //console.log("Past Time " + time[i])
            timeStamp[i].classList.value = "description future";
            getSched = localStorage.getItem(timeStamp[i].id)
            console.log(getSched);
            timeStamp[i].value = getSched;
        }
        else {
            console.log("future Time " + parseInt(timeStamp[i]))
            timeStamp[i].classList.value = "description present";
            getSched = localStorage.getItem(timeStamp[i].id)
            console.log(getSched);
            timeStamp[i].value = getSched;
        }
    })
};

function saveSchedule(event) {
    event.preventDefault()
    var input = $(this).parent().parent().find(".description", ['textarea'])[0].value
    var time = $(this).parent().parent().find(".description", ['textarea'])[0].id;
    console.log(time)
    console.log(input)
    localStorage.setItem(time, input)
}


timeOneDay();
renderCalendar();
console.log(time);
currentTime();
//