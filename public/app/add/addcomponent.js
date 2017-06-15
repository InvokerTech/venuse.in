(function () {
    'use strict';

    var addSpace = {
        controller: AddController,
        controllerAs: 'vm',
        templateUrl: `app/add/list_space.html`,
        bindings: {
            authError: '='
        }
    };

    angular
        .module('venuse')
        .component('addSpace', addSpace);

    angular
        .module('venuse')
        .controller('AddController', AddController);

    AddController.inject = ['$state'];
    function AddController($state) {
        var vm = this;
        
     //   redirect();
        vm.$onInit = function () {


        }

        function redirect() {
            if (!vm.authError) {
                alert('error');
                $state.go('list-space');
            }
        }
    }


})();