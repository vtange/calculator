(function(){

var app = angular.module('pomodoro',[]);

app.factory('time', [function(){
  var timers = {
      cooldown: 5,
      session: 25,
  };
  return timers;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'time', '$interval', function($scope, time, $interval){
    $scope.timers = time; // load service
    $scope.currentMode = "Session";//session mode or break mode
    $scope.originalSetTime = $scope.timers.session;

    var timerOn = false;
    var secs = 60 * $scope.timers.session;
    $scope.timeLeft = secondsToHms(secs);//shown time
    
    $scope.addBreak = function() {
        if (!timerOn) {
      $scope.timers.cooldown += 1;
            if ($scope.currentMode === 'Break!') {
      $scope.timeLeft = $scope.timers.cooldown;//update time
      secs = 60 * $scope.timeLeft;
            }
        }
    };
    $scope.lowerBreak = function() {
        if (!timerOn  && $scope.timers.cooldown > 1) {
      $scope.timers.cooldown -= 1;
            if ($scope.currentMode === 'Break!') {
      $scope.timeLeft = $scope.timers.cooldown;//update time
      secs = 60 * $scope.timeLeft;
            }
        }
    };
    $scope.addSession = function() {
        if (!timerOn) {
      $scope.timers.session += 1;
              if ($scope.currentMode === 'Session') {
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
              }
        }
    };
    $scope.lowerSession = function() {
        if (!timerOn  && $scope.timers.session > 1) {
      $scope.timers.session -= 1;
            if ($scope.currentMode === 'Session') {
      $scope.timeLeft = $scope.timers.session;//update time
      secs = 60 * $scope.timeLeft;
            }
        }
    };

  $scope.checkTimer = function() {
      if (!timerOn) {
        return true;
      }
      else {
          return false;
      }
  }
  $scope.swapTimer = function() {
      if ($scope.currentMode === 'Break!') {
        $scope.currentMode = 'Session';
        $scope.originalSetTime = $scope.timers.session;
        secs = 60 * $scope.timers.session;
        $scope.timeLeft = secondsToHms(secs);
        document.querySelector(".progress-bar").style.backgroundColor = "green";
      } else {
        $scope.currentMode = 'Break!';
        $scope.originalSetTime = $scope.timers.cooldown;
        secs = 60 * $scope.timers.cooldown;
        $scope.timeLeft = secondsToHms(secs);
        document.querySelector(".progress-bar").style.backgroundColor = "FireBrick";
      }
  }
  
    
  $scope.toggleTimer = function() {
    if (!timerOn) {
      if ($scope.currentMode === 'Session') {
        $scope.originalSetTime = $scope.timers.session;
      } else {
        $scope.originalSetTime = $scope.timers.cooldown;
      }

      updateTimer();
      timerOn = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(timerOn);
      timerOn = false;
    }
  }
function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      // countdown is finished
      
      // Play audio
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
			audio.play();
      
      // toggle break and session during hit 0
      if ($scope.currentMode === 'Break!') {
        $scope.currentMode = 'Session';
        $scope.timeLeft = 60 * $scope.timers.session;
        $scope.originalSetTime = $scope.timers.session;
        secs = 60 * $scope.timers.session;
        document.querySelector(".progress-bar").style.backgroundColor = "green";
      } else {
        $scope.currentMode = 'Break!';
        $scope.timeLeft = 60 * $scope.timers.cooldown;
        $scope.originalSetTime = $scope.timers.cooldown;
        secs = 60 * $scope.timers.cooldown;
        document.querySelector(".progress-bar").style.backgroundColor = "FireBrick";
      }
    } else {
      if ($scope.currentMode === 'Break!') {
        //use and move red box
      } else {
        //use and move grn box
      }
	  $scope.timeLeft = secondsToHms(secs);//update time left
      
      var totalsecs = 60 * $scope.originalSetTime;
      var percentage = Math.abs((secs / totalsecs) * 100 - 100);
      //move the box with percentage
      document.querySelector(".progress-bar").style.width = percentage + "%";
    }
  }
 
  function secondsToHms(sec) {
    sec = Number(sec);
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
    
}]);//end of controller

    
})();