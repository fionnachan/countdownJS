const $ = elem => document.querySelector(elem);

const countdown = function(_config) {
  const tarDate = $(_config.target).getAttribute('data-date').split('-');
  const day = parseInt(tarDate[0]);
  const month = parseInt(tarDate[1]);
  const year = parseInt(tarDate[2]);
  let tarTime = $(_config.target).getAttribute('data-time');
  let tarhour, tarmin;
  
  if (tarTime != null) {    
    tarTime = tarTime.split(':');
    tarhour = parseInt(tarTime[0]);
    tarmin = parseInt(tarTime[1]);
  }

  console.log(tarhour)
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
  let isLeapYear = false;
  isLeapYear = checkLeapYear(yearNow);
  if (isLeapYear) {
    months[1] = 29;
  }
  
  if (monthNow == month && yearNow == year) {
    count_day = day - dayNow;
  } else {  
    let yearDiff = year - yearNow;
    for (let y = yearNow; y < year; y++) {
      if (checkLeapYear(y)) {
        count_day += 366;
      } else {
        count_day += 365;
      }
    }
    let monthDiff = month - monthNow;
    let numOfDaysThisMonth = months[monthNow-1];
    let smallerMonth = monthNow;
    let largerMonth = month;
    if (monthNow > month) {
      smallerMonth = month;
      largerMonth = monthNow;
    }
    
    for (let x = smallerMonth; x <= largerMonth; x++) {
      if (yearNow == year) {
        if (x == monthNow) {  
          count_day += numOfDaysThisMonth - dayNow; 
        } else if (x == month) {      
          count_day += day;
        } else {
          count_day += months[x-1];
        }
      } else if (year > yearNow) { // year > yearNow
        if (monthNow < month) {
          if (x == largerMonth) {            
            count_day += day;
          } else {
            count_day += months[x-1];
            if (x == monthNow) {
              count_day -= dayNow;
            }
          }
        } else if (monthNow == month) {
          if (x == largerMonth) {  
            count_day += day - dayNow;
          }
        } else { // month < monthNow
          if (x == largerMonth) {                        
            if (x == largerMonth) {  
              count_day += day - dayNow;
            }
          } else {            
            count_day -= months[x-1];
          }
        }
      }
      
    }

  }
  
  update();
  setInterval(update, 30000);
  
  function checkLeapYear(_year) {    
    if (_year % 4 == 0) {
      if (_year % 100 == 0) {
        if (_year % 400 == 0) {
          return true;
        }
      } else {    
        return true;
      }
    }
    return false;
  }
  
  function update() {
    dateNow = new Date();    
    hourNow = dateNow.getHours();
    minNow = dateNow.getMinutes();    

    if (tarTime == null) {
      count_hour = 23 - hourNow;
      count_min = 60 - minNow;    
    } else {      
      count_hour = tarhour - hourNow;
      count_min = tarmin - minNow; 
      if (tarmin < minNow) {
        count_hour -= 1;
        count_min += 60;
      }
      if (tarhour < hourNow || count_hour < 0) {
        count_day -= 1;
        count_hour += 24;
      }
    }
    
    if (yearNow > year || (monthNow >= month && dayNow >= day)) {
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
