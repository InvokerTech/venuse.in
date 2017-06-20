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

            };
            var list = Object.keys(o);
            var index = 0;
            _.forOwn(o, function (value) {
                if (value !== '' && value.length !== 0) {
                    var temp = list[index];
                    params[temp] = value;
                }
                index++;
            });
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