'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.cityList = new Array();
        $scope.getData = function () {
            var placeEntered = document.getElementById("txt_placeName").value.split(',');
            var city = placeEntered[0];
            var state = placeEntered[1];
            //var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "") {
                //document.getElementById('div_Weather').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("http://localhost:8081/getPlace" +
                    "?city=" + city + "&state=" + state);
                handler.success(function (data) {

                    if (data != null && data.city != undefined && data.city != null) {
                        for (var i = 0; i < data.city.length; i++) {
                            $scope.cityList[i] = {
                                "time": data.city[i].time,
                                "weather": data.city[i].weather,
                                "temperature": data.city[i].temperature,
                                "humidity": data.city[i].humidity,
                                "wind": data.city[i].wind,
                                "mood": data.city[i].mood
                            };
                        }
                        document.getElementById('div_Weather').style.display = 'block';
                    }

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
    });
