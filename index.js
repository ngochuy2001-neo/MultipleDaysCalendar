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
  addEventBtn();
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
  addEventBtn();
})

