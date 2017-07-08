(function () {
    'use strict';

    var home = {
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: `app/home/home.html`
    };

    angular
        .module('venuse')
        .component('home', home);


    angular
        .module('venuse')
        .controller('HomeController', HomeController);

    HomeController.inject = ['$state'];
    function HomeController($state) {
        var vm = this;


        vm.$onInit = function () {
            vm.city = '';
            vm.event='';


            vm.setCity = setCity;
            vm.setEvent=setEvent;
            vm.submit=submit;
        }

        function setCity(c) {
           vm.city=c;
        }

        function setEvent(v){
            vm.event=v;
        }

        function submit(){
            if(vm.city || vm.event){
$state.go('venues',{city:vm.city,event:vm.event});
            }
            else alert('Select atleast one param to search venues.');
        }
        
    }


})();