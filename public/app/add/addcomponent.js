(function() {
'use strict';

    var addSpace = {
        controller: AddController,
        controllerAs: 'vm',
        templateUrl: `app/add/list_space.html`
    };
        
    angular
        .module('venuse')
        .component('addSpace', addSpace);
        
            angular
                .module('venuse')
                .controller('AddController', AddController);
        
            AddController.inject = [''];
            function AddController() {
                var vm = this;
                
        
                 vm.$onInit = function() {
        
                ////////////////
        
                }
            }
       

})();