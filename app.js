var todoApp = angular.module("todoApp",[]);
var model = {
              user: "Adam"
            };
todoApp.run(function ($http) {
  $http.get("todo.json").then(function (response) {
    model.items = response.data;
  });
});
todoApp.filter("checkedItems", function(){
  return function(items, showComplete){
    var resultArr = [];
    angular.forEach(items, function(item){
      if(item.done==false || showComplete==true){
        resultArr.push(item);
      }
    });
    return resultArr;
  }
});

todoApp.controller("Todoctrl", function($scope){
  $scope.todo = model;

  $scope.incompleteCount = function(){
    var count=0;
    angular.forEach($scope.todo.items, function(item){
      if(!item.done) {count++}
    });
    return count;
  }

  $scope.warningClass = function(){
    return ($scope.incompleteCount()<3 ? "label-success" : "label-warning");
  }

  $scope.newTodo = function(actionText){
    $scope.todo.items.push({action:actionText, done:false });
  }
});
