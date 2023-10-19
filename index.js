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

let present = new Date();
let currentMonth = present.getMonth();

let headerYear = present.getFullYear();

let headerMonth = months[currentMonth];
let dateBtn = document.getElementsByClassName("day");

let storeDay = [];

function indexOfValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].date === value.date && arr[i].month === value.month && arr[i].year === value.year) {
      return i;
    }
  }
  return -1;
}


const choiceHandle = () =>{
  let selectedDay = [...storeDay];
  Array.from(dateBtn).forEach((element, index) =>{
    if(!element.classList.contains("inactive")){
      element.addEventListener("click", (event) =>{
        let dateForm =  {
          date: event.target.innerHTML, 
          month: currentMonth, 
          year: headerYear,
          fullDate: `${event.target.innerHTML}/${currentMonth+1}/${headerYear}`
        }

        let index = indexOfValue(selectedDay,dateForm);

        if(index === -1){
          selectedDay.push(dateForm)
        } else {
          element.classList.remove("active")
          selectedDay.splice(index, 1);
        }

        if(selectedDay.length > 2){
          selectedDay.shift();
        }

        let displayDays = [...selectedDay];
        
        if (displayDays.length == 1){
          storeDay = [...selectedDay];
          dateBox.innerHTML = `${displayDays[0].fullDate}`;
          Array.from(dateBtn).forEach((element, index) => {
            let isSame = element.innerHTML == displayDays[0].date && displayDays[0].month == currentMonth
            let isInactive = element.classList.contains("inactive") 
            if(isSame && !isInactive){
              element.classList.add("active");
            }
            else{
              element.classList.remove("active")
            }
            
          })
        } else if (displayDays.length == 2) {
            storeDay = [...selectedDay];

            if(selectedDay.length > 0){
              let needReverse = (new Date(selectedDay[0].year, selectedDay[0].month, selectedDay[0].date) - new Date(selectedDay[1].year, selectedDay[1].month, selectedDay[1].date)) > 0;
              if(needReverse){
                displayDays = displayDays.reverse()
              }

              let sameMonth =  displayDays[0].month == displayDays[1].month
              if(sameMonth) {
                Array.from(dateBtn).forEach((element, index) => {
                  let isActive = parseInt(element.innerHTML) >= parseInt(displayDays[0].date) && parseInt(element.innerHTML) <= parseInt(displayDays[1].date);
                  let isInactive = element.classList.contains("inactive");
                  if (isActive && !isInactive){
                    element.classList.add("active");
                  }
                })
              } else{
                if(displayDays[0].month == currentMonth){
                  if(displayDays[1].month > displayDays[0].month){
                    let flag = false
                    Array.from(dateBtn).forEach((element, index) => {
                      let isFirstPin = displayDays[0].date == element.innerHTML;

                      if (isFirstPin && !element.classList.contains("inactive")) {
                        flag = true
                      }

                      if(flag){
                        element.classList.add("active")
                      }
                      
                    })
                  }
                } else if (displayDays[1].month == currentMonth){
                  let flag = true
                  Array.from(dateBtn).forEach((element, index) =>{
                    if(flag){
                      element.classList.add("active");
                    }
                    let isLastPin = displayDays[1].date == element.innerHTML;
                    if(isLastPin){
                      flag = false
                    }
                  })
                }
                else{
                  Array.from(dateBtn).forEach((element, index) => {
                    element.classList.add("active");
                  })
                }
              }
            }
          dateBox.innerHTML = `${displayDays[0].fullDate} - ${displayDays[1].fullDate}`;
        } else{
          Array.from(dateBtn).forEach((element,index) => {
            element.classList.remove("active");
          })
          storeDay = []
          dateBox.innerHTML = "";
        }
        
      })
    } else{
      if (index < 6){
        element.addEventListener("click", (event) => {
          currentMonth -= 1;
          if (currentMonth < 0){
            currentMonth = 11;
            headerYear -= 1;
          }
          renderCalendar(currentMonth, headerYear);
        })
      }
      else{
        element.addEventListener("click", (event) => {
          currentMonth += 1;
          if (currentMonth > 11){
            currentMonth = 0;
            headerYear += 1;
          }
          renderCalendar(currentMonth, headerYear);
        })
      }
    }
  })
}

