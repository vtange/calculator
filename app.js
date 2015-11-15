(function(){

var app = angular.module('calculator',[]);

app.factory('memory', [function(){
  var storage = {
      SndLastEntered:"",
      SndLastAns:"",
      lastEntered:"",
      lastAns:"",
  };
  return storage;
}]);//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
    $scope.storage = memory; // load service for practice. making my life more complicated for no reason :)
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
    $scope.prefix = function(content){
        var lastNum = /([()\w]+[-+/*^]?)(?!.*\d)/g
        var replacement = "(" + content + $scope.entered.match(lastNum) + ")";
        if ($scope.entered == ""){
            $scope.enter(content);
        }
        else{
        $scope.entered = $scope.entered.replace(lastNum,"");
        $scope.entered = $scope.entered.concat(replacement);
        }
    };
    $scope.wrapper = function(content){
        var operators = /([-+/*^])/g
        var lastNum = /([()\w]+[-+/*^]?)(?!.*\d)/g
        var replacement = content + "(" + $scope.entered.match(lastNum) + ")";
        if ($scope.entered == ""){
            $scope.entered = "0";
            var altReplacement = content + "(" + $scope.entered.match(lastNum);
            $scope.entered = $scope.entered.replace(lastNum,"");
            $scope.entered = $scope.entered.concat(altReplacement);
        }
        else if($scope.entered.slice(-1).search(operators) != -1){
            var altReplacement = content + "(" + $scope.entered.match(lastNum);
            $scope.entered = $scope.entered.replace(lastNum,"");
            $scope.entered = $scope.entered.concat(altReplacement);
        }
        else{
        $scope.entered = $scope.entered.replace(lastNum,"");
        $scope.entered = $scope.entered.concat(replacement);
        }
    };
    $scope.evaluate = function(){
        $scope.answer = Parser.evaluate($scope.entered);
        
        $scope.storage.SndLastAns = $scope.storage.lastAns;
        $scope.storage.SndLastEntered = $scope.storage.lastEntered;
        
        $scope.storage.lastAns = Parser.evaluate($scope.entered);
        $scope.storage.lastEntered = $scope.entered;
        $scope.entered = "";
    };
    
}]);//end of controller

    
})();