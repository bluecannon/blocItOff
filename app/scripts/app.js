/* Inject the firebase service into controllers now. */
var blocItOff = angular.module('blocItOff', ['ui.router','firebase']);

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   
   // $locationProvider.html5Mode(true);  commented out to avoid $location:nobase error 3-23-15 */
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

blocItOff.controller('home.controller', function($scope, $firebaseArray, $firebaseObject) {

    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");

    //var syncObj = $firebaseObject(ref);
    $scope.tasks = $firebaseArray(ref); // 3-23-15
    $scope.subText = "Current Tasks";
});

blocItOff.controller('currentTask.controller', function($scope, $firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
    //var syncObj = $firebaseObject(ref);

    // create an AngularFire reference to the data  
    $scope.tasks = $firebaseArray(ref);
    $scope.subText = "Current Tasks"; 
    
    //syncObj.$bindTo($scope, "tasks");    // synchronize the object with a three-way data binding
    $scope.completeTask = function(myTask) { 
       var task = myTask.task;
       var priority = myTask.priority;
       var status = "inactive";
             
       //$scope.tasks.$save({task:task, priority:priority, status:status});
       $scope.tasks.$remove(myTask);  // delete the original ative task;
       $scope.tasks.$add({task:task, priority:priority, status:status}); // add the inactive task
    }; 
});

blocItOff.controller('taskHistory.controller', function($scope, $firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
   
    // create an AngularFire reference to the data
    var sync = $firebaseArray(ref);

    $scope.tasks = $firebaseArray(ref);
    $scope.subText = "Task History";
});

blocItOff.controller('addTask.controller', function($scope, $firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
                            
    $scope.subText = "Add Task";  

    // $scope.messages = sync.$asArray();  // 3-23-2015
    $scope.messages = $firebaseArray(ref); // 3-23-2015
        
    // add message method 
    $scope.addMessage = function(e) { 
       if (e.keyCode === 13 && $scope.task.task && $scope.task.priority) { 
          $scope.addTask($scope.task);
       }
    };
    $scope.addTask = function(myTask) {
          var task = myTask.task;
          var priority = myTask.priority;
          //$scope.messages.$add({task:task, status:"active", priority:priority});
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
});

blocItOff.filter('findActiveTask', function($log) {
     return function(tasks) {
        var activeTasks = [];
        for (var i=0; i<tasks.length; i++) {
          if (tasks[i].status === 'active') {
            activeTasks.push(tasks[i]);
          }
        }
        return activeTasks;
     };
});
