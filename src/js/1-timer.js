// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const myInput = document.querySelector("input#datetime-picker");
const getButton = document.querySelector(".timer-button");
getButton.disabled = true;

let userSelectedDate; 
let timerInterval; 


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);

    let currentDate = Date.now();
    if (currentDate > userSelectedDate.getTime()) {
      iziToast.show({
    title: '',
          message: 'Please choose a date in the future',
          messageColor: '#FFF',
          position: 'topRight',
          color: '#B51B1B'
      });
       getButton.disabled = true;
    } else {
      getButton.disabled = false;
    }
  },
};

const fp = flatpickr(myInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
    return String(value).padStart(2, "0");
};
function updateTimer() {
    const ms = userSelectedDate.getTime() - Date.now();

   if (ms <= 0) {
    clearInterval(timerInterval);
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    getButton.disabled = true; 
  } else {
    const timeObject = convertMs(ms);

    document.getElementById("days").innerText = addLeadingZero(timeObject.days);
    document.getElementById("hours").innerText = addLeadingZero(timeObject.hours);
    document.getElementById("minutes").innerText = addLeadingZero(timeObject.minutes);
    document.getElementById("seconds").innerText = addLeadingZero(timeObject.seconds);
  }
}

getButton.addEventListener("click", function() {
   updateTimer();
getButton.disabled = true;
  myInput.disabled = true;
   timerInterval = setInterval(updateTimer, 1000);

});
myInput.addEventListener("change", function () {
  clearInterval(timerInterval);
  getButton.disabled = true;
   myInput.disabled = false;
});