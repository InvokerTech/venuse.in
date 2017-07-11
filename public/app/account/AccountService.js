(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('AccountService', AccountService);

    AccountService.inject = ['$http', '$q'];
    function AccountService($http, $q) {
         var api_type = 'update/password';
        var service = {
            update: update,
            
        };

        return service;


        function update(o){
            var url = API_URL + api_type;
            var params = {
                user_id:o.id,
                new_pass:o.newPass,
                old_pass:o.oldPass,
            };
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status===true) {      
                        return response;
                    } else
                        return $q.reject(response);
                });
        }
    }
})();