
var API_URL = "https://venuse-backend.herokuapp.com/";     // eslint-disable-line
(function () {
    'use strict';
    angular.module('venuse',
        ['ui.router', 'directive.g+signin', 'ngFacebook', 'ngMap', 'rzModule',
            'ui.bootstrap.datetimepicker']);

    angular
        .module('venuse')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
         //   $locationProvider.hashPrefix('');
            // use the HTML5 History API
            $locationProvider.html5Mode(true);
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
                    resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'account'
                })
                .state('profile', {
                    url: '/profile',
                    resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'profile'
                })
                .state('messages', {
                    url: '/messages',
                    resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'messages'
                })
                .state('bookings', {
                    url: '/bookings',
                    resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'bookings'
                })
                .state('list-space', {
                    url: '/list-space',
                    component: 'listSpace'
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



(function () {
    'use strict';

    angular
        .module('venuse')
        .directive('loadingwait', loadingwait);

    loadingwait.inject = ['$transitions'];
    function loadingwait($transitions) {

        var directive = {
            link: link,
            restrict: 'AE',
            scope: {
            }
        };
        return directive;

        function link() {
            var h = angular.element(document).find('app-header');
            var f = angular.element(document).find('app-footer');
            var v = angular.element(document).find('.indicator');
            var l = angular.element(document).find('.ui-loader');
            $transitions.onStart({}, function () {
                h.addClass('ng-hide');
                f.addClass('ng-hide');
                v.addClass('ng-hide');
                l.removeClass('ng-hide');
            });
            $transitions.onSuccess({}, function () {
                h.removeClass('ng-hide');
                f.removeClass('ng-hide');
                v.removeClass('ng-hide');
                l.addClass('ng-hide');

            });

        }
    }
})();