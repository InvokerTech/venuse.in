(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('BookingsService', BookingsService);

    BookingsService.inject = ['$http', '$q'];
    function BookingsService($http, $q) {
         var api_type = 'bookings/user?user_id=';
        var service = {
            get: get,
            
        };

        return service;


        function get(id){
            var url = API_URL + api_type + id;
          
            return $http.get(url).
                then(function (response) {
                    if (response.data.bookings.length !== 0) {      
                        return response;
                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();