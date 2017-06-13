(function () {
    'use strict';

    var venues = {
        controller: VenuesController,
        controllerAs: 'vm',
        templateUrl: `app/venues/popularity.html`,
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
            VenueService.get()
                .then(function (res) {
                    vm.venues = res.venues
                })
                .catch();
        }
    }


})();