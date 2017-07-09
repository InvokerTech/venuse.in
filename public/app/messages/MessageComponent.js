(function() {
'use strict';

    var messages = {
        templateUrl: `app/messages/book_messages.html`
    };
        
    angular
        .module('venuse')
        .component('messages', messages);

})();