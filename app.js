(function(){

var app = angular.module('calculator',[]);

app.factory('memory', [function(){
  var storage = {
      lastAns:1,
  };
  return storage;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
    $scope.storage = memory; // load service
    $scope.entered = "";
    
    $scope.enter = function(content){
        $scope.entered =  $scope.entered.concat(content);
    };
    $scope.backspace = function(){
        $scope.entered =  $scope.entered.substring(0, $scope.entered.length - 1);
    };
    $scope.clear = function(){
        $scope.entered = "";
    };
    
}]);//end of controller

    
})();