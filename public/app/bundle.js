
(function () {
    'use strict';
    angular.module('venuse', ['ui.router']);

    angular
        .module('venuse')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/home/home.html'
                })
                .state('security_deposits', {
                    url: '/security_deposits',
                    templateUrl: 'app/templates/securitydeposits.html'
                })
                .state('team', {
                    url: '/team',
                    templateUrl: 'app/templates/team.html'
                })
                .state('list_Your_Spaces', {
                    url: '/list_Your_Spaces',
                    templateUrl: 'app/templates/list_your_spaces.html'
                })
                .state('cancellation_policy', {
                    url: '/cancellation_policy',
                    templateUrl: 'app/templates/cancellation_policy.html'
                })

        });
})();
(function () {
    'use strict';
    angular
        .module('venuse')
        .directive('appFooter', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/footer/footer.view.html'
            };
        });

})();

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


(function() {
'use strict';

    angular
        .module('venuse')
        .controller('HomeController', HomeController);

   HomeController.inject = [''];
    function HomeController() {
     //   var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();