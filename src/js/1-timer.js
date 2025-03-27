import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconError from '../img/error.svg';
import iconHello from '../img/hello.svg';

let userSelectedDate;
let interval;
let newInterval;
const timer = document.querySelector('.timer');
const startButton = document.querySelector('button[data-start]');
const inputData = document.getElementById('datetime-picker');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

setTimeout(() => {
  iziToast.show({
    title: 'Hello',
    message: 'Welcome to Timer!',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    position: 'bottomRight',
    backgroundColor: '#0099FF',
    iconUrl: iconHello,
  });
}, 1000);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate && userSelectedDate <= new Date()) {
      startButton.setAttribute('disabled', 'true');

      iziToast.show({
        title: 'Error!',
        message: 'Please choose a date in the future',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        position: 'topRight',
        backgroundColor: '#EF4040',
        position: 'topRight',
        iconUrl: iconError,
      });
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

document.addEventListener('DOMContentLoaded', function () {
  flatpickr('#datetime-picker', options);
});

startButton.addEventListener('click', dataTimer);

function dataTimer() {
  if (!userSelectedDate) {
    return;
  }
  inputData.disabled = true;
  const currentDate = new Date();
  let differenceData = userSelectedDate - currentDate;
  startButton.setAttribute('disabled', 'true');

  interval = setInterval(() => {
    const currentDate = new Date();
    newInterval = userSelectedDate - currentDate;
    if (newInterval <= 0 && differenceData > 0) {
      clearInterval(interval);
      inputData.disabled = false;
      timer.querySelectorAll('.value, .label').forEach(element => {
        element.classList.remove('active');
      });

      iziToast.show({
        title: 'Warning!',
        message: 'Час до даної події минув!',
        titleColor: '#bd34fe',
        messageColor: '#25acda',
        position: 'center',
        backgroundColor: '#d4cec7f3',
      });
      return;
    }
    displayData();
  }, 1000);
}

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

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function displayData(value) {
  timer.querySelectorAll('.value, .label').forEach(element => {
    element.classList.add('active');
  });
  const timeInterval = convertMs(newInterval);
  day.textContent = addLeadingZero(timeInterval.days);
  hour.textContent = addLeadingZero(timeInterval.hours);
  minute.textContent = addLeadingZero(timeInterval.minutes);
  second.textContent = addLeadingZero(timeInterval.seconds);
}