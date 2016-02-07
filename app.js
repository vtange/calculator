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
    $scope.entered = "";	 // init calculator
    var lastNum = /([()\w]+[-+/*^]?)(?!.*\d)/g;
	function replace(withThis){
			$scope.entered = $scope.entered.replace(lastNum,"");	//dropping the last number..
        	$scope.entered += withThis;								//and replace it 'withThis'. 'withThis' is defined in invoked fn.
	}
	
    $scope.enter = function(content){
        if ($scope.entered.length < 40){
        $scope.entered += content;									//add new entered info
        }
    };
    $scope.backspace = function(){
        $scope.entered =  $scope.entered.substring(0, $scope.entered.length - 1);		// replace current entered with what it is minus last letter
    };
    $scope.clear = function(){
        $scope.entered = "";										//clear entered info
    };
    $scope.prefix = function(content){								//for appending negative sign
        var replacement = "(" + content + $scope.entered.match(lastNum) + ")";
        if ($scope.entered == ""){
            $scope.enter(content);									//if empty, just add "-"
        }
        else{														//else get the last number and wrap it with (-x)
			replace(replacement);
        }
    };
    $scope.wrapper = function(content){												//for appending sin(), cos(), tan()
        var replacement = content + "(" + $scope.entered.match(lastNum) + ")";
		var altReplacement = content + "(" + $scope.entered.match(lastNum);
		var operators = /([-+/*^])/g;
		
        if ($scope.entered == ""){													//if nothing is in, sin(0, cos(0, etc. one parantheses for better edit
            $scope.entered = "0";
            replace(altReplacement);
        }
        else if($scope.entered.slice(-1).search(operators) != -1){					//if last entered char is an operator, return sin(0*, cos(0+, etc.
            replace(altReplacement);
        }
        else{																		//if hit 'sin'/'cos' on a number
        	replace(replacement);
        }
    };
    $scope.evaluate = function(){
        $scope.answer = Parser.evaluate($scope.entered);
        
        $scope.storage.SndLastAns = $scope.storage.lastAns;				//push up the last entry
        $scope.storage.SndLastEntered = $scope.storage.lastEntered;
        
        $scope.storage.lastAns = Parser.evaluate($scope.entered);		//push up current entry, show answer
        $scope.storage.lastEntered = $scope.entered;					
        $scope.entered = "";											//clear entry for new entry
    };
    
}]);//end of controller

    
})();