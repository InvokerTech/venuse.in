(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('VenueService', VenueService);

    VenueService.inject = ['$http', '$q'];
    function VenueService($http, $q) {
        var api_type = 'venue/user/book'
        var service = {
            get: get
        };

        return service;

        function get() {

            var url = API_URL + api_type;

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