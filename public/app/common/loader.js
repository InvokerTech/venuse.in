(function () {
    'use strict';

    angular
        .module('venuse')
        .directive('loader', loader);

    loader.inject = [''];
    function loader() {
        var directive = {
            restrict: 'AE',
            templateUrl: 'app/common/loader.html'
        };
        return directive;
    }

})();

