const $ = elem => document.querySelector(elem);

const countdown = function(_config) {
  const tarDate = $(_config.target).getAttribute('data-date').split('-');
  const day = parseInt(tarDate[0]);
  const month = parseInt(tarDate[1]);
  const year = parseInt(tarDate[2]);

  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dateNow = new Date();
  let dayNow = dateNow.getDate();
  let monthNow = dateNow.getMonth() + 1;
  let yearNow = dateNow.getFullYear();
  let hourNow = dateNow.getHours();
  let minNow = dateNow.getMinutes();
  let count_day = 0;
  let count_hour = 0;
  let count_min = 0;

  // check if it is Leap Year
  const isLeapYear = false;
  if (yearNow % 4 == 0) {
    if (yearNow % 100 == 0) {
      if (yearNow % 400 == 0) {
        isLeapYear = true;
      }
    } else {    
      isLeapYear = true;
    }
  }

  if (isLeapYear) {
    months[1] = 29;
  }

  if (monthNow == month) {
    count_day = day - dayNow;
  } else {
    let monthDiff = month - monthNow;
    let numOfDaysThisMonth = months[monthNow-1];
    count_day += numOfDaysThisMonth - dayNow;

    for (let x = monthNow + 1; x <= month; x++) {
      if (x == month) {      
        count_day += day;
      } else {
        count_day += months[x-1];
      }
    }

  }
  
  update();
  setInterval(update, 30000);
  
  function update() {
    dateNow = new Date();    
    hourNow = dateNow.getHours();
    minNow = dateNow.getMinutes();

    count_hour = 23 - hourNow;
    count_min = 60 - minNow;
    
    if (count_day >= 0) {
    } else {
      count_day = 0;
      count_hour = 0;
      count_min = 0;
    }
    $(_config.target+' .day').innerHTML = addZero(count_day) + _config.dayWord;
    $(_config.target+' .hour').innerHTML = addZero(count_hour) + _config.hourWord;
    $(_config.target+' .min').innerHTML = addZero(count_min) + _config.minWord; 
  }

  function addZero(x) {
    if (x < 10 && x >= 0) {
      return "0"+x;
    } else {
      return x;
    }
  }
}
