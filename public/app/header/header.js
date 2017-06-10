
(function () {
    'use strict';

    angular
        .module('venuse')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['AuthService', '$scope', '$facebook'];
    function HeaderController(AuthService, $scope, $facebook) {
        var vm = this;

        vm.$onInit = function () {
            vm.fbLogin = fbLogin;
            vm.logOut = logOut;
            vm.userstatus = false;
            vm.user = {};
            vm.login = login;
         
        }
        //end controller init

        function login() {
            vm.userstatus = true;
            vm.user = AuthService.getUser();
            $('#login-modal').modal('hide');
        }
        function logOut() {
            AuthService.logOut();
            vm.userstatus = false;
            vm.user = {};
        }

        function fbLogin() {
            $facebook.login().then(function () {
                $facebook.api("/me?fields=id,name,email,picture").then(
                    function (response) {
                        console.log(response)
                        AuthService.fbLogin(response)
                            .then(function () {
                                $('#signup-modal').modal('hide');
                                vm.login();
                            })
                            .catch();
                    },
                    function (err) {
                        console.log(err);
                    })
                    .catch();
            });
        }


        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log('Signed in!');
            console.log(authResult);
            AuthService.googleLogin(authResult)
                .then(function () {
                    $('#signup-modal').modal('hide');
                    vm.login();

                })
                .catch();
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
            console.log(authResult);
        });
    }
})();