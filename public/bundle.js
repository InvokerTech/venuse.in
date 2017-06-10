
var API_URL = "https://venuse-backend.herokuapp.com/";     // eslint-disable-line
(function () {
    'use strict';
    angular.module('venuse', 
        ['ui.router','directive.g+signin','ngFacebook']);

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
/*(function() {
'use strict';

    var loginModal = {
        templateUrl: `app/auth/loginmodal.html`
    };
        
    angular
        .module('venuse')
        .component('loginModal', loginModal);

})();


(function() {
'use strict';

     var signupModal = {
        templateUrl: `app/auth/signupmodal.html`
    };
        
    angular
        .module('venuse')
        .component('signupModal', signupModal);

})();

*/

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


(function () {
  'use strict';

  angular
    .module('venuse')
    .factory('AuthService', AuthService);

  AuthService.inject = ['$http', '$q'];
  function AuthService($http, $q) {
    var api_type = 'user/login';
    var loginstatus = false;
    var user;
    var service = {
      googleLogin: googleLogin,
      fbLogin: fbLogin,
      login: login,
      setLogin: setLogin,
      isLogin: isLogin,
      getUser: getUser,
      logOut: logOut
    };

    return service;

    ////////////////
    function logOut() {
      loginstatus = false;
      user = {};
    }
    function isLogin() {
      return loginstatus;
    }
    function setLogin(u) {
      user = u;
    }
    function getUser() {
      return user;
    }
    function googleLogin(u) {
      var url = API_URL + api_type + '/google';
      var params = {
        "name": u.w3.ig,
        "email": u.w3.U3,
        "photo": u.w3.Paa,
        "google_id": u.w3.Eea
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data) {
            loginstatus = true;
            setLogin(response.data);
            //    console.log(response.data); 



          } else
            return $q.reject(response);
        })
        .catch(function (err) {
          console.log(err);
        });

    }

    function fbLogin(u) {
      var url = API_URL + api_type + '/fb';
      var params = {
        "name": u.name,
        "email": u.email,
        "photo": u.picture.data.url,
        "fb_id": u.id
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 



          } else
            return $q.reject(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function login() {

    }
  }
})();

    angular.module('venuse')
        .config(function ($facebookProvider) {
            $facebookProvider.setAppId('1675125199182213');
        })
        .run(function ($rootScope) {
            // Load the facebook SDK asynchronously
            (function () {
                // If we've already installed the SDK, we're done
                if (document.getElementById('facebook-jssdk')) { return; }

                // Get the first script element, which we'll use to find the parent node
                var firstScriptElement = document.getElementsByTagName('script')[0];

                // Create a new script element and set its id
                var facebookJS = document.createElement('script');
                facebookJS.id = 'facebook-jssdk';

                // Set the new script's source to the source of the Facebook JS SDK
                facebookJS.src = '//connect.facebook.net/en_US/all.js';

                // Insert the Facebook JS SDK into the DOM
                firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
            }());
        });
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
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['AuthService', '$scope', '$facebook'];
    function HeaderController(AuthService, $scope, $facebook) {
        var vm = this;

        vm.$onInit = function () {
            vm.fbLogin = fbLogin;
            vm.logOut = logOut;
            vm.userstatus = false;
            vm.user = {};
            vm.login = login;
            vm.showLogin = showLogin;
            vm.showRegister = showRegister;

        }
        //end controller init

        function login() {
            vm.userstatus = true;
            vm.user = AuthService.getUser();
            $('#login-modal').modal('hide');
        }
        function logOut() {
            AuthService.logOut();
            vm.userstatus = false;
            vm.user = {};
        }

        function fbLogin() {
            $facebook.login().then(function () {
                $facebook.api("/me?fields=id,name,email,picture").then(
                    function (response) {
                        console.log(response)
                        AuthService.fbLogin(response)
                            .then(function () {
                                $('#signup-modal').modal('hide');
                                vm.login();
                            })
                            .catch();
                    },
                    function (err) {
                        console.log(err);
                    })
                    .catch();
            });
        }


        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log('Signed in!');
            console.log(authResult);
            AuthService.googleLogin(authResult)
                .then(function () {
                    $('#signup-modal').modal('hide');
                    vm.login();

                })
                .catch();
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
            console.log(authResult);
        });

        function showLogin() {
            $('#signup-modal').modal('hide');
            $('#login-modal').modal();
        }
        function showRegister() {
            $('#login-modal').modal('hide');
             $('#signup-modal').modal();
        }
    }
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
(function() {
'use strict';

    var venusepopular = {
        controller: PopularController,              
        controllerAs: 'vm',
        templateUrl: `app/popular/popular.html`,
      
    };
        
    angular
        .module('venuse')
        .component('venusepopular', venusepopular);

        angular
        .module('venuse')
        .controller('PopularController', PopularController);

    PopularController.inject = ['$http', '$q', 'PopularService'];
    function PopularController($http, $q, PopularService) {
        var vm = this;


        vm.$onInit = function () {
vm.venues=[];
            ////////////////
            PopularService.get()
                .then(function (res) {
                  
                    vm.venues=res.venues;
                    //  console.log(vm.venues);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

})();




(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('PopularService', PopularService);

    PopularService.inject = ['$http', '$q'];
    function PopularService($http, $q) {
        var service = {
            get: get
        };

        return service;

        function get() {

            var url = API_URL + 'popular/venues';

            return $http.get(url).
                then(function (response) {
                    //console.log(response);
                    if (response.data) {
                        //    console.log(response.data.ret);         
                        return response.data;
                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
})();
(function() {
'use strict';

    var venuseCommunity = {
        templateUrl: `app/home/community/view.html`
    };
        
    angular
        .module('venuse')
        .component('venuseCommunity', venuseCommunity);

})();
(function() {
'use strict';

    var venuseHost = {
        templateUrl: `app/home/host/view.html`,
    };
        
    angular
        .module('venuse')
        .component('venuseHost', venuseHost);

})();