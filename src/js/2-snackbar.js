// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const getButton = document.querySelector("button");
const getDelay = document.querySelector('input');
const getFieldset = document.querySelector("fieldset");
const getform = document.querySelector("form")

let delayValue = 0;
let fielsetValue = "";
let promiseProgress = false;

getDelay.addEventListener("input", function (event) {
    delayValue = event.currentTarget.value;
});

getFieldset.addEventListener("input", function (event) {
    fielsetValue = event.target.value;
});

function createPromise() {
    return new Promise(function (res, rej) {
        setTimeout(function () {
            if (fielsetValue === "fulfilled") {
                res();
            } else {
                rej();
            }
        }, delayValue);
    });
}

getForm.addEventListener("submit", function () {
    event.preventDefault();
      if (promiseProgress) {
       
        return;
    }
    promiseProgress = true
    createPromise()
        .then(function () {
            iziToast.show({
                title: '✅',
                message: `Promise fulfilled in ${delayValue} ms`,
                messageColor: '#FFF',
                position: 'topRight',
                color: '#59A10D'
            });
        })
        .catch(function () {
            iziToast.show({
                title: '❌',
                message: `Promise rejected in ${delayValue} ms`,
                messageColor: '#FFF',
                position: 'topRight',
                color: '#EF4040'
            });
        })
        .finally(() => {
            promiseProgress = false;
        });
});
