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
            getVenues();
            vm.sortBy = sortBy;
            vm.sortfilters = [{ value: 'popular', name: "By Popularity" },
            { value: 'hourly_rate', name: "By Price" }];
            vm.sortFilter = vm.sortfilters[0];
        }

        function sortBy(s) {
            vm.venues = _.sortBy(vm.venues, s.value);
           // console.log(vm.venues);
        }

        function getVenues() {
            VenueService.get()
                .then(function (res) {
                    vm.venues = res.venues
                })
                .catch();
        }
    }


})();