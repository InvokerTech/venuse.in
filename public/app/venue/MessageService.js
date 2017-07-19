(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('MessageService', MessageService);

    MessageService.inject = ['$http', '$q', 'AuthService'];
    function MessageService($http, $q, AuthService) {
        var api_type = 'send/message/host'
        var service = {
            send: send
        };

        return service;

        function send(o) {

            var user = AuthService.getUser();
            var url = API_URL + api_type;
            var params = {
                customer_id: user._id,
                host_id: o.hostId,
                event_type: o.eventType,
                guests: o.guests,
                flexible_dates: o.isFlexible,
                 business_event:o.isBusiness,
                message: o.msg,
                budget: o.budget,
                venue_id: o.venueId,
                start_date: o.startDate,
                end_date: o.endDate,
                customer_name: user.name,
                customer_pic: user.photo
            }
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status) {
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