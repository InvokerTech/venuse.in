(function() {
    'use strict';

    angular
        .module('venuse')
        .directive('counter', [function(){
  return {
    restrict: 'A',
    scope: {
      counter: '='
    },
    require: '?ngModel',
    link: function(scope, el, attr, model) {
      if (!model) { return; }
      model.$viewChangeListeners.push(function(){
        var count = model.$viewValue.split(/\b/g).filter(function(i){
          return !/^\s+$/.test(i);
        }).length;
        
        scope.counter = count;
      });
    }
  };
}]);
})();