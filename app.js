/**
 * Created by Mangal on 25/05/2017
 */

var app = angular.module('app' , ['ngRoute']);
        
  app.config(function($routeProvider) {
            $routeProvider
            .when('/',{
                templateUrl: 'templates/home.html'
            })
            .when('/home',{
                templateUrl: 'templates/home.html'
            })
            .when('/about',{
                templateUrl: 'templates/about.html'
            })
            .when('/security_deposits',{
                templateUrl: 'templates/securitydeposits.html'
            })
            .when('/team',{
                templateUrl: 'templates/team.html'
            })
            .when('/list_Your_Spaces',{
                templateUrl: 'templates/list_your_spaces.html'
            })
            .when('/cancellation_policy',{
                templateUrl: 'templates/cancellation_policy.html'
            })
            
            .otherwise({ redirectTo: '/'});
  });
            
            
 app.directive('appHeader', function() {
              return {
                    restrict: 'E',
                    templateUrl: 'templates/header.view.html'
              };
        });
 app.directive('appFooter', function() {
              return {
                    restrict: 'E',
                    templateUrl: 'templates/footer.view.html'
              };
        });
