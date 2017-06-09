(function () {
    'use strict';
    angular
        .module('venuse')
        .directive('appHeader', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/header/header.view.html'
            };
        });

})();

