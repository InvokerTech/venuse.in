(function () {
    'use strict';

    var venues = {
        controller: VenuesController,
        controllerAs: 'vm',
        templateUrl: `app/venues/venues.html`,
    };

    angular
        .module('venuse')
        .component('venues', venues);


    angular
        .module('venuse')
        .controller('VenuesController', VenuesController);

    VenuesController.inject = ['VenueService'];
    function VenuesController(VenueService) {
        var vm = this;
        vm.$onInit = function () {

            vm.sortBy = sortBy;
            vm.setMap = setMap;
            vm.eventSelect = eventSelect;
            vm.toggleMore = toggleMore;
            vm.moreFilter = { status: false, text: ['Show More Filters', 'Less Filters'] };
            vm.moreFilter.selected = vm.moreFilter.text[0];
            vm.sortfilters = [{ value: 'popular', name: 'By Popularity' },
            { value: 'hourly_rate', name: 'By Price' }];
            vm.sortFilter = vm.sortfilters[0];
            vm.filter = {};
            vm.filter.event = 'What are you planning';
            vm.venues = [];

            vm.minRangeSlider = {
                minValue: 10,
                maxValue: 90,
                options: {
                    floor: 0,
                    ceil: 100,
                    step: 1
                }
            };

            getVenues();
        }

        function sortBy(s) {
            vm.venues = _.sortBy(vm.venues, s.value);
            // console.log(vm.venues);
        }
        function setMap() {
            var places = new google.maps.places.Autocomplete(document.getElementById('txtSearchLocation'));
            google.maps.event.addListener(places, 'place_changed', function () {
                var boundsByCity = places.getPlace();
                // console.log(boundsByCity);
                // console.log(boundsByCity.name);
                vm.filter.place = boundsByCity.name;
                // console.log(vm.places[0]);
                var lat = boundsByCity.geometry.location.lat();
                var lng = boundsByCity.geometry.location.lng();
                if (lat !== null && lng !== null) {
                    vm.filter.lat = lat;
                    vm.filter.lng = lng;
                }
            });

        }

        function getVenues() {
            VenueService.get()
                .then(function (res) {
                    vm.venues = res.venues
                })
                .catch();
        }

        function eventSelect(e) {
            // alert(e);
            vm.filter.event = e;
        }
        function toggleMore() {
            if (vm.moreFilter.status === true) {
                vm.moreFilter.status = false;
                vm.moreFilter.selected = vm.moreFilter.text[0];
            }
            else {
                vm.moreFilter.status = true;
                vm.moreFilter.selected = vm.moreFilter.text[1];
            }
        }
    }


})();