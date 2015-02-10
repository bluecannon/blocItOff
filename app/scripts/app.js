/* Before we can use AngularFire with dependency injection, we need to register firebase as a module in our app. Harry 2-08-2015*/
var app = angular.module('blocItOff', ["firebase"]);
app.controller("blocItOff.controller", ["$scope", "$firebase",
  function($scope, $firebase) {
    var ref = new Firebase("https://blistering-heat-9377.firebaseIO.com/data");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    //$scope.data = sync.$asObject();

    var syncObject = sync.$asObject();
    syncObject.$bindTo($scope, "data");
    // simple JSON output test for angular filter
    //$scope.subText = "Current Tasks"; 

    // set up three-way data binding 
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    /* syncObject.$bindTo($scope, "data"); */
  }
]);


