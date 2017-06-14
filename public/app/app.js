
var API_URL = "https://venuse-backend.herokuapp.com/";     // eslint-disable-line
(function () {
    'use strict';
    angular.module('venuse', 
        ['ui.router','directive.g+signin','ngFacebook','ngMap','rzModule']);

    angular
        .module('venuse')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    component: 'home'
                })
                 .state('venues', {
                    url: '/venues',
                    component: 'venues'
                })
                .state('security_deposits', {
                    url: '/security_deposits',
                    templateUrl: 'app/templates/securitydeposits.html'
                })
                .state('team', {
                    url: '/team',
                    templateUrl: 'app/templates/team.html'
                })
                .state('list-space', {
                    url: '/list-space',
                    templateUrl: 'app/add/list_your_spaces.html'
                })
                 .state('add', {
                    url: '/add',
                    templateUrl: 'app/add/list_space.html'
                })
                .state('cancellation_policy', {
                    url: '/cancellation_policy',
                    templateUrl: 'app/templates/cancellation_policy.html'
                })

        });
})();