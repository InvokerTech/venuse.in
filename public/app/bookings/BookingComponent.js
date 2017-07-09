(function() {
'use strict';

    var bookings = {
        templateUrl: `app/bookings/booking_details.html`
    };
        
    angular
        .module('venuse')
        .component('bookings', bookings);

})();