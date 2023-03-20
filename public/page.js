const reload = () => location.reload();
let interval
let HIDDEN = 'hidden';
let VISIBLE = 'visible';

if (location.pathname === '/prompt') {
  interval = setInterval(reload, 500);
} else {
  if (interval) clearInterval(interval);
}

window.onload = function(){
  let resultsDiv = document.getElementById("results");
  let resultsText = document.getElementById("resultsText");
  let inputEl = document.getElementById('prompt');
  let btn = document.getElementById('submit');

  if (location.pathname === '/' && resultsText.innerHTML === '') {
    resultsDiv.style.visibility = HIDDEN;
    btn.style.visibility = HIDDEN;
  } else {
    resultsDiv.style.visibility = VISIBLE;
  }

  inputEl.addEventListener('input', () => {
    btn.disabled = (inputEl.value === '');
    // resultsDiv.style.visibility = HIDDEN;
    btn.style.visibility = (inputEl.value === '') ? HIDDEN : VISIBLE;
  })
};
