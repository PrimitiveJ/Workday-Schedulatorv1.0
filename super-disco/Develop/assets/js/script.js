

let rowInfo = new Map()


setInterval(() => {

    let thedaythatitis = new Date()
    timetitleEl = $("#currentDay")
    timetitleEl.text(thedaythatitis.toLocaleTimeString())
    
   let now = new Date()
    for (let savebutton of rowInfo){
      let rowData = rowInfo.get(savebutton[0])
      updaterowTime(rowData, now);
    }
        
}, 1000);



let timerElarray = []
let timearray = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm' ];
function createElements(index, now, savedtasks) {
    //holds value of total hours for each iteration of index
    let totalHours = index%24

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




     // Add data to attach to each row
     let rowData = {
        rowEl : $(rowEl),
        textareaEl : $(textareaEl),
        totalHours : totalHours,   
    };

    //stores info for each row in rowInfo map
    rowInfo.set(col3buttonEl[0], rowData)

    //run update row function
    updaterowTime(rowData, now);

     //event listener for col3buttonel
     $(col3buttonEl).click(saveTasks)

     //gets data from localstorage for specific row
     let myData = savedtasks[index] || {tasks: ""}
     console.log("old data: ", savedtasks)
     $(textareaEl).text(myData.tasks)

     
//function to save tasks
     function saveTasks() {
        let inputdata = $(textareaEl).val();
        let timedata = $(timeEl).text();
        let oldTasks = JSON.parse(localStorage.getItem('taskdata') || "{}")
        oldTasks[index] = {
            tasks: inputdata,
            time: timedata
        };
        localStorage.setItem('taskdata', JSON.stringify(oldTasks))
        }

        
}
$(document).ready(function() {
    let now = new Date()
    let savedtasks = JSON.parse(localStorage.getItem('taskdata') || "{}");
   for (let index = 0; index < 24; index++) {  
        createElements(index, now, savedtasks);
    }
});

//timestate comparisons
function getHour(index) {
    const time = (index +11)%12+ 1;
    const postfix = ~~(index/12)%2 == 0 ? "am" : "pm";
    return { value: time, timePostfix: postfix}
}

function updaterowTime (rowData, currentTime){
    let currentHour = currentTime.getHours();
    let compareHour = rowData.totalHours;
    let rowEl = rowData.rowEl;
    let textareaEl = rowData.textareaEl;

    let timeState = currentHour === compareHour
    ? "current" : currentHour > compareHour
    ? "before" : "after"

    if (timeState != rowData.currentTime) {
        rowEl.removeClass("time-state-" + rowData.currentTime);
        rowData.currentTime = timeState;
        rowEl.addClass("time-state-" + timeState);
        textareaEl.attr("disabled", timeState === 'before')
    }
}










