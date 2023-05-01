const toastEl = document.getElementById('toast');

function initToast() {
  toastEl.addEventListener('transitionend', () => {
    toastEl.classList.remove('toasting-out');
    toastEl.classList.add('hidden');
  });
}

function showToast(message, otherClasses) {
  toastEl.innerHTML = message;
  toastEl.className = 'toast ' + (otherClasses || '');
  setTimeout(() => {
    toastEl.classList.add('toasting-out');
  }, 2000);
}

export {
  initToast,
  showToast,
};