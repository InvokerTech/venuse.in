(function () {
    'use strict';

    var venue = {
        controller: ControllerController,
        controllerAs: 'vm',
        templateUrl: `app/venue/venue.html`,
    };

    angular
        .module('venuse')
        .component('venue', venue);


    angular
        .module('venuse')
        .controller('ControllerController', ControllerController);

    ControllerController.inject = ['VenueDetailService', '$stateParams', '$scope', '$state', 'BookService','AuthService'];
    function ControllerController(VenueDetailService, $stateParams, $scope, $state, BookService,AuthService) {
        var vm = this;


        vm.$onInit = function () {
            getvenue();
            vm.user=AuthService.isLogin();
            vm.testPay = '9.99';
            vm.loading = false;
            vm.venue = {};
            vm.startDate;
            vm.endDate;
            vm.book = {};
            vm.book.guests;
            vm.book.startDate = '';
            vm.book.endDate = '';
            vm.book.venueId = '';
            vm.book.eventType = '';

            //functions
            vm.startChange = startChange;
            vm.endChange = endChange;
            vm.eventSelect = eventSelect;
            $scope.submit = submit;
            vm.loginAlert=loginAlert;

        }

        function getvenue() {
            VenueDetailService.get($stateParams.id)
                .then(function (res) {
                    if (res.length !== 0) {
                        vm.venue = res.venue;
                        vm.book.venueId = vm.venue._id;
                    }
                    else alert('Vo Venue found.');
                    vm.loading = false;
                })
                .catch(function () {
                    vm.loading = true;
                });
        }


        function startChange() {
            vm.book.startDate = vm.startDate.getDay() + '/' +
                vm.startDate.getMonth() + '/' +
                vm.startDate.getFullYear() + ' ' +
                vm.startDate.getHours() + ':' +
                vm.startDate.getMinutes();

        }

        function endChange() {
            vm.book.endDate = vm.endDate.getDay() + '/' +
                vm.endDate.getMonth() + '/' +
                vm.endDate.getFullYear() + ' ' +
                vm.endDate.getHours() + ':' +
                vm.endDate.getMinutes();
        }

        function eventSelect(e) {
            vm.book.eventType = e;
        }

        function submit(data) {
            if (AuthService.isLogin()) {
                console.log(AuthService.isLogin());
                console.log(data);
                BookService.send(vm.book)
                    .then(function (res) {
                        if (res) {
                            alert('Venue Booked successfully.');
                            $state.go('home');
                        }
                        else alert('Venue Could not be booked. Try Again.');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            else alert('Please login to book venue.');
        }

        function loginAlert(){
            vm.user=AuthService.isLogin();
            if( !vm.user){
                alert('Please login to book venue.');
            }
            
            
        }

    }

})();