const toastEl = document.getElementById('toast');
const toastMessageEl = document.getElementById('toastMessage');

function initToast() {
  toastEl.addEventListener('transitionend', () => {
    toastEl.classList.remove('toasting-out');
    toastEl.classList.add('hidden');
  });
}

function showToast(message, otherClasses) {
  toastMessageEl.innerHTML = message;
  toastEl.className = 'toast ' + (otherClasses || '');
  setTimeout(() => {
    toastEl.classList.add('toasting-out');
  }, 2000);
}

export {
  initToast,
  showToast,
};