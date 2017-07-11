(function () {
    'use strict';

    var account = {
        controller: 'AccountController',
        controllerAs: 'vm',
        templateUrl: `app/account/account_details.html`,
    };

    angular
        .module('venuse')
        .component('account', account);


    angular
        .module('venuse')
        .controller('AccountController', AccountController);

    AccountController.inject = ['ProfileService', 'AuthService', '$state','AccountService'];
    function AccountController(ProfileService, AuthService, $state,AccountService) {
        var vm = this;


        vm.$onInit = function () {
            vm.loading = false;
            vm.account = {};
            vm.account.sms = false;
            vm.account.email = false;
            vm.account.oldPass = '';
            vm.account.newPass = '';
            vm.user = AuthService.getUser();
            vm.account.id = vm.user._id;



            vm.updateSetting = updateSetting;
            vm.updatePass=updatePass;

        }


        function updateSetting() {
        
            vm.loading = true;
            ProfileService.setting(vm.account)
                .then(function (res) {
                    console.log(res);
                    alert('Setting Updated.');
                    vm.loading = false;
                    $state.reload();
                })
                .catch(function (err) {
                    console.log(err);
                    alert('Setting could not be updated.');
                    vm.loading = false;
                });
        }

        function updatePass(){

             vm.loading = true;
            AccountService.update(vm.account)
                .then(function (res) {
                    console.log(res);
                    alert('Password Updated.');
                    vm.loading = false;
                    $state.reload();
                })
                .catch(function (err) {
                    console.log(err);
                    alert(err.data.message);
                    vm.loading = false;
                });

        }
    }

})();