let now 
setInterval(() => {
    now = moment();
    $("#currentDay").text(now)
     timerElarray.forEach(timeEl => {
        //  console.log($(timeEl).parent().parent())
         $(timeEl).parent().parent().attr("id", "varmerBrown")
        $(timeEl).parent().parent().attr("data-timestate", getTimeState($(timeEl).text()))
        // console.log(getTimeState($(timeEl).text()))
        // console.log($(timeEl).text())
        
    });
}, 1000);

let timerElarray = []
let timearray = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm' ];
function createElements(index) {
    //display saved tasks
    displayTasks();
    //container Elements
    containerEl = document.getElementsByClassName('container')
    //Row container element
    let rowEl = $("<div></div>")
     $(rowEl).addClass("row")
     //First column container
     let col1El = $("<div></div>")
     $(col1El).addClass("col-sm-1 col-md-1 col-lg-1")
     //Header for all 24 hours of the day listed
     let timeEl = $("<h1></h1>")
     $(timeEl).text(timearray[index])
     timerElarray.push(timeEl)
     $(col1El).append(timeEl)

    //Column 2 elements
     let col2El = $("<div></div>")
     $(col2El).addClass("col-sm-10 col-md-10 col-lg-10")
     let inputEl = $("<div></div>")
     $(inputEl).addClass("input-group")
     $(col2El).append(inputEl)
     let inputgroupEl = $("<div></div>")
     $(inputgroupEl).addClass("input-group-prepend")
     $(inputEl).append(inputgroupEl)
     let inputgroupspanEl = $("<span>'Tasks'</span>")
     $(inputgroupspanEl).addClass("input-group-text")
     $(inputgroupEl).append(inputgroupspanEl)

     let textareaEl = $("<textarea></textarea>")
     $(textareaEl).addClass("form-control")
     $(inputEl).append(textareaEl)

     //column 3 elements
     let col3El = $("<div></div>")
     col3El.addClass("col-sm-1 col-md-1 col-lg-1 bg-primary")
     $(col3El).attr("id", "savebutton")
     let col3buttonEl = $("<button>Save Tasks</button>")
     $(col3El).append(col3buttonEl)
     
     //appends all columns to rowEl
     $(rowEl).append(col1El)
     $(rowEl).append(col2El)
     $(rowEl).append(col3El)
     $(containerEl).append(rowEl)
     //event listener for col3buttonel
     $(col3buttonEl).click(saveTasks)

     
//function to save tasks
     function saveTasks() {
        let inputdata = $(textareaEl).val();
        let timedata = $(timeEl).text();
        let savedtasks = { tasks:inputdata , time:timedata};
        let retrieveddata = localStorage.getItem('taskdata');
        if (!retrieveddata){
            retrieveddata = []
        } else {
            retrieveddata = JSON.parse(retrieveddata)
        } 
        console.log(retrieveddata)
        retrieveddata.push(savedtasks)
        localStorage.setItem('taskdata', JSON.stringify(retrieveddata))
        }
    function displayTasks () {
        var savedatastring = localStorage.getItem('taskdata')
        console.log(savedatastring)
    }

        
}
$(document).ready(function() {
    for (let index = 0; index < 24; index++) {  
        createElements(index);
    }
});

function getTimeState (timeCompare) {
    let currentHour = new Date().getHours();
    let currentHourSeq= (currentHour +11)%12+1
    let num = /\d+/.exec(timeCompare)[0];
    let postfixCompare = /[^\d]+/.exec(timeCompare)[0]; // returns "am" or "pm"
    let postfixCurrent = currentHour < 12? "am" : "pm";
    let timeState
    // console.log(num)
    // console.log(postfixCompare)
    // console.log(postfixCurrent)

    if (postfixCompare === "am" && postfixCurrent === "pm") {
        timeState = "after";
    } else if (postfixCompare === "pm" && postfixCurrent === "am") {
        timeState = "before";
    } else if (postfixCompare === postfixCurrent) {
        // timeState = currentHourSeq < num? "before" : currentHourSeq === num? "current" : "after";
        if (currentHourSeq < num%12) {
            timeState = "before"
        } else if (currentHourSeq > num%12) {
            timeState = "after"
        } else {
            timeState="current"
        }
    }

    return timeState;
}

function timeClassChange() {
    if (timeState === "current"){
        
    }
}

//create a current-time object to compare hourly values to 

//change classes of input-fields based on comparisons to currentTime.hour
let currentHour= new Date().getHours()

//Save textcontent of input groups to local storage for each row (parent container)

