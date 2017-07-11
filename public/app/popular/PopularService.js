
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
                   return $q.reject(err);
                });
        }
    }
})();