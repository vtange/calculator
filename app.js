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
    $scope.answer = "";
    
    $scope.enter = function(content){
        $scope.entered =  $scope.entered.concat(content);
    };
    $scope.backspace = function(){
        $scope.entered =  $scope.entered.substring(0, $scope.entered.length - 1);
    };
    $scope.clear = function(){
        $scope.entered = "";
    };
    $scope.prefix = function(content){
        var lastNum = /(\d+)(?!.*\d)/g
        var replacement = "(" + content + $scope.entered.match(lastNum) + ")";
        $scope.entered = $scope.entered.replace(lastNum,"");
        $scope.entered = $scope.entered.concat(replacement);
    };
    $scope.evaluate = function(){
        $scope.answer = Parser.evaluate($scope.entered);
        $scope.storage.lastAns = Parser.evaluate($scope.entered);
        $scope.entered = "";
    };
    
}]);//end of controller

    
})();