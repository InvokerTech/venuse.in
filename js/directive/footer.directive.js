/**
 * Created by Mangal on 25/05/2017
 */
(function () {
    'use strict';

    angular
        .module('app')
        .directive('appFooter',AppFooterDirective);

    function AppFooterDirective($rootScope) {
        return{
            restrict: 'E',
            templateUrl: 'templates/footer.view.html'
        };
    }
})();
