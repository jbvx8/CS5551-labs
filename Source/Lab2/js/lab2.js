/*var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: 39.0997, lng: -94.5786},
        zoom: 8
    });
}*/



angular.module('GoogleDirection', [])
    .controller('googlemapoutput', function ($scope) {

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
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize);

    });

var autocomplete;
var citystate = {
    locality: 'long-name',
    administrative_area_level_1: 'short-name'
};
function initAutocomplete() {(
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('startlocation')),
        {types: ['geocode']});
     //autocomplete.addListener('place_changed', populateAddress);

//function populateAddress() {
    // var place = autocomplete.getPlace();
    //  for (var component in citystate) {
    //      document.getElementById(component).value = '';
    //      document.getElementById(component).disabled = false;
    //  }
    //
    // for (var i = 0; i < place.address_components.length; i++) {
    //      var addressType = place.address_components[i].types[0];
    //      if (citystate[addressType]) {
    //          var val = place.address_components[i][citystate[addressType]];
    //          document.getElementById(addressType).value = val;
    //      }
    //  }
    //  console.log(place);
 }

angular.module('weather', [])
    .controller('weatherctrl', function($scope, $http) {

        $scope.getWeather = function() {
            var place = autocomplete.getPlace();
            //var city = place.locality;
            //var state = place.administrative_area_level_1;
            // var url = "https://api.wunderground.com/api/36b799dc821d5836/conditions/q/" + state + "/" + city + ".json";
            var url = "https://api.wunderground.com/api/36b799dc821d5836/conditions/q/MO/Springfield.json";
            $http.get(url).success(function(data) {
                console.log(data);
                temp = data.current_observation.temp_f;
                icon = data.current_observation.icon_url;
                weather = data.current_observation.weather;
                console.log(temp);
                $scope.currentweather = {
                    html: "Currently " + temp + " &deg; F and " + weather + ""
                }
                $scope.currentIcon = {
                    html: "<img src='" + icon + "'/>"
                }
                $scope.htmlTemp = temp;

            })
        }

    });

angular.module('combine', ['GoogleDirection', 'weather'])