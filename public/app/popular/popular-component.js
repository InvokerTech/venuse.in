(function() {
'use strict';

    var venusepopular = {
        controller: PopularController,              
        controllerAs: 'vm',
        templateUrl: `app/popular/popular.html`,
      
    };
        
    angular
        .module('venuse')
        .component('venusepopular', venusepopular);

        angular
        .module('venuse')
        .controller('PopularController', PopularController);

    PopularController.inject = ['$http', '$q', 'PopularService'];
    function PopularController($http, $q, PopularService) {
        var vm = this;


        vm.$onInit = function () {
vm.venues=[];
            ////////////////
            PopularService.get()
                .then(function (res) {
                  
                    vm.venues=res.venues;
                    //  console.log(vm.venues);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

})();


