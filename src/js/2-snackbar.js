import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error.svg';
import iconCaution from '../img/caution.svg';
import iconHello from '../img/hello.svg';
import iconOk from '../img/ok.svg';

const params = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[type="number"]'),
  radioButtons: document.querySelectorAll('input[name="state"]'),
  btnCreate: document.querySelector('button[type="submit"]'),
};

setTimeout(() => {
  iziToast.show({
    title: 'Hello',
    message: 'Welcome to Snackbar!',
    titleColor: '#FFFFFF',
    messageColor: '#FFFFFF',
    position: 'bottomRight',
    backgroundColor: '#0099FF',
    iconUrl: iconHello,
  });
}, 1000);

params.form.addEventListener('submit', promiceCreate);

function promiceCreate(event) {
  event.preventDefault();
  const checkRadio = document.querySelector('input[name="state"]:checked');
  const delay = Number(params.delayInput.value);
  if (!checkRadio || delay < 0) {
    iziToast.show({
      title: 'Caution',
      message: 'You forgot important data',
      titleColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      position: 'topRight',
      backgroundColor: '#FFA000',
      iconUrl: iconCaution,
    });
    return;
  }

  const state = checkRadio.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(
      () => (state === 'fulfilled' ? resolve(delay) : reject(delay)),
      delay
    );
  });

  params.delayInput.value = '';
  params.radioButtons.forEach(radio => {
    radio.checked = false;
  });

  promise
    .then(message => {
      iziToast.show({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        position: 'topRight',
        backgroundColor: ' #326101',
        iconUrl: iconOk,
      });
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        position: 'topRight',
        backgroundColor: '#EF4040',
        iconUrl: iconError,
      });
    });
}