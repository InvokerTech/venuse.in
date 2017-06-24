(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('VenueDetailService', VenueDetailService);

    VenueDetailService.inject = ['$http', '$q'];
    function VenueDetailService($http, $q) {
        var api_type = 'venue/details?venue_id='
        var service = {
            get: get
        };

        return service;

        function get(id) {

            var url = API_URL + api_type +id;
    
            return $http.get(url).
                then(function (response) {
                    if (response.data) {

                       //  console.log(response);         
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