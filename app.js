(function(){

var app = angular.module('calculator',[]);

app.factory('numbers', [function(){
  var timers = {
      cooldown: 5,
      session: 25,
  };
  return timers;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'numbers', '$interval', function($scope, numbers, $interval){
    $scope.timers = time; // load service

    
}]);//end of controller

    
})();