
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
        }
        //end controller init


        function fbLogin() {
            $facebook.login().then(function () {
                $facebook.api("/me?fields=id,name,email,picture").then(
                    function (response) {
                        console.log(response)
                    },
                    function (err) {
                        console.log(err);
                    });
            });
        }


        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log('Signed in!');
            console.log(authResult);
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
            console.log(authResult);
        });
    }
})();