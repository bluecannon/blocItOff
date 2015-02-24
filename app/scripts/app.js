/* Before we can use AngularFire with dependency injection, we need to register 
   firebase as a module in our app and defined in below line; Harry 2-08-2015*/

/* The $firebase service is available to be injected into any controller now. */
var blocItOff = angular.module('blocItOff', ['ui.router', 'firebase']);

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   /* home page */
   $stateProvider.state('home', {
      url: '/',
      controller: 'home.controller',
      templateUrl: '/templates/home.html'
   });

   /* Current or Active tasks page */
   $stateProvider.state('currentTask', {
      url: '/',
      controller: 'currentTask.controller',
      templateUrl: '/templates/currentTask.html'
    });

   /* Task expired or history page */
    $stateProvider.state('taskHistory', {
      url: '/',
      controller: 'taskHistory.controller',
      templateUrl: '/templates/taskHistory.html'
    });

   /* state for Add new task */
    $stateProvider.state('addTask', {
      url: '/',
      controller: 'addTask.controller',
      templateUrl: '/templates/addTask.html'
    });
}]);

blocItOff.controller('home.controller', ['$scope', '$firebase', function($scope, $firebase) {

    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
   
    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    // $scope.data = sync.$asObject();

    var syncObject = sync.$asObject();

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "tasks");

    // Bind ng-model, and create a synchronized array for use in our HTML code, 
    $scope.tasks = sync.$asArray();
    $scope.subText = "Current Tasks";
}]);

blocItOff.controller('currentTask.controller', ['$scope', '$firebase', function($scope, $firebase) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
   
    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    // $scope.data = sync.$asObject();

    var syncObject = sync.$asObject();

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "tasks");

    // Bind ng-model, and create a synchronized array for use in our HTML code, 
    $scope.tasks = sync.$asArray();
    $scope.subText = "Current Tasks";

}]);

blocItOff.controller('addTask.controller', ['$scope', '$firebase', function($scope) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
    
    $scope.messages = $firebase(ref).$asArray();

    // add message method
    $scope.addMessage = function(e) {
          if ($scope.newTask) {
              var newTask = $scope.newTask;
              $scope.tasks.$add({task:newTask, status:"active"});
              // clear task
              $scope.tasks = "";
          }
    }    
}]);

blocItOff.controller('taskHistory.controller', ['$scope', '$firebase', function($scope) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/tasks");
   
    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    // $scope.data = sync.$asObject();

    var syncObject = sync.$asObject();

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "tasks");

    // Bind ng-model, and create a synchronized array for use in our HTML code, 
    $scope.tasks = sync.$asArray();
    $scope.subText = "Task History";
}]);