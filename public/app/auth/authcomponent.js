(function() {
'use strict';

    var loginModal = {
        templateUrl: `app/auth/loginmodal.html`
    };
        
    angular
        .module('venuse')
        .component('loginModal', loginModal);

})();


(function() {
'use strict';

     var signupModal = {
        templateUrl: `app/auth/signupmodal.html`
    };
        
    angular
        .module('venuse')
        .component('signupModal', signupModal);

})();