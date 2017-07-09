
var API_URL = "https://venuse-backend.herokuapp.com/";     // eslint-disable-line
(function () {
    'use strict';
    angular.module('venuse',
        ['ui.router', 'directive.g+signin', 'ngFacebook', 'ngMap', 'rzModule', 'ui.bootstrap.datetimepicker']);

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
                    url: '/venues?city&event',
                    component: 'venues'
                })
                .state('venue', {
                    url: '/venue?id',
                    component: 'venue'
                })
                .state('account', {
                    url: '/account',
                    component: 'account'
                })
                .state('list-space', {
                    url: '/list-space',
                    component:'listSpace'
                })
                .state('add', {
                    url: '/add',
                    resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login to add space.');
                                return $state.go('list-space');

                            }
                            else { return true; }
                        }
                    },
                    component: 'addSpace'
                })
                  .state('security_deposits', {
                    url: '/security_deposits',
                    templateUrl: 'app/templates/securitydeposits.html'
                })
                .state('team', {
                    url: '/team',
                    templateUrl: 'app/templates/team.html'
                })
                .state('cancellation_policy', {
                    url: '/cancellation_policy',
                    templateUrl: 'app/templates/cancellation_policy.html'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'app/templates/about.html'
                })
                .state('privacy', {
                    url: '/privacy',
                    templateUrl: 'app/templates/privacy.html'
                })
                .state('press', {
                    url: '/press',
                    templateUrl: 'app/templates/press.html'
                })

        });
})();

angular.element(document).ready(function () {
    $('.loader').remove();
});

angular
    .module('venuse')
    .run(['$rootScope','$transitions', function ($rootScope,$transitions) {

        $rootScope.stateIsLoading = false;
       $transitions.onStart({}, function () {
            $rootScope.stateIsLoading = true;
        });
        $transitions.onSuccess({}, function () {
            $rootScope.stateIsLoading = false;
        });
        $rootScope.$on('$stateChangeError', function () {
            //catch error
        });

    }]);