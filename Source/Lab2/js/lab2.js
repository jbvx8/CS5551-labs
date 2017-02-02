angular.module('GoogleDirectionWeather', [])
    .controller('googlemapoutput', function ($scope, $http) {

        var map;
        var mapOptions;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionsService = new google.maps.DirectionsService();

        $scope.initialize = function () {
            var pos = new google.maps.LatLng(39.0997, -94.5786);
            var mapOptions = {
                zoom: 8,
                center: pos
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
        };
        $scope.calcRoute = function () {
            var end = document.getElementById('endlocation').value;
            var start = document.getElementById('startlocation').value;

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };


            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                }

            });

            getWeather(autocomplete);
            getWeather(autocomplete2);
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize);

        getWeather = function(ac) {
            var place = ac.getPlace();
            place.address_components.forEach(function(element) {
                if (element.types[0] === "locality") {
                    city = element.long_name;
                }
                if (element.types[0] === 'administrative_area_level_1') {
                    state = element.short_name;
                }
            });
            $scope.weatherInfo = [];
            var url = "https://api.wunderground.com/api/36b799dc821d5836/conditions/q/" + state + "/" + city + ".json";
            $http.get(url).success(function(data) {
                console.log(data);
                $scope.opening = "Weather for";
                $scope.temp = data.current_observation.temp_f + "° F";
                $scope.icon = data.current_observation.icon_url;
                $scope.weather = "(" + data.current_observation.weather + ")";
                $scope.city = data.current_observation.display_location.city;
                $scope.state_name = data.current_observation.display_location.state_name;

                $scope.weatherInfo.push(
                    {
                        opening: "Weather for", temp: data.current_observation.temp_f + "° F",
                        icon: data.current_observation.icon_url, weather: "(" + data.current_observation.weather + ")",
                        city: data.current_observation.display_location.city, state_name: data.current_observation.display_location.state_name
                    });
            })
        }
    });

var autocomplete;
var autocomplete2;
function initAutocomplete() {

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('startlocation')),
        {types: ['geocode']};
    autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('endlocation')),
        {types: ['geocode']};
}