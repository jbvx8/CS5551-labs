'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.cityList = new Array();
        $scope.getData = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            //var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "") {
                document.getElementById('div_Weather').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("http://localhost:8081/getPlace" +
                    "&near=" + placeEntered);
                handler.success(function (data) {

                    if (data != null && data.response != null && data.response.city != undefined && data.response.city != null) {
                        for (var i = 0; i < data.response.city.length; i++) {
                            $scope.cityList[i] = {
                                "time": data.response.city[i].time,
                                "weather": data.response.city[i].weather,
                                "temperature": data.response.city[i].temperature,
                                "humidity": data.response.city[i].humidity,
                                "wind": data.response.city[i].wind,
                                "mood": data.response.city[i].mood
                            };
                        }
                    }

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
    });
