(function () {
    'use strict';

    var listSpace = {
        controller: ListController,
        controllerAs: 'vm',
        templateUrl: 'app/add/list_your_spaces.html',
    };

    angular
        .module('venuse')
        .component('listSpace', listSpace);


    angular
        .module('venuse')
        .controller('ListController', ListController);

    ListController.inject = ['AuthService', '$state'];
    function ListController(AuthService, $state) {
        var vm = this;


        vm.$onInit = function () {
            vm.goToAdd = goToAdd;
        }
        function goToAdd() {
            if (AuthService.isLogin()) {
                $state.go('add');
            }
            else {
                alert('Please login to list Space.');
                 $('#login-modal').modal();
            }
        }
    }


})();