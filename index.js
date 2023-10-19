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


//Main part calendar function
const renderCalendar = (month, year) => {
  console.log(months[month], year)
  let curMonthStart = new Date(year, month, 1).getDay();
  let curMonthLast = new Date(year, month + 1, 0).getDay();
  let curMonthLastDate = new Date(year, month + 1, 0).getDate();
  let prevMonthLastDate = new Date(year, month, 0).getDate();


  console.log(month)
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
  console.log(currentMonth)
  renderCalendar(currentMonth, headerYear);
})

//Previous Month
previousMonthBtn.addEventListener("click", ()=>{
  currentMonth -= 1;
  if(currentMonth < 0){
    currentMonth = 11;
    headerYear -= 1;
  }
  console.log(currentMonth)
  renderCalendar(currentMonth, headerYear);
})

let selectedDay = [];
let storeDay = [];

let dateBtn = document.getElementsByClassName("day");

function indexOfValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].date === value.date && arr[i].month === value.month && arr[i].year === value.year) {
      return i;
    }
  }
  return -1;
}

let dateBox = document.getElementById("dateBox");

const choiceHandle = () =>{
  Array.from(dateBtn).forEach((element) =>{
    if(!element.classList.contains("inactive")){
      element.addEventListener("click", (event) =>{
        let dateForm =  {date: event.target.innerHTML, month: currentMonth, year: headerYear}
        let index = indexOfValue(selectedDay,dateForm);
        console.log(index)
        if(index === -1){
          selectedDay.push(dateForm)
        }
        else {
          selectedDay.splice(index, 1);
        }
        if(selectedDay.length > 2){
          selectedDay.shift();
        }

        if (selectedDay.length == 1){
          dateBox.innerHTML = `${selectedDay[0].date}/${selectedDay[0].month}/${selectedDay[0].year}`;
        }
        else{
          //reverse check
          if(new Date(selectedDay[0].year,selectedDay[0].month,selectedDay[0].date) - new Date(selectedDay[1].year,selectedDay[1].month,selectedDay[1].date) > 0){
            selectedDay = selectedDay.reverse()
          }
          dateBox.innerHTML = `${selectedDay[0].date}/${selectedDay[0].month}/${selectedDay[0].year} - ${selectedDay[1].date}/${selectedDay[1].month}/${selectedDay[1].year}`;
        }
      })
    }
  })
}

choiceHandle()

