

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
          if (response.data.status === true) {
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
            setLogin(response.data.user);
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
          if (response.data.status === true) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 
          } else
            return $q.reject(response);
        });
    }
  }
})();