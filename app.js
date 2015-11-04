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
    
    
}]);//end of controller

    
})();