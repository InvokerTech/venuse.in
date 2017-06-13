
var API_URL = "https://venuse-backend.herokuapp.com/";     // eslint-disable-line
(function () {
    'use strict';
    angular.module('venuse', 
        ['ui.router','directive.g+signin','ngFacebook','ngMap']);

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
                .state('list_space', {
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
      logOut: logOut,
      register: register
    };

    return service;

    ////////////////
    function register(n, e, p) {
      var url = API_URL + 'register/user';
      var params = {
        "name": n,
        "email": e,
        "pass": p
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data.status===true) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 
          } else
            return $q.reject(response);
        })
        .catch();

    }

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

    function login(e, p) {
      var url = API_URL + api_type;
      var params = {
        "email": e,
        "password": p
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


    var appHeader = {
        controller: HeaderController,
        controllerAs: 'vm',
        templateUrl: `app/header/header.html`,
    };
        
    angular
        .module('venuse')
        .component('appHeader', appHeader);


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
            vm.checkLogin = checkLogin;
            vm.formError = false;
            vm.regFormError = false;
            vm.checkReg = checkReg;
        }
        //end controller init
        function checkReg() {
            if (vm.regEmail && vm.regPass && vm.regName) {
                vm.regFormError = false;
                vm.regLoad = true;
                AuthService.register(vm.regName, vm.regEmail, vm.regPass)
                    .then(function () {
                        vm.regLoad = false;
                        vm.login();
                        $('#signup-modal').modal('hide');
                    })
                    .catch(function (err) {
                        vm.regLoad = false;
                        //  console.log(err);
                        alert(err.data.message);
                    });
            }
            else vm.regFormError = true;
        }

        function checkLogin() {
            if (vm.email && vm.pass) {
                vm.formError = false;
                vm.loginLoad = true;
                AuthService.login(vm.email, vm.pass)
                    .then(function () {
                        vm.loginLoad = false;
                        vm.login();

                    })
                    .catch();
            }
            else vm.formError = true;
        }
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

    var home = {
        templateUrl: `app/home/home.html`
    };
        
    angular
        .module('venuse')
        .component('home', home);

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
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('VenueService', VenueService);

    VenueService.inject = ['$http', '$q'];
    function VenueService($http, $q) {
        var api_type = 'search/venues'
        var service = {
            get: get
        };

        return service;

        function get() {

            var url = API_URL + api_type;

            return $http.post(url).
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
(function () {
    'use strict';

    var venues = {
        controller: VenuesController,
        controllerAs: 'vm',
        templateUrl: `app/venues/venues.html`,
    };

    angular
        .module('venuse')
        .component('venues', venues);


    angular
        .module('venuse')
        .controller('VenuesController', VenuesController);

    VenuesController.inject = ['VenueService'];
    function VenuesController(VenueService) {
        var vm = this;
        vm.$onInit = function () {
            getVenues();
            vm.sortBy = sortBy;
            vm.sortfilters = [{ value: 'popular', name: "By Popularity" },
            { value: 'hourly_rate', name: "By Price" }];
            vm.sortFilter = vm.sortfilters[0];
        }

        function sortBy(s) {
            vm.venues = _.sortBy(vm.venues, s.value);
           // console.log(vm.venues);
        }

        function getVenues() {
            VenueService.get()
                .then(function (res) {
                    vm.venues = res.venues
                })
                .catch();
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