(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('VenueService', VenueService);

    VenueService.inject = ['$http', '$q'];
    function VenueService($http, $q) {
        var api_type = 'venue/user/book'
        var service = {
            get: get,
            search: search
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

        function search(o) {

            var url = API_URL + 'search/venues';
            var params = {
                city: o.city,
                query:o.query,
                latitude:o.lat,
                longitude:o.lng,
                amenities:o.amenities,
                rules:o.rules,
                features:o.features,
                styles:o.styles,
                type:o.event,
                guests:o.guests,
                size:o.size,
                hourly:o.hourRate,
                daily:o.dayRate
            };
            return $http.post(url, params).
                then(function (response) {

                    console.log(response);
                    if (!response.error) {

                        //    console.log(response.data.ret);         
                        return response.data.venues;

                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                    console.log(err);
                });

        }

    }
})();