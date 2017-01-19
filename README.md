# Countdown
Pure Javascript Countdown - supports IE9+

##[CodePen Demo] (http://codepen.io/fionnachan/pen/EZgRzy/)

###HTML must-haves:

```
.whatever-name with data-date="dd-mm-yyyy"
  .day
  .hour
  .min
```

###JS initializer:

```
var efcc_countdown = new countdown({
  target: '.countdown',
  dayWord: ' days',
  hourWord: ' hours',
  minWord: ' mins'
});
```
