// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var Lab7 = angular.module('starter', ['ionic', 'ngCordova', 'firebase']);

Lab7.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

Lab7.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("firebase", {
            url: "/firebase",
            templateUrl: "templates/firebase.html",
            controller: "FirebaseController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        });
    $urlRouterProvider.otherwise('/firebase');
});

Lab7.controller("FirebaseController", function ($scope, $state, $firebaseAuth) {
    var fbAuth = $firebaseAuth();
    
    $scope.login = function(username, password) {      fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }
    $scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username, password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username, password);
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }     
});
                
Lab7.controller("SecureController", function($scope, $ionicHistory, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera,$state) {

    $ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];
    $scope.fb = $firebaseAuth();
    var fbAuth = $scope.fb.$getAuth();
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    if(fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("firebase");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }

});
