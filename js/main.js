$(function() {
  var minutes = 25;
  var seconds = 0;
  var breakMinutes = 5;
  var breakSeconds = 0;
  var minutesCounter = 25;
  var secondsCounter = 0;
  var timer;
  var $clock = $('#clock');
  var $start = $('#start');
  var $stop = $('#stop');
  var $reset = $('#reset');
  var $minutesPomodoro = $('#minutesPomodoro');
  var $minutesBreak = $('#minutesBreak');
  var $restMessage = $('#restMessage');
  var isRest = false;

  function start() {
    minutesCounter = minutes;
    secondsCounter = seconds;
    $restMessage.hide();

    timer = setInterval(function() {

      if (--secondsCounter < 0) {
        secondsCounter = 59;
        minutesCounter--;
      }

      if (minutesCounter < 0) {
        if (isRest) {
          resetSession();
        } else {
          rest();
        }
      }

      renderClock();
    }, 1000);
  }

  function stop() {
    clearInterval(timer);
  }

  function reset() {
    stop();
    resetSession();
  }

  function resetSession() {
    isRest = false;
    minutesCounter = minutes;
    secondsCounter = seconds;
    $restMessage.hide();
  }

  function rest() {
    isRest = true;
    minutesCounter = breakMinutes;
    secondsCounter = breakSeconds;
    $restMessage.show();
  }

  function renderMinutes() {
    $minutesPomodoro.text(minutes);
    $minutesBreak.text(breakMinutes);
  }

  function renderClock() {
    $clock.text(minutesCounter + ':' + secondsCounter);
  }

  $start.on('click', function() {
    $start.attr('disabled', true);
    $stop.attr('disabled', false);

    start();
  });

  $stop.on('click', function() {
    $stop.attr('disabled', true);
    $start.attr('disabled', false);

    stop();
  });

  $reset.on('click', function() {
    $stop.attr('disabled', true);
    $start.attr('disabled', false);

    reset();
    renderClock();
  });

  $('#incrementPomodoro').on('click', function() {
    minutes++;
    renderMinutes();
  });


  $('#decrementPomodoro').on('click', function() {
    minutes--;
    if (minutes <= 0) {
      minutes = 1;
    }

    renderMinutes();
  });

  $('#incrementBreak').on('click', function() {
    breakMinutes++;
    renderMinutes();
  });


  $('#decrementBreak').on('click', function() {
    breakMinutes--;
    if (breakMinutes <= 0) {
      breakMinutes = 1;
    }

    renderMinutes();
  });


  ///
  renderMinutes();
  renderClock();
});