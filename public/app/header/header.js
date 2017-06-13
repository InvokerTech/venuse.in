
(function () {
    'use strict';


    var appHeader = {
        controller: HeaderController,
        controllerAs: 'vm',
        templateUrl: `app/header/header.html`,
    };
        
    angular
        .module('venuse')
        .component('appHeader', appHeader);


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
            vm.showLogin = showLogin;
            vm.showRegister = showRegister;
            vm.checkLogin = checkLogin;
            vm.formError = false;
            vm.regFormError = false;
            vm.checkReg = checkReg;
        }
        //end controller init
        function checkReg() {
            if (vm.regEmail && vm.regPass && vm.regName) {
                vm.regFormError = false;
                vm.regLoad = true;
                AuthService.register(vm.regName, vm.regEmail, vm.regPass)
                    .then(function () {
                        vm.regLoad = false;
                        vm.login();
                        $('#signup-modal').modal('hide');
                    })
                    .catch(function (err) {
                        vm.regLoad = false;
                        //  console.log(err);
                        alert(err.data.message);
                    });
            }
            else vm.regFormError = true;
        }

        function checkLogin() {
            if (vm.email && vm.pass) {
                vm.formError = false;
                vm.loginLoad = true;
                AuthService.login(vm.email, vm.pass)
                    .then(function () {
                        vm.loginLoad = false;
                        vm.login();

                    })
                    .catch();
            }
            else vm.formError = true;
        }
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

        function showLogin() {
            $('#signup-modal').modal('hide');
            $('#login-modal').modal();
        }
        function showRegister() {
            $('#login-modal').modal('hide');
            $('#signup-modal').modal();
        }
    }
})();