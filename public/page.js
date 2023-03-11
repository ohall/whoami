const reload = () => location.reload();
let interval
if (location.pathname === '/prompt') {
  interval = setInterval(reload, 500);
} else {
  if (interval) clearInterval(interval);
}

let inputEl = document.getElementsByName('form');
let btn = document.getElementById('submit');
btn.disabled = true;
console.log( inputEl );

// inputEl.addEventListener('input', () => {
//   btn.disabled = (this.value === '');
// })