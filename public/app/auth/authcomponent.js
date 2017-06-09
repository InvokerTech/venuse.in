(function() {
    'use strict';

    angular
        .module('venuse')
        .directive('loginModal', loginModal);

    loginModal.inject = [];
    function loginModal() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
         restrict: 'E',
                templateUrl: 'app/auth/loginmodal.html'
        };
        return directive;
    }
})();

(function() {
    'use strict';

    angular
        .module('venuse')
        .directive('signupModal', signupModal);

    signupModal.inject = [];
    function signupModal() {
        var directive = {
         restrict: 'E',
                templateUrl: 'app/auth/signupmodal.html'
        };
        return directive;
    }
})();