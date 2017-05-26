/**
 * Created by Mangal on 25/05/2017
 */
(function () {
    'use strict';

angular
    .module('app')
    .directive('323',AppHeaderDirective);

    function AppHeaderDirective($rootScope) {
        return{
            restrict: 'E',
            templateUrl: 'templates/header.view.html'
        };
    }
})();


        