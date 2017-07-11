(function () {
    'use strict';

    var bookings = {
        controller: 'BookingController',
        controllerAs: 'vm',
        templateUrl: `app/bookings/booking_details.html`
    };

    angular
        .module('venuse')
        .component('bookings', bookings);


    angular
        .module('venuse')
        .controller('BookingController', BookingController);

    BookingController.inject = ['BookingsService', 'AuthService'];
    function BookingController(BookingsService, AuthService) {
        var vm = this;


        vm.$onInit = function () {
            vm.loading = false;
            vm.user = AuthService.getUser();
            vm.bookings = [];


            vm.loading = true;
            BookingsService.get(vm.user._id)
                .then(function (res) {
                    vm.bookings = res.data.bookings;
                    vm.loading = false;
                })
                .catch(function (err) {
                    console.log(err);
                    alert('No Bookings Found.');
                    vm.loading = false;
                });
        }
    }


})();