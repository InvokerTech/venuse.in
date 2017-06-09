

(function () {
  'use strict';

  angular
    .module('venuse')
    .factory('AuthService', AuthService);

  AuthService.inject = ['$http', '$q'];
  function AuthService($http, $q) {
    var api_type = 'user/login';
    var service = {
      googleLogin: googleLogin,
      login: login
    };

    return service;

    ////////////////
    function googleLogin(u) {
      var url = API_URL + api_type + '/google';
      var params = {
        "": u
      };
      return $http.post(url, params).
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

    function login() {

    }
  }
})();