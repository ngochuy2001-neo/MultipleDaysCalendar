const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

//Element listing
const calendarMonth = document.getElementById("calendarCurrentMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const prevMonthBtn = document.getElementById("previousMonth");
const dateBox = document.getElementById("dateBox");
const clearBtn = document.getElementById("clearButton");
const calendarElement = document.getElementById("dayList");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let activeDays = [];

//Reverse function
function checkStorageVariable(firstDate, secondDate) {
  let firstDateSplit = firstDate.split("/");
  let secondDateSplit = secondDate.split("/");

  firstDateSplit = firstDateSplit.map((data,index) => {
    return parseInt(data)
  })
  
  secondDateSplit = secondDateSplit.map((data,index) => {
    return parseInt(data)
  })
  
  let tempFirstDate = new Date(firstDateSplit[2], firstDateSplit[1] - 1, firstDateSplit[0])
  let tempSecondDate = new Date(secondDateSplit[2], secondDateSplit[1] - 1, secondDateSplit[0])
  console.log(tempSecondDate)
 
  console.log(tempSecondDate > tempFirstDate)
  return tempSecondDate < tempFirstDate;
}


//Listing all day of month function
const listingDays  = (month, year) => {

  //Variables

  //Day define
  let curMonthFirstDay = new Date(year, month, 1).getDay();
  let curMonthLastDay = new Date(year, month + 1, 0).getDay();
  let curMonthLastDate = new Date(year, month + 1, 0).getDate();
  let prevMonthLastDate = new Date(year, month, 0).getDate();
  
  let isFirstMonth = month == 0
  let isLastMonth = month == 11
  let dayList = [];
  for (let i = curMonthFirstDay; i > 0; i--){

    if(isLastMonth){
      dayList.push({
        date: prevMonthLastDate - i + 1,
        month: 11,
        year: year,
        fullDate: `${prevMonthLastDate - i + 1}/12/${year-1}`,
        state: 'inactive'
      })
    } else{
      dayList.push({
        date: prevMonthLastDate - i + 1,
        month: month - 1,
        year: year,
        fullDate: `${prevMonthLastDate - i + 1}/${month}/${year}`,
        state: 'inactive'
      })
    }
  }  
  for (let i = 1; i <= curMonthLastDate; i++){
    if (activeDays.length == 1){
      let isInActiveDay = activeDays[0] == `${i}/${month + 1}/${year}`
      if (isInActiveDay){
          dayList.push({
            date: i,
            month: month,
            year: year,
            fullDate: `${i}/${month+1}/${year}`,
            state: 'active'
          })
      }else{
        dayList.push({
          date: i,
          month: month,
          year: year,
          fullDate: `${i}/${month+1}/${year}`,
          state: ''
        })
      }
    } else if (activeDays.length == 2){

      let tempArray = [...activeDays]
      if (checkStorageVariable(tempArray[0], tempArray[1])){
        tempArray = tempArray.reverse()
      }
      let analyseFirstDay = tempArray[0].split("/");
      let analyseSecondDay = tempArray[1].split("/");

      let isSameMonth = analyseFirstDay[1] == analyseSecondDay[1];

      if(isSameMonth){
        let isCurrentMonth = analyseFirstDay[1] == month + 1;
        if(isCurrentMonth){
          let isActive = i >= analyseFirstDay[0] && i <= analyseSecondDay[0];
          dayList.push({
            date: i,
            month: month,
            year: year,
            fullDate: `${i}/${month+1}/${year}`,
            state: isActive? "active":""
          })
        } else{
          dayList.push({
            date: i,
            month: month,
            year: year,
            fullDate: `${i}/${month+1}/${year}`,
            state:  ""
          })
        }
      } else {
        let isFirstMonth = currentMonth + 1 == analyseFirstDay[1]
        let isLastMonth = currentMonth + 1 == analyseSecondDay[1]
        let isBetween = currentMonth + 1 > analyseFirstDay[1] && currentMonth + 1 < analyseSecondDay[1]
        if (isFirstMonth){
          let isActive = i >= analyseFirstDay[0]; 
          if(isActive){
            dayList.push({
              date: i,
              month: month,
              year: year,
              fullDate: `${i}/${month+1}/${year}`,
              state: "active"
            })
          }
          else{
            dayList.push({
              date:i,
              month: month,
              year: year,
              fullDate: `${i}/${month+1}/${year}`,
              state: '',
            })
          }
        } else if (isLastMonth) {
          let isActive = i <= analyseSecondDay[0];
          if (isActive){
            dayList.push({
              date: i,
              month: month,
              year: year,
              fullDate: `${i}/${month+1}/${year}`,
              state: "active"
            })
          } else{
            dayList.push({
              date: i,
              month: month,
              year: year,
              fullDate: `${i}/${month+1}/${year}`,
              state: ""
            })
          }
        } else if(isBetween){
            dayList.push({
              date: i,
              month: month,
              year: year,
              fullDate: `${i}/${month+1}/${year}`,
              state: "active"
            })
        } else{
            dayList.push({
              date: i,
              month: month,
              year: year,
              fullDate: `${i}/${month+1}/${year}`,
              state: ""
            })
        }
      }
      

    } else{
      dayList.push({
        date: i,
        month: month,
        year: year,
        fullDate: `${i}/${month+1}/${year}`,
        state: ''
      })
    }
  }
  for (let i = curMonthLastDay; i < 6; i++){
    dayList.push({
      date: i - curMonthLastDay + 1,
      month: month + 1,
      year: year,
      fullDate: `${i - curMonthLastDay}/${month + 2}/${year}`,
      state: "inactive"
    })
  }

  return dayList;
}

//handle click on date function
const handleClickDate = (event) =>{
  let datePicked = event.target.getAttribute("data-date");
  
  let indexExisted = activeDays.indexOf(datePicked);
  if(indexExisted != -1){
    activeDays.splice(indexExisted,1)
  } else{
    activeDays.push(datePicked)
  }
  if(activeDays.length > 2){
    activeDays.shift();
  }
  renderFunction(currentMonth, currentYear, activeDays);
}


// Two buttons handle functions
prevMonthBtn.addEventListener("click",(event) => {
  let isFirstMonth = currentMonth == 0
  if(isFirstMonth){
    currentMonth = 11;
    currentYear--;
  } else{
    currentMonth--;
  }
  renderFunction(currentMonth, currentYear, activeDays);
})

nextMonthBtn.addEventListener("click", (event) => {
  let isLastMonth = currentMonth == 11
  if(isLastMonth){
    currentMonth = 0;
    currentYear++;
  } else{
    currentMonth++;
  }
  renderFunction(currentMonth, currentYear, activeDays)
})

clearBtn.addEventListener("click", (event)=>{
  activeDays = [];
  dateBox.innerHTML = "";
  renderFunction(currentMonth, currentYear, activeDays);
})

//RenderFunction

const renderFunction = (month, year, activeDays) => {
  calendarMonth.innerHTML = `${months[month]}, ${year}`;
  calendarElement.innerHTML = "";

  let dayList = listingDays(month, year);

  let dayElements = dayList.map((data, index) =>{
    isInActive = data.state == "inactive"
    isActive = data.state == "active"
    return `<li class="day ${isActive? "active" : ""} ${isInActive? "inactive" : ""}" data-date="${data.fullDate}">${data.date}</li>`
  })
  dayElements.forEach((element) => {
    calendarElement.innerHTML += element;
  })
  
  let displayDays = [...activeDays]

  if (displayDays.length == 1){
    dateBox.innerHTML = activeDays
  } else if (displayDays.length == 2){

    if(checkStorageVariable(displayDays[0], displayDays[1])){
      displayDays = displayDays.reverse()
      console.log("check")
      console.log(displayDays)
    }
    dateBox.innerHTML = `${displayDays[0]} - ${displayDays[1]}`
  } else{
    dateBox.innerHTML = "";
  }

  // Add event to each day
  const datePick = document.getElementsByClassName("day")
  Array.from(datePick).forEach((element, index)=>{
    element.addEventListener("click", handleClickDate)
  })
}

renderFunction(currentMonth, currentYear, activeDays)