//Main part calendar function
const renderCalendar = (month, year) => {
  let curMonthStart = new Date(year, month, 1).getDay();
  let curMonthLast = new Date(year, month + 1, 0).getDay();
  let curMonthLastDate = new Date(year, month + 1, 0).getDate();
  let prevMonthLastDate = new Date(year, month, 0).getDate();
  document.getElementById("calendarCurrentDate").innerHTML = months[month] + ", " + year;
  let calendar = ''
  let calendarElement = document.getElementById("dayList"); 
  for (let i = curMonthStart; i > 0; i --){
    calendar += `<li class="day inactive">${prevMonthLastDate - i + 1}</li>`
  }
  for (let i = 1; i <= curMonthLastDate; i++){
    calendar += `<li class="day">${i}</li>`;
  }
  for (let i = curMonthLast; i < 6; i++){
    calendar += `<li class="day inactive">${i - curMonthLast + 1}</li>`
  }
  calendarElement.innerHTML = calendar;
  //pin day function()
  if(storeDay.length == 2){
    let displayDays = [...storeDay];

    let needReverse = (new Date(displayDays[0].year, displayDays[0].month, displayDays[0].date) - new Date(displayDays[1].year, displayDays[1].month, displayDays[1].date)) > 0;
    if(needReverse){
      displayDays = displayDays.reverse()
    }
    let sameMonth =  displayDays[0].month == displayDays[1].month
      if(sameMonth) {
        if(currentMonth == displayDays[0].month){
          Array.from(dateBtn).forEach((element, index) => {
            let isActive = parseInt(element.innerHTML) >= parseInt(displayDays[0].date) && parseInt(element.innerHTML) <= parseInt(displayDays[1].date);
            console.log(isActive)
            let isInactive = element.classList.contains("inactive");
            if (isActive && !isInactive){
              element.classList.add("active");
            }
          })
        }
      } else{
        if(displayDays[0].month == currentMonth){
          if(displayDays[1].month > displayDays[0].month){
            let flag = false
            Array.from(dateBtn).forEach((element, index) => {
              let isFirstPin = displayDays[0].date == element.innerHTML;

              if (isFirstPin && !element.classList.contains("inactive")) {
                flag = true
              }

              if(flag){
                element.classList.add("active")
              }
              
            })
          }
        } else if (displayDays[1].month == currentMonth){
          let flag = true
          Array.from(dateBtn).forEach((element, index) =>{
            if(flag){
              element.classList.add("active");
            }
            let isLastPin = displayDays[1].date == element.innerHTML;
            if(isLastPin){
              flag = false
            }
          })
        } else{
          Array.from(dateBtn).forEach((element, index) => {
            element.classList.add("active");
          })
        }
      }

  } else if (storeDay.length == 1){
    Array.from(dateBtn).forEach((element, index) => {
      let isChecked = element.innerHTML == storeDay[0].date && currentMonth == storeDay[0].month;
      if(isChecked && !element.classList.contains("inactive")){
        element.classList.add("active")
      }
    })
  }
  choiceHandle()
}

renderCalendar(currentMonth, headerYear);

let nextMonthBtn = document.getElementById("nextMonth");
let previousMonthBtn = document.getElementById("previousMonth");

//Button event listener

//Next month
nextMonthBtn.addEventListener("click", () => {
  currentMonth += 1;
  if(currentMonth > 11){
    currentMonth = 0;
    headerYear += 1;
  }
  renderCalendar(currentMonth, headerYear);
})

//Previous Month
previousMonthBtn.addEventListener("click", ()=>{
  currentMonth -= 1;
  if(currentMonth < 0){
    currentMonth = 11;
    headerYear -= 1;
  }
  renderCalendar(currentMonth, headerYear);
})


const handleClear = () => {
  storeDay = [];
  dateBox.innerHTML = "";
  Array.from(dateBtn).forEach((element, index) => {
    element.classList.remove("active");
  })
}

let dateBox = document.getElementById("dateBox");

let clearClick = document.getElementById("clearButton");

clearClick.addEventListener("click", (event) => {
  handleClear();
})
choiceHandle()

