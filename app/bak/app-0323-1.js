/* Before we can use AngularFire with dependency injection, we need to register 
   firebase as a module in our app and defined in below line; Harry 2-08-2015*/

/* The $firebase service is available to be injected into any controller now. */
var blocItOff = angular.module('blocItOff', ['ui.router', 'firebase']);

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   /* $locationProvider.html5Mode(true); commented out to avoid $location:nobase error 3-23-15 */
 
   /* home page */
   $stateProvider.state('home', {
      url: '/',
      controller: 'home.controller',
      templateUrl: '/templates/home.html'
   });

   /* Current or Active tasks page */
   $stateProvider.state('currentTask', {
      url: '/current',
      controller: 'currentTask.controller',
      templateUrl: '/templates/currentTask.html'
    });

   /* Task expired or history page */
    $stateProvider.state('taskHistory', {
      url: '/history',
      controller: 'taskHistory.controller',
      templateUrl: '/templates/taskHistory.html'
    });

   /* state for Add new task */
    $stateProvider.state('addTask', {
      url: '/add',
      controller: 'addTask.controller',
      templateUrl: '/templates/addTask.html'
    });
}]);

blocItOff.controller('home.controller', ['$scope', '$firebaseArray', '$filter', function($scope, $firebaseArray, $filter) {

    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");

    //var syncObj = $firebaseObject(ref);
    //syncObj.$bindTo($scope, "tasks"); 
    $scope.tasks = $firebaseArray(ref); // 3-23-15
    $scope.subText = "Current Tasks";

}]);

blocItOff.controller('currentTask.controller', ['$scope', '$firebaseArray', 'filter', function($scope, $firebaseArray, $filter) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
   
    // create an AngularFire reference to the data  
    $scope.tasks = $firebaseArray(ref);
    $scope.subText = "Current Tasks"; 

     $scope.completeTask = function(task) {
       task.status = 'inactive'; 
     };
}]);

blocItOff.filter('findActiveTask', function($log) {
     return function(tasks) {
        //$log.info(tasks);
    
        var activeTasks = [];
        for (var i=0; i<tasks.length; i++) {
          //$log.info(tasks[i]);
          if (tasks[i].status === 'active') {
            activeTasks.push(tasks[i]);
          }
        }
        //$log.info(activeTasks);
        return activeTasks;
     };
});

blocItOff.controller('taskHistory.controller', ['$scope', '$firebaseArray', 'filter', function($scope, $firebaseArray, $filter) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
   
    // create an AngularFire reference to the data
    var sync = $firebaseArray(ref);

    $scope.tasks = $firebaseArray(ref);
    $scope.subText = "Task History";
}]);

blocItOff.controller('addTask.controller', ['$scope', '$firebaseArray', 'filter', function($scope, $firebaseArray, $filter) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
    //var sync = $firebaseArray(ref); 3-23-2015
    // var syncObject = sync.$firebaseObject();  3-23-2015
    // syncObject.$bindTo($scope, "tasks");  3-23-2015
                        
    $scope.subText = "Add Task";  

    // $scope.messages = sync.$asArray();  // 3-23-2015
    $scope.messages = $firebaseArray(ref); // 3-23-2015
        
    // add message method
    
    $scope.addMessage = function(e) { 
       if (e.keyCode === 13 && $scope.task.task && $scope.task.priority) { 
          $scope.addTask($scope.task);
       }
     }

     $scope.addTask = function(myTask) {
          var task = myTask.task;
          var priority = myTask.priority;
          $scope.messages.$add({task:task, status:"active", priority:priority});
          $scope.clearTask();
     };

     $scope.clearTask = function() {
          // clear task
          $scope.task.task = "";
          $scope.task.status = "";
          $scope.task.priority= "";      
     };

     $scope.completeTask = function(task) {
       task.status = 'inactive';
     };
}]);

/*
blocItOff.filter('findActiveTask', ['$scope', '$firebase', function($scope, $firebase){
      var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
      var sync = $firebase(ref);

      $scope.findActiveTask = function(task) {

          if (task.status === 'active'){
            return true;
          }
          else
            return false;
     }     
}]); */