(function () {
    'use strict';

    var venue = {
        controller: VenueController,
        controllerAs: 'vm',
        templateUrl: `app/venue/venue.html`,
    };

    angular
        .module('venuse')
        .component('venue', venue);


    angular
        .module('venuse')
        .controller('VenueController', VenueController);

    VenueController.inject = ['VenueDetailService', '$stateParams',
        '$scope', '$state', 'BookService', 'AuthService', 'MessageService'];
    function VenueController(VenueDetailService, $stateParams, $scope,
        $state, BookService, AuthService, MessageService) {
        var vm = this;


        vm.$onInit = function () {
            getvenue();
            vm.user = AuthService.isLogin();
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
            vm.book.isFlexible = false;
            vm.book.isBusiness = false;
            vm.book.msg = '';
            vm.book.budget = '';
            vm.book.hostId = '';
            //functions
            vm.startChange = startChange;
            vm.endChange = endChange;
            vm.eventSelect = eventSelect;
            vm.guestSelect = guestSelect;
            $scope.submit = submit;
            vm.loginAlert = loginAlert;
            vm.sendMsg = sendMsg;


        }

        function getvenue() {
            VenueDetailService.get($stateParams.id)
                .then(function (res) {
                    if (res.length !== 0) {
                        vm.venue = res.venue;
                        vm.book.venueId = vm.venue._id;
                        vm.book.hostId = vm.venue.user_id;
                        vm.loadCarasoul = true;
                        $("#owl-demo").owlCarousel({
                            navigation: true,
                            items: 3,
                            navigationText: [
                                "<i class='fa fa-angle-left'></i>",
                                "<i class='fa fa-angle-right'></i>"
                            ]

                        });
                    }
                    else alert('Vo Venue found.');
                    vm.loading = false;
                })
                .catch(function () {
                    vm.loading = true;
                });
        }


        function startChange() {
            if (vm.startDate < new Date()) {
                alert('Please dont select a past date.');
                vm.startDate = null;
            }
            else {

                vm.book.startDate = vm.startDate.getDay() + '/' +
                    vm.startDate.getMonth() + '/' +
                    vm.startDate.getFullYear() + ' ' +
                    vm.startDate.getHours() + ':' +
                    vm.startDate.getMinutes();
            }

        }

        function endChange() {
            if (vm.endDate < vm.startDate) {
                alert('Please select a later end date');
                vm.endDate = null;
            }
            else {
                vm.book.endDate = vm.endDate.getDay() + '/' +
                    vm.endDate.getMonth() + '/' +
                    vm.endDate.getFullYear() + ' ' +
                    vm.endDate.getHours() + ':' +
                    vm.endDate.getMinutes();
            }
        }

        function eventSelect(e) {
            vm.book.eventType = e;
        }
        function guestSelect(g) {
            vm.book.guests = g;

        }

        function submit(data) {

            if (AuthService.isLogin()) {
                vm.loading = true;
                console.log(AuthService.isLogin());
                console.log(data);
                BookService.send(vm.book)
                    .then(function (res) {
                        if (res) {
                            alert('Venue Booked successfully.');
                            $state.go('home');
                        }
                        else {
                            alert('Venue Could not be booked. Try Again.');
                            vm.loading = false;
                        }
                    })
                    .catch(function (err) {
                        alert('Venue Could not be booked. Try Again.');
                        console.log(err);
                        vm.loading = false;
                    });
            }
            else alert('Please login to book venue.');
        }

        function loginAlert() {
            vm.user = AuthService.isLogin();
            if (!vm.user) {
                alert('Please login to book venue.');
            }
        }

        function sendMsg() {

            if (AuthService.isLogin()) {
                vm.loading = true;
                console.log(AuthService.isLogin());
                console.log();
                MessageService.send(vm.book)
                    .then(function (res) {
                        if (res.status) {
                            alert('Message sent successfully.');
                            $('#contactModal').modal('hide');
                            vm.loading = false;
                        }
                        else {
                            alert('Message could not be sent.');
                            vm.loading = false;
                        }
                    })
                    .catch(function (err) {
                        alert('Message could not be sent.');
                        console.log(err);
                        vm.loading=false;
                    });
            }
            else alert('Please login to send message.');

        }

    }

})();