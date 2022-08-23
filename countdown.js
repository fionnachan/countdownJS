const cdwn = elem => document.querySelector(elem);

const countdown = function(_config) {
  const tarDate = cdwn(_config.target).getAttribute('data-date').split('-');
  const day = parseInt(tarDate[0]);
  const month = parseInt(tarDate[1]);
  const year = parseInt(tarDate[2]);
  let tarTime = cdwn(_config.target).getAttribute('data-time');
  let tarhour, tarmin;
  let animationFrame;

  if (tarTime != null) {
    tarTime = tarTime.split(':');
    tarhour = parseInt(tarTime[0]);
    tarmin = parseInt(tarTime[1]);
  }

  let months = [31, new Date().getFullYear() % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dateNow = new Date();
  let dayNow = dateNow.getDate();
  let monthNow = dateNow.getMonth() + 1;
  let yearNow = dateNow.getFullYear();
  let hourNow = dateNow.getHours();
  let minNow = dateNow.getMinutes();
  let count_day = 0, count_hour = 0, count_min = 0;
  let count_day_isSet = false;
  let isOver = false;

  // Set the date we're counting down to
  const countDownDate = new Date(year, month-1, day, tarhour, tarmin, 0, 0).getTime();

  cdwn(_config.target+' .day .word').innerHTML = _config.dayWord;
  cdwn(_config.target+' .hour .word').innerHTML = _config.hourWord;
  cdwn(_config.target+' .min .word').innerHTML = _config.minWord;
  cdwn(_config.target+' .sec .word').innerHTML = _config.secWord;

  const updateTime = () => {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;

    if (distance < 0) {
      cdwn(".countdown").innerHTML = `<span class="expired countdown__expired">${_config.expired ? _config.expired : 'expired'}</span>`;
      clearInterval(animationFrame)
      return false;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //requestAnimationFrame(updateTime);

    cdwn(_config.target+' .day .num').innerHTML = addZero(days);
    cdwn(_config.target+' .hour .num').innerHTML = addZero(hours);
    cdwn(_config.target+' .min .num').innerHTML = addZero(minutes);
    cdwn(_config.target+' .sec .num').innerHTML = addZero(seconds);

    // If the count down is over, write some text

  }
  //start
  updateTime()
  animationFrame = setInterval( updateTime, 1000)
}

const addZero = (x) => (x < 10 && x >= 0) ? "0"+x : x;
