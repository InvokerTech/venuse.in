(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('BookService', BookService);

    BookService.inject = ['$http', '$q', 'AuthService'];
    function BookService($http, $q, AuthService) {
        var api_type = 'book/venue'
        var service = {
            send: send
        };

        return service;

        function send(o) {
            
            var user = AuthService.getUser();
            var url = API_URL + api_type;
            var params = {
                venue_id: o.venueId,
                start_time: o.startDate,
                end_time: o.endDate,
                user_id: user._id,
                event_type: o.eventType

            }
            return $http.post(url, params).
                then(function (response) {
                    if (response.data) {
                        //  console.log(response);         
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