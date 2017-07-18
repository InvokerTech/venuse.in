(function () {
    'use strict';

    var home = {
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: `app/home/home.html`
    };

    angular
        .module('venuse')
        .component('home', home);


    angular
        .module('venuse')
        .controller('HomeController', HomeController);

    HomeController.inject = ['$state'];
    function HomeController($state) {
        var vm = this;


        vm.$onInit = function () {
            vm.city = '';
            vm.event = '';


            vm.setCity = setCity;
            vm.setEvent = setEvent;
            vm.submit = submit;
            vm.userLocation = userLocation;

            userLocation();
        }

        function setCity(c) {
            vm.city = c;
        }

        function setEvent(v) {
            vm.event = v;
        }

        function submit() {
            if (vm.city !== '') {
                $state.go('venues', { city: vm.city, event: vm.event });
            }
            else $state.go('venues', { city: 'Pune', event: vm.event });;
        }

        function userLocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    //   alert("location loaded");
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var latlng = new google.maps.LatLng(lat, lng);
                    var geocoder = new google.maps.Geocoder();
                    var geopromise = new Promise(function (resolve) {
                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results) {
                                    resolve(results);
                                }
                            }
                            else {
                                alert("Something went wrong with geocoding.");
                            }
                        });

                    });

                    geopromise.then(function (res) {
                        _.forEach(res, function (obj) {
                            for (var i = 0; i < obj.address_components.length; i++) {
                                if (obj.address_components[i].types[0] == "locality") {
                                    //   alert(obj.address_components[i].short_name+" "+obj.address_components[i].long_name);
                                    if (obj.address_components[i].long_name === 'Pune' || obj.address_components[i].long_name === 'Mumbai') {
                                        vm.city = obj.address_components[i].long_name;
                                        return false;
                                    }

                                }
                            }
                        });
                    });
                });
            }

        } //eof

    }


})();