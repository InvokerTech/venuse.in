(function () {
    'use strict';

    var messages = {
        controller: 'MessageController',
        controllerAs: 'vm',
        templateUrl: `app/messages/book_messages.html`
    };

    angular
        .module('venuse')
        .component('messages', messages);

    (function () {
        'use strict';

        angular
            .module('venuse')
            .controller('MessageController', MessageController);

        MessageController.inject = ['MessageService', 'AuthService'];
        function MessageController(MessageService, AuthService) {
            var vm = this;


            vm.$onInit = function () {

                vm.loading = false;
                vm.user = AuthService.getUser();
                vm.messages = [];


                vm.loading = true;
                MessageService.get(vm.user._id)
                    .then(function (res) {
                        vm.messages = res.message;
                        vm.loading = false;
                    })
                    .catch(function (err) {
                        console.log(err);
                        alert('No messages Found.');
                        vm.loading = false;
                    });



            }
        }
    })();

})();