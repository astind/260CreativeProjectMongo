angular.module('todo', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope, $http){
    $scope.todo = [];
    var currentUser = '';
    
    $scope.getList = function(){
      console.log("in getlist");
      if($scope.userName === '') {return;}
      console.log("passed check: "+ $scope.userName);
      currentUser = $scope.userName;
      return $http.get('/todo?u='+$scope.userName).success(function(data){
	angular.copy(data, $scope.todo);
      });
    };

    $scope.addItem = function() {
      console.log("in addItem");
      if($scope.userName === '') {return;}
      if($scope.item === '') {return;}
      console.log("passed checks");
      $scope.create({
	owner: $scope.userName,
	item: $scope.item,
	priority: 0,
      });
      currentUser = $scope.userName;
      $scope.item = '';
    };

    $scope.create = function(item) {
      return $http.post('/todo', item).success(function(data) {
        $scope.todo.push(data);
      });
    };

    $scope.delete = function(item) {
      $http.delete('/todo/' + item._id)
	.success(function(data) {
	  console.log("delete worked");
	});
      $scope.getList();
    };
    $scope.getList();
   
    $scope.uppriority = function(item) {
      return $http.put('/todo/' + item._id + '/uppriority')
	.success(function(data) {
	  console.log("UP worked");
	  item.priority += 1;
	});
    };

    $scope.incrementPriority = function(item) {
	$scope.uppriority(item);
    };    
    
    $scope.downpriority = function(item) {
      return $http.put('/todo/' + item._id + '/downpriority')
        .success(function(data) {
	  console.log("down worked!");
	  item.priority -= 1;
        });
    };

    $scope.decrementPriority = function(item) {
	$scope.downpriority(item);
    };

  }
]);
