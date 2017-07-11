(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('RegisterService', RegisterService);

    RegisterService.inject = ['$http', '$q'];
    function RegisterService($http, $q) {
        var service = {
            send: send
        };

        return service;

        ////////////////
        function send(o) {
            var api_type = 'venue'
            var url = API_URL + api_type;    
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            var params = {
                name: o.title,
                address: o.address,
                location: o.location,
                city: o.city,
                owner_name: o.user.name,
                user_id: o.user._id,
                owner_number: o.contactNumber,
                description: o.description,
                photos: o.photos,
                listing_title: o.title,
                max_guests: o.guestsMax,
                standing: o.guestsStanding,
                sitting: o.guestsSeated,
                event_type: o.eventTypes,
                style: o.styleTypes,
                // activity:[],
                no_of_rooms: o.rooms,
                no_of_restrooms: o.restRooms,
                no_of_floors: o.floors,
                area: o.area,
                amenitites: o.amenities,
                rules: o.rules,
                available: o.available,
                unavailable: o.unAvailable,
                min_hours: o.minHours,
                hourly_rate: o.hourlyRate,
                full_day_rate: o.dayRate,
                extra_desc: o.extraDesc,
                cancellation_policy: o.cancelationPolicy,
                hold_before_cancel: o.holdBeforeCancel,
                owner_email: o.user.email,
                space_type: o.typeOfSpace,
                kind: o.kindOfSpace,
                feature: o.features,
                extra_number: o.contactNumberExtra,
                deposit: o.deposit,
                accessibility: o.access
            };
            return $http.post(url, params,config).
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