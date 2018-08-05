# Countdown
Pure Javascript Countdown - supports IE9+

CodePen Demo: http://codepen.io/fionnachan/pen/EZgRzy/

### HTML must-haves:

```
.whatever-name with data-date="dd-mm-yyyy"
  .day
  .hour
  .min
  .sec
```
Default end time is 23:59 of the date.
```
.whatever-name with data-date="dd-mm-yyyy" and data-time="hh:mm"
  .day
  .hour
  .min
  .sec
```
End time is set to hour:minute (24-hour format) of the date.

### JS initializer:

```
var efcc_countdown = new countdown({
  target: '.countdown',
  dayWord: ' days',
  hourWord: ' hours',
  minWord: ' mins',
  secWord: ' secs'
});
```
