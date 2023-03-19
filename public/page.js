const reload = () => location.reload();
let interval

if (location.pathname === '/prompt') {
  interval = setInterval(reload, 500);
  document.getElementById("results").style.visibility = 'visibile';
} else {
  if (interval) clearInterval(interval);
}

window.onload = function(){
  let inputEl = document.getElementById('prompt');
  let btn = document.getElementById('submit');
  btn.disabled = true;
  inputEl.addEventListener('input', () => {
    btn.disabled = (inputEl.value === '');
    document.getElementById("results").style.visibility = 'hidden';
    document.getElementById(".innerHTML").innerHTML = '';
  })
};


