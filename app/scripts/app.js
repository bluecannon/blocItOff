/* Before we can use AngularFire with dependency injection, we need to register 
   firebase as a module in our app and defined in below line; Harry 2-08-2015*/
var app = angular.module('blocItOff', ["firebase"]);
app.controller("blocItOff.controller", ["$scope", "$firebase",
  function($scope, $firebase) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/data");
   
    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    // $scope.data = sync.$asObject();

    var syncObject = sync.$asObject();

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "data");

    // Bind ng-model, and create a synchronized array for use in our HTML code, 
    $scope.messages = sync.$asArray();
  }
]);

/* The $firebase service is available to be injected into any controller now. */
blocItOff = angular.module('blocItOff', ['ui.router']);

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   $stateProvider.state('index', {
     url: '/',
     controller: 'index.controller',
     templateUrl: '/templates/currentTask.html'
   });
}]);

blocItOff.controller('index.controller', ['$scope', function($scope) {
   $scope.subText = "Current Tasks";
}]);
