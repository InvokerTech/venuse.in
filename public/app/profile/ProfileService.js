(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('ProfileService', ProfileService);

    ProfileService.inject = ['$http', '$q'];
    function ProfileService($http, $q) {
         var api_type = 'user/update';
        var service = {
            update: update,
            setting:setting
        };

        return service;


        function update(o) {
           
            var url = API_URL + api_type;
            var params = {
                id:o.id,
                name:o.name,
                number:o.number,
                email:o.email,
                photo:o.photo,
                about_me:o.aboutMe,
                organisation_name:o.companyName,
                organisation_number:o.companyPhone,
                job_title:o.jobTitle,


            };
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status===true) {      
                        return response;
                    } else
                        return $q.reject(response);
                });
        }

        function setting(o){
            var url = API_URL + api_type;
            var params = {
                id:o.id,
                recieve_marketing_mail:o.email,
                recieve_sms:o.sms,
            };
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status===true) {      
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