// retrieve HTML elements
const $body = document.body
const $alarm = document.getElementById('alarm')
const $timer = document.getElementById('timer')
const $form = document.getElementById('form')
const $seconds = document.getElementById('seconds')
const $clear = document.getElementById('clear')

let timer
let interval

function setCountdown (seconds) {
  // set countdown
  interval = setInterval(function () {
    seconds--
    if (seconds === 0) {
      clearInterval(interval)
      localStorage.removeItem('timer')
      $timer.textContent = '00'
    } else if (seconds < 10) {
      $timer.textContent = '0' + seconds
    } else {
      $timer.textContent = seconds
    }
  }, 1000)
}

function setTimer (ms) {
  // set timer
  timer = setTimeout(function () {
    $body.classList.add('alarm')
  }, ms)
}

$form.addEventListener('submit', function (e) {
  e.preventDefault()
  
  // get seconds
  const seconds = $seconds.value

  // calculate the milliseconds 
  const ms = seconds * 1000
  
  // save to local storage
  const now = new Date()
  localStorage.setItem('timer', now.getTime() + ms)

  setCountdown(seconds)
  setTimer(ms)
})

$clear.addEventListener('click', function (e) {
  e.preventDefault()
  clearTimeout(timer)
  clearInterval(interval)
  localStorage.removeItem('timer')
  $timer.textContent = '00'
  $body.classList.remove('alarm')
  $form.reset()
})

const ls = localStorage.getItem('timer')

if (ls) {
  const now = new Date()
  const ms = ls - now.getTime()
  const seconds = Math.floor(ms / 1000)
  
  setCountdown(seconds)
  setTimer(ms) 
}