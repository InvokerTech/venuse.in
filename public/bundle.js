
var API_URL = "https://venuse-backend.herokuapp.com/";     // eslint-disable-line
(function () {
    'use strict';
    angular.module('venuse',
        ['ui.router', 'directive.g+signin', 'ngFacebook', 'ngMap', 'rzModule', 'ui.bootstrap.datetimepicker']);

    angular
        .module('venuse')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    component: 'home'
                })
                .state('venues', {
                    url: '/venues?city&event',
                    component: 'venues'
                })
                .state('venue', {
                    url: '/venue?id',
                    component: 'venue'
                })
                .state('account', {
                    url: '/account',
                        resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'account'
                })
                 .state('profile', {
                    url: '/profile',
                           resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'profile'
                })
                   .state('messages', {
                    url: '/messages',
                           resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'messages'
                })
                   .state('bookings', {
                    url: '/bookings',
                           resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login.');
                                return $state.go('home');

                            }
                            else { return true; }
                        }
                    },
                    component: 'bookings'
                })
                .state('list-space', {
                    url: '/list-space',
                    component:'listSpace'
                })
                .state('add', {
                    url: '/add',
                    resolve: {
                        authError: function (AuthService, $state) {
                            if (!AuthService.isLogin()) {

                                alert('Please login to add space.');
                                return $state.go('list-space');

                            }
                            else { return true; }
                        }
                    },
                    component: 'addSpace'
                })
                  .state('security_deposits', {
                    url: '/security_deposits',
                    templateUrl: 'app/templates/securitydeposits.html'
                })
                .state('team', {
                    url: '/team',
                    templateUrl: 'app/templates/team.html'
                })
                .state('cancellation_policy', {
                    url: '/cancellation_policy',
                    templateUrl: 'app/templates/cancellation_policy.html'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'app/templates/about.html'
                })
                .state('privacy', {
                    url: '/privacy',
                    templateUrl: 'app/templates/privacy.html'
                })
                .state('press', {
                    url: '/press',
                    templateUrl: 'app/templates/press.html'
                })

        });
})();

angular.element(document).ready(function () {
    $('.loader').remove();
});

angular
    .module('venuse')
    .run(['$rootScope','$transitions', function ($rootScope,$transitions) {

        $rootScope.stateIsLoading = false;
       $transitions.onStart({}, function () {
            $rootScope.stateIsLoading = true;
        });
        $transitions.onSuccess({}, function () {
            $rootScope.stateIsLoading = false;
        });
        $rootScope.$on('$stateChangeError', function () {
            //catch error
        });

    }]);
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
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('AccountService', AccountService);

    AccountService.inject = ['$http', '$q'];
    function AccountService($http, $q) {
         var api_type = 'update/password';
        var service = {
            update: update,
            
        };

        return service;


        function update(o){
            var url = API_URL + api_type;
            var params = {
                user_id:o.id,
                new_pass:o.newPass,
                old_pass:o.oldPass,
            };
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status===true) {      
                        return response;
                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();
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

    AddController.inject = ['AuthService', 'RegisterService', ' $state'];
    function AddController(AuthService, RegisterService, $state) {
        var vm = this;

        //  redirect();
        vm.$onInit = function () {
            getUser();
            vm.loading=false;
            vm.space = {};
            vm.space.eventTypes = [];
            vm.space.styleTypes = [];
            vm.space.amenities = [];
            vm.space.rules = [];
            vm.space.features = [];
            vm.space.access = [];
            vm.space.typeOfSpace;
            vm.space.address;
            vm.space.addressDetail;
            vm.space.location = [];
            vm.space.city = '';
            vm.space.user = vm.user;
            vm.space.kindOfSpace = 'House';
            vm.space.rooms = 1;
            vm.space.restRooms = 1;
            vm.space.floors = 0;
            vm.space.area = 0;
            vm.space.guestsMax = 2;
            vm.space.guestsStanding = 1;
            vm.space.guestsSeated = 1;
            vm.space.contactNumber;
            vm.space.contactNumberExtra;
            vm.space.description ='';
            vm.space.descCount;
            vm.space.title;
            vm.space.hourlyRate;
            vm.space.minHours = 1;
            vm.space.dayRate;
            vm.space.extraDesc;
            vm.space.cancelationPolicy;
            vm.space.customPolicy='';
            vm.space.holdBeforeCancel = 1;
            vm.space.deposit;
            vm.space.photos = [];
             vm.space.cover='';

            vm.eventTypes = [
                { status: false, value: 'Event' },
                { status: false, value: 'Meeting' },
                { status: false, value: 'Production' },
                { status: false, value: 'Pop-up' }];
            vm.accessTypes = [
                { status: false, value: 'Elevator' },
                { status: false, value: 'Stairs' },
                { status: false, value: 'Street Level' },
                { status: false, value: 'Wheel Chair / Handicapped Accessible ' },
                { status: false, value: 'On-site Parking' },
                { status: false, value: 'Freight Elevator' },
                { status: false, value: 'Delivery Access ' },
                { status: false, value: 'Parking Near By' },
                { status: false, value: 'Other' }];
            vm.amenities = [
                { status: false, value: 'Additional Chairs ' },
                { status: false, value: 'Air Conditioning ' },
                { status: false, value: 'Bare Walls ' },
                { status: false, value: 'Bathrooms' },
                { status: false, value: 'Heat' },
                { status: false, value: 'Kitchen' },
                { status: false, value: 'Large Table' },
                { status: false, value: 'Lighting System' },
                { status: false, value: 'Lounge Furniture' },
                { status: false, value: 'Natural Light' },
                { status: false, value: 'Photography Lighting' },
                { status: false, value: 'Projector' },
                { status: false, value: 'Screen' },
                { status: false, value: 'Sound System' },
                { status: false, value: 'Stage' },
                { status: false, value: 'Tableware' },
                { status: false, value: 'TV' },
                { status: false, value: 'Whiteboard' },
                { status: false, value: 'Wifi' }

            ];
            vm.styleTypes = [
                { status: false, value: 'Classic' },
                { status: false, value: 'Modern' },
                { status: false, value: 'Whimsical' },
                { status: false, value: 'Minimalist' },
                { status: false, value: 'Luxurious' },
                { status: false, value: 'Industrial' },
                { status: false, value: 'Raw' },
                { status: false, value: 'Intimate' }
            ];
            vm.featureTypes = [
                { status: false, value: 'Exposed Brick' },
                { status: false, value: 'Exposed Pipes' },
                { status: false, value: 'High Ceiling' },
                { status: false, value: 'Skylight' },
                { status: false, value: 'Large Windows' },
                { status: false, value: 'Library ' },
                { status: false, value: 'Dining Table' },
                { status: false, value: 'Modern Bathroom' },
                { status: false, value: 'Bathtub' },
                { status: false, value: 'Fireplace' },
                { status: false, value: 'Piano' },
                { status: false, value: 'Bar' },
                { status: false, value: 'Concrete' },
                { status: false, value: 'Wood Floors' },
                { status: false, value: 'Art' },
                { status: false, value: ' Garden ' },
                { status: false, value: 'Plants' },
                { status: false, value: 'Graffiti' },
                { status: false, value: 'Cyc' },
                { status: false, value: 'Sound-Proof' },
                { status: false, value: 'Props' },
                { status: false, value: 'Furnished' },
                { status: false, value: 'Empty' },
                { status: false, value: 'Deck/patio' },
                { status: false, value: 'Roof' },
                { status: false, value: 'Storefront' },
                { status: false, value: 'View' },
                { status: false, value: 'Wood Beams' },
                { status: false, value: 'Columns' },
                { status: false, value: 'Multi-level' },
                { status: false, value: 'White Space' },
                { status: false, value: 'Screening Room' },
                { status: false, value: 'Breakout Rooms' },
                { status: false, value: 'Open Kitchen' },

            ];
            vm.ruleTypes = [
                { status: false, value: 'No Open Flame' },
                { status: false, value: 'No Smoking Outside' },
                { status: false, value: 'No Smoking' },
                { status: false, value: 'No Cooking' },
                { status: false, value: 'No Ticket Sales' },
                { status: false, value: 'No Music' },
                { status: false, value: 'No One Under 21' },
                { status: false, value: 'No Teenagers (10-18)' },
                { status: false, value: 'No Children (0-10)' },
                { status: false, value: 'No Outside Catering/food' },
                { status: false, value: 'No Loud Music / Dancing' },
                { status: false, value: 'No Alcohol (serving) ' },
                { status: false, value: 'No Alcohol (selling)' },
                { status: false, value: ' No Open House' },
                { status: false, value: ' No Late Night Parties' },
            ];
            vm.dayTypes = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            vm.hourTypes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
            vm.minuteTypes = ['10', '20', '30', '40', '50'];
            vm.space.available = {
                from: {
                    day: 'Monday',
                    time: '',
                    h: '08',
                    m: '00'
                },
                to: {
                    day: 'Friday',
                    time: '',
                    h: '23',
                    m: '00'
                }
            };
            vm.space.unAvailable = {
                from: {
                    day: 'Friday',
                    time: '',
                    h: '23',
                    m: '00'
                },
                to: {
                    day: 'Monday',
                    time: '',
                    h: '08',
                    m: '00'
                }
            };






            vm.kindOfSpace = kindOfSpace;
            vm.increase = increase;
            vm.decrease = decrease;
            vm.submit = submit;
            vm.setMap = setMap;
            vm.setAvialableFrom = setAvialableFrom;
            vm.setAvialableFromHour = setAvialableFromHour;
            vm.setAvialableFromMinute = setAvialableFromMinute;
            vm.setAvialableTo = setAvialableTo;
            vm.setAvialableToHour = setAvialableToHour;
            vm.setAvialableToMinute = setAvialableToMinute;
            vm.setUnAvialableFrom = setUnAvialableFrom;
            vm.setUnAvialableFromHour = setUnAvialableFromHour;
            vm.setUnAvialableFromMinute = setUnAvialableFromMinute;
            vm.setUnAvialableTo = setUnAvialableTo;
            vm.setUnAvialableToHour = setUnAvialableToHour;
            vm.setUnAvialableToMinute = setUnAvialableToMinute;
            vm.countOf = countOf;

        }

        /* function redirect() {
 
             if (!AuthService.isLogin()) {
 
                 //    $state.go('list-space');
                 // alert('Please login to add space.');
             }
         }*/
        function kindOfSpace(e) {
            vm.space.kindOfSpace = e;
        }
        function increase(s) {      //eslint-disable-line
            switch (s) {
                case 'vm.space.rooms':
                    vm.space.rooms++;
                    break;
                case 'vm.space.restRooms':
                    vm.space.restRooms++;
                    break;
                case 'vm.space.floors':
                    vm.space.floors++;
                    break;
                case 'vm.space.minHours':
                    vm.space.minHours++;
                    break;
                case 'vm.space.holdBeforeCancel':
                    vm.space.holdBeforeCancel++;
                    break;


            }

        }
        function decrease(s) {      //eslint-disable-line
            switch (s) {
                case 'vm.space.rooms':
                    if (vm.space.rooms !== 0) {
                        vm.space.rooms--;
                    }
                    break;
                case 'vm.space.restRooms':
                    if (vm.space.restRooms !== 0) {
                        vm.space.restRooms--;
                    }
                    break;
                case 'vm.space.floors':
                    if (vm.space.floors !== 0) {
                        vm.space.floors--;
                    }
                    break;
                case 'vm.space.minHours':
                    if (vm.space.minHours !== 0) {
                        vm.space.minHours--;
                    }
                    break;
                case 'vm.space.holdBeforeCancel':
                    if (vm.space.holdBeforeCancel !== 0) {
                        vm.space.holdBeforeCancel--;
                    }
                    break;


            }
        }
        function getUser() {
            vm.user = AuthService.getUser();
        }
        function setMap() {
            var places = new google.maps.places.Autocomplete(document.getElementById('listing_address'));
            google.maps.event.addListener(places, 'place_changed', function () {
                var boundsByCity = places.getPlace();
                // console.log(boundsByCity);
                // console.log(boundsByCity.name);
                //  vm.filter.place = boundsByCity.name;
                vm.space.address = boundsByCity.formatted_address;
                _.forEach(boundsByCity, function (obj) {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].types[0] == "locality") {
                            //   alert(obj.address_components[i].short_name+" "+obj.address_components[i].long_name);
                            vm.space.city = obj[i].long_name;
                            // alert(city+ " from function");
                            return false;
                        }
                    }
                });
                var lat = boundsByCity.geometry.location.lat();
                var lng = boundsByCity.geometry.location.lng();
                if (lat !== null && lng !== null) {
                    vm.space.location.push(lat);
                    vm.space.location.push(lng);
                }
            });

        }

        function submit() {
            vm.loading=true;
            //set Available timings
            vm.space.available.from.time = vm.space.available.from.h + ':' + vm.space.available.from.m;
            vm.space.available.to.time = vm.space.available.to.h + ':' + vm.space.available.to.m;
            vm.space.unAvailable.from.time = vm.space.unAvailable.from.h + ':' + vm.space.unAvailable.from.m;
            vm.space.unAvailable.to.time = vm.space.unAvailable.to.h + ':' + vm.space.unAvailable.to.m;

            //combine google address and manual address
            vm.space.addressDetail = vm.space.addressDetail + ',';
            vm.space.address = vm.space.addressDetail.concat(vm.space.address);

            _.forEach(vm.eventTypes, function (a) {
                if (a.status === true) {
                    vm.space.eventTypes.push(a.value);
                }
            });
            _.forEach(vm.styleTypes, function (a) {
                if (a.status === true) {
                    vm.space.styleTypes.push(a.value);
                }
            });
            _.forEach(vm.amenities, function (a) {
                if (a.status === true) {
                    vm.space.amenities.push(a.value);
                }
            });
            _.forEach(vm.ruleTypes, function (a) {
                if (a.status === true) {
                    vm.space.rules.push(a.value);
                }
            });
            _.forEach(vm.featureTypes, function (a) {
                if (a.status === true) {
                    vm.space.features.push(a.value);
                }
            });
            _.forEach(vm.accessTypes, function (a) {
                if (a.status === true) {
                    vm.space.access.push(a.value);
                }
            });

            var file = document.getElementById("imagefile");
            for (var i = 0, count = file.files.length; i < count; ++i) {
                var form = new FormData();
                form.append('file', file.files[i]);

                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://venuse-backend.herokuapp.com/image",
                    "method": "POST",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    //  console.log(response);
                    var json = JSON.parse(response);
                    vm.space.photos.push(json.url);

                });
                $.ajax(settings).fail(function (response) {
                    console.log(response);
                    alert("Could not upload image");
                });
            }
            var cover = document.getElementById("coverfile");
           
                var form = new FormData();
                form.append('file', cover);

                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://venuse-backend.herokuapp.com/image",
                    "method": "POST",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    //  console.log(response);
                    var json = JSON.parse(response);
                    vm.space.cover=json.url;

                });
                $.ajax(settings).fail(function (response) {
                    console.log(response);
                    alert("Could not upload cover image");
                });
            



            RegisterService.send(vm.space)
                .then(function (res) {
                    //  console.log(res);
                    if (res) {
                        vm.loading=false;
                        alert('Venue added successfully.');
                        $state.go('venues');
                    }
                    else {
                         vm.loading=false;
                        alert('Venue not added.Correct all details.');
                        $state.reload();
                    }
                })
                .catch(function (err) {
                     vm.loading=false;
                    console.log(err);
                    alert('Venue not added.Correct all details.');
                    $state.reload();
                });


        }

        function setAvialableFrom(s) {
            vm.space.available.from.day = s;
            // console.log(vm.space.available);
        }
        function setAvialableFromHour(s) {
            vm.space.available.from.h = s;
            // console.log(vm.space.available);
        }
        function setAvialableFromMinute(s) {
            vm.space.available.from.m = s;
            // console.log(vm.space.available);
        }
        function setAvialableTo(s) {
            vm.space.available.to.day = s;
            // console.log(vm.space.available);
        }
        function setAvialableToHour(s) {
            vm.space.available.to.h = s;
            // console.log(vm.space.available);
        }
        function setAvialableToMinute(s) {
            vm.space.available.to.m = s;
            // console.log(vm.space.available);
        }
        function setUnAvialableFrom(s) {
            vm.space.unAvailable.from.day = s;
            // console.log(vm.space.available);
        }
        function setUnAvialableFromHour(s) {
            vm.space.unAvailable.from.h = s;
            // console.log(vm.space.available);
        }
        function setUnAvialableFromMinute(s) {
            vm.space.unAvailable.from.m = s;
            // console.log(vm.space.available);
        }
        function setUnAvialableTo(s) {
            vm.space.unAvailable.to.day = s;
            // console.log(vm.space.available);
        }
        function setUnAvialableToHour(s) {
            vm.space.unAvailable.to.h = s;
            // console.log(vm.space.available);
        }
        function setUnAvialableToMinute(s) {
            vm.space.unAvailable.to.m = s;
            // console.log(vm.space.available);
        }
        function countOf(text) {
            var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
            vm.space.descCount = s.length;
            if (vm.space.descCount > 500) {
                alert('Only 500 words allowed.');
            }
            return s ? 500 - s.length : '';
        };
        vm.test = function (s) {
            alert('test success');
            console.log(s);
        }
    }


})();
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
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('RegisterService', RegisterService);

    RegisterService.inject = ['$http', '$q'];
    function RegisterService($http, $q) {
        var service = {
            send: send
        };

        return service;

        ////////////////
        function send(o) {
            var api_type = 'venue'
            var url = API_URL + api_type;    
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            var params = {
                name: o.title,
                address: o.address,
                location: o.location,
                city: o.city,
                owner_name: o.user.name,
                user_id: o.user._id,
                owner_number: o.contactNumber,
                description: o.description,
                photos: o.photos,
                listing_title: o.title,
                max_guests: o.guestsMax,
                standing: o.guestsStanding,
                sitting: o.guestsSeated,
                event_type: o.eventTypes,
                style: o.styleTypes,
                // activity:[],
                no_of_rooms: o.rooms,
                no_of_restrooms: o.restRooms,
                no_of_floors: o.floors,
                area: o.area,
                amenitites: o.amenities,
                rules: o.rules,
                available: o.available,
                unavailable: o.unAvailable,
                min_hours: o.minHours,
                hourly_rate: o.hourlyRate,
                full_day_rate: o.dayRate,
                extra_desc: o.extraDesc,
                cancellation_policy: o.cancelationPolicy,
                hold_before_cancel: o.holdBeforeCancel,
                owner_email: o.user.email,
                space_type: o.typeOfSpace,
                kind: o.kindOfSpace,
                feature: o.features,
                extra_number: o.contactNumberExtra,
                deposit: o.deposit,
                accessibility: o.access
            };
            return $http.post(url, params,config).
                then(function (response) {

                    //console.log(response);
                    if (response.data) {

                        //    console.log(response.data.ret);         
                        return response.data;

                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }

    }
})();
/*(function() {
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

*/

(function() {
    'use strict';

    angular
        .module('venuse')
        .directive('loginModal', loginModal);

    loginModal.inject = [];
    function loginModal() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
         restrict: 'E',
                templateUrl: 'app/auth/loginmodal.html'
        };
        return directive;
    }
})();

(function() {
    'use strict';

    angular
        .module('venuse')
        .directive('signupModal', signupModal);

    signupModal.inject = [];
    function signupModal() {
        var directive = {
         restrict: 'E',
                templateUrl: 'app/auth/signupmodal.html'
        };
        return directive;
    }
})();


(function () {
  'use strict';

  angular
    .module('venuse')
    .factory('AuthService', AuthService);

  AuthService.inject = ['$http', '$q'];
  function AuthService($http, $q) {
    var api_type = 'user/login';
    var loginstatus = false;
    var user;
    var service = {
      googleLogin: googleLogin,
      fbLogin: fbLogin,
      login: login,
      setLogin: setLogin,
      isLogin: isLogin,
      getUser: getUser,
      logOut: logOut,
      register: register
    };

    return service;

    ////////////////
    function register(n, e, p) {
      var url = API_URL + 'register/user';
      var params = {
        "name": n,
        "email": e,
        "pass": p
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data.status === true) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 
          } else
            return $q.reject(response);
        })
        .catch();

    }

    function logOut() {
      loginstatus = false;
      user = {};
    }
    function isLogin() {
      return loginstatus;
    }
    function setLogin(u) {
      user = u;
    }
    function getUser() {
      return user;
    }
    function googleLogin(u) {
      var url = API_URL + api_type + '/google';
      var params = {
        "name": u.w3.ig,
        "email": u.w3.U3,
        "photo": u.w3.Paa,
        "google_id": u.w3.Eea
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 



          } else
            return $q.reject(response);
        })
        .catch(function (err) {
          return $q.reject(err);
        });

    }

    function fbLogin(u) {
      var url = API_URL + api_type + '/fb';
      var params = {
        "name": u.name,
        "email": u.email,
        "photo": u.picture.data.url,
        "fb_id": u.id
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 



          } else
            return $q.reject(response);
        })
        .catch(function (err) {
          return $q.reject(err);
        });
    }

    function login(e, p) {
      var url = API_URL + api_type;
      var params = {
        "email": e,
        "password": p
      };
      return $http.post(url, params).
        then(function (response) {

          //console.log(response);
          if (response.data.status === true) {
            loginstatus = true;
            setLogin(response.data.user);
            //    console.log(response.data); 
          } else
            return $q.reject(response);
        })
        .catch(function (err) {
          return $q.reject(err);
        });
    }
  }
})();

    angular.module('venuse')
        .config(function ($facebookProvider) {
            $facebookProvider.setAppId('1675125199182213');
        })
        .run(function () {
            // Load the facebook SDK asynchronously
            (function () {
                // If we've already installed the SDK, we're done
                if (document.getElementById('facebook-jssdk')) { return; }

                // Get the first script element, which we'll use to find the parent node
                var firstScriptElement = document.getElementsByTagName('script')[0];

                // Create a new script element and set its id
                var facebookJS = document.createElement('script');
                facebookJS.id = 'facebook-jssdk';

                // Set the new script's source to the source of the Facebook JS SDK
                facebookJS.src = '//connect.facebook.net/en_US/all.js';

                // Insert the Facebook JS SDK into the DOM
                firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
            }());
        });
(function () {
    'use strict';

    var bookings = {
        controller: 'BookingController',
        controllerAs: 'vm',
        templateUrl: `app/bookings/booking_details.html`
    };

    angular
        .module('venuse')
        .component('bookings', bookings);


    angular
        .module('venuse')
        .controller('BookingController', BookingController);

    BookingController.inject = ['BookingsService', 'AuthService'];
    function BookingController(BookingsService, AuthService) {
        var vm = this;


        vm.$onInit = function () {
            vm.loading = false;
            vm.user = AuthService.getUser();
            vm.bookings = [];


            vm.loading = true;
            BookingsService.get(vm.user._id)
                .then(function (res) {
                    vm.bookings = res.data.bookings;
                    vm.loading = false;
                })
                .catch(function (err) {
                    console.log(err);
                    alert('No Bookings Found.');
                    vm.loading = false;
                });
        }
    }


})();
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('BookingsService', BookingsService);

    BookingsService.inject = ['$http', '$q'];
    function BookingsService($http, $q) {
         var api_type = 'bookings/user?user_id=';
        var service = {
            get: get,
            
        };

        return service;


        function get(id){
            var url = API_URL + api_type + id;
          
            return $http.get(url).
                then(function (response) {
                    if (response.data.bookings.length !== 0) {      
                        return response;
                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();
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


(function () {
    'use strict';
    angular
        .module('venuse')
        .directive('appFooter', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/footer/footer.view.html'
            };
        });

})();


(function () {
    'use strict';


    var appHeader = {
        controller: HeaderController,
        controllerAs: 'vm',
        templateUrl: `app/header/header.html`,
    };

    angular
        .module('venuse')
        .component('appHeader', appHeader);


    angular
        .module('venuse')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['AuthService', '$scope', '$facebook'];
    function HeaderController(AuthService, $scope, $facebook) {
        var vm = this;

        vm.$onInit = function () {
            vm.fbLogin = fbLogin;
            vm.logOut = logOut;
            vm.userstatus = false;
            vm.user = {};
            vm.login = login;
            vm.showLogin = showLogin;
            vm.showRegister = showRegister;
            vm.checkLogin = checkLogin;
            vm.formError = false;
            vm.regFormError = false;
            vm.checkReg = checkReg;
        }
        //end controller init
        function checkReg() {
            if (vm.regEmail && vm.regPass && vm.regName) {
                vm.regFormError = false;
                vm.regLoad = true;
                AuthService.register(vm.regName, vm.regEmail, vm.regPass)
                    .then(function () {
                        vm.regLoad = false;
                        vm.login();
                        $('#signup-modal').modal('hide');
                    })
                    .catch(function (err) {
                        vm.regLoad = false;
                        //  console.log(err);
                        alert(err.data.message);
                    });
            }
            else vm.regFormError = true;
        }

        function checkLogin() {
            if (vm.email && vm.pass) {
                vm.formError = false;
                vm.loginLoad = true;
                AuthService.login(vm.email, vm.pass)
                    .then(function () {
                        vm.loginLoad = false;
                        vm.login();

                    })
                    .catch(function (err) {
                       alert(err.data.message);
                       vm.loginLoad = false;
                    });
            }
            else vm.formError = true;
        }
        function login() {
            vm.userstatus = true;
            vm.user = AuthService.getUser();
            $('#login-modal').modal('hide');
        }
        function logOut() {
            AuthService.logOut();
            vm.userstatus = false;
            vm.user = {};
        }

        function fbLogin() {
            $facebook.login().then(function () {
                $facebook.api("/me?fields=id,name,email,picture").then(
                    function (response) {
                        console.log(response)
                        AuthService.fbLogin(response)
                            .then(function () {
                                $('#signup-modal').modal('hide');
                                vm.login();
                            })
                            .catch();
                    },
                    function (err) {
                        console.log(err);
                    })
                    .catch();
            });
        }


        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log('Signed in!');
            console.log(authResult);
            AuthService.googleLogin(authResult)
                .then(function () {
                    $('#signup-modal').modal('hide');
                    vm.login();

                })
                .catch();
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
            console.log(authResult);
        });

        function showLogin() {
            $('#signup-modal').modal('hide');
            $('#login-modal').modal();
        }
        function showRegister() {
            $('#login-modal').modal('hide');
            $('#signup-modal').modal();
        }
    }
})();
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
(function() {
'use strict';

    var messages = {
        templateUrl: `app/messages/book_messages.html`
    };
        
    angular
        .module('venuse')
        .component('messages', messages);

})();
(function() {
'use strict';

    var venusepopular = {
        controller: PopularController,              
        controllerAs: 'vm',
        templateUrl: `app/popular/popular.html`,
      
    };
        
    angular
        .module('venuse')
        .component('venusepopular', venusepopular);

        angular
        .module('venuse')
        .controller('PopularController', PopularController);

    PopularController.inject = ['$http', '$q', 'PopularService'];
    function PopularController($http, $q, PopularService) {
        var vm = this;


        vm.$onInit = function () {
vm.venues=[];
            ////////////////
            PopularService.get()
                .then(function (res) {
                  
                    vm.venues=res.venues;
                    //  console.log(vm.venues);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

})();




(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('PopularService', PopularService);

    PopularService.inject = ['$http', '$q'];
    function PopularService($http, $q) {
        var service = {
            get: get
        };

        return service;

        function get() {

            var url = API_URL + 'popular/venues';

            return $http.get(url).
                then(function (response) {
                    //console.log(response);
                    if (response.data) {
                        //    console.log(response.data.ret);         
                        return response.data;
                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();
(function () {
    'use strict';

    var profile = {
        controller: 'ProfileController',
        controllerAs: 'vm',
        templateUrl: `app/profile/profile_details.html`
    };

    angular
        .module('venuse')
        .component('profile', profile);

    angular
        .module('venuse')
        .controller('ProfileController', ProfileController);

    ProfileController.inject = ['ProfileService', 'AuthService', '$state'];
    function ProfileController(ProfileService, AuthService, $state) {
        var vm = this;
        vm.$onInit = function () {
            vm.loading = false;
            vm.profile = {};
            vm.profile.id = '';
            vm.profile.fName = '';
            vm.profile.lName = '';
            vm.profile.name = '';
            vm.profile.email = '';
            vm.profile.phone = '';
            vm.profile.photo = '';
            vm.profile.address = '';
            vm.profile.aboutMe = '';
            vm.profile.companyName = '';
            vm.profile.jobTitle = '';
            vm.profile.companyPhone = '';
            vm.user = AuthService.getUser();
            vm.profile.id = vm.user._id;
            vm.submit = submit;

        }

        function submit() {
            vm.loading = true;
            var photo = document.getElementById("profilePhoto");
            if (photo.files.length !== 0) {
                var form = new FormData();
                form.append('file', photo);

                var settings = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://venuse-backend.herokuapp.com/image",
                    "method": "POST",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    //  console.log(response);
                    var json = JSON.parse(response);
                    vm.profile.photo = json.url;

                });
                $.ajax(settings).fail(function (response) {
                    console.log(response);
                    alert("Could not upload profile image.");
                });
            }
            vm.profile.name = vm.profile.fName + vm.profile.lName;
            ProfileService.update(vm.profile)
                .then(function (res) {
                    console.log(res);
                    alert('Profile Updated');
                    vm.loading = false;
                    $state.reload();
                })
                .catch(function (err) {
                    console.log(err);
                    alert('Profile could not be updated');
                    vm.loading = false;
                });
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('ProfileService', ProfileService);

    ProfileService.inject = ['$http', '$q'];
    function ProfileService($http, $q) {
         var api_type = 'user/update';
        var service = {
            update: update,
            setting:setting
        };

        return service;


        function update(o) {
           
            var url = API_URL + api_type;
            var params = {
                id:o.id,
                name:o.name,
                number:o.number,
                email:o.email,
                photo:o.photo,
                about_me:o.aboutMe,
                organisation_name:o.companyName,
                organisation_number:o.companyPhone,
                job_title:o.jobTitle,


            };
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status===true) {      
                        return response;
                    } else
                        return $q.reject(response);
                });
        }

        function setting(o){
            var url = API_URL + api_type;
            var params = {
                id:o.id,
                recieve_marketing_mail:o.email,
                recieve_sms:o.sms,
            };
            return $http.post(url, params).
                then(function (response) {
                    if (response.data.status===true) {      
                        return response;
                    } else
                        return $q.reject(response);
                })
                 .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('BookService', BookService);

    BookService.inject = ['$http', '$q', 'AuthService'];
    function BookService($http, $q, AuthService) {
        var api_type = 'book/venue'
        var service = {
            send: send
        };

        return service;

        function send(o) {
            
            var user = AuthService.getUser();
            var url = API_URL + api_type;
            var params = {
                venue_id: o.venueId,
                start_time: o.startDate,
                end_time: o.endDate,
                user_id: user._id,
                event_type: o.eventType

            }
            return $http.post(url, params).
                then(function (response) {
                    if (response.data) {
                        //  console.log(response);         
                        return response.data;

                    } else
                        return $q.reject(response);
                })
                 .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();
(function () {
    'use strict';

    var venue = {
        controller: ControllerController,
        controllerAs: 'vm',
        templateUrl: `app/venue/venue.html`,
    };

    angular
        .module('venuse')
        .component('venue', venue);


    angular
        .module('venuse')
        .controller('ControllerController', ControllerController);

    ControllerController.inject = ['VenueDetailService', '$stateParams', '$scope', '$state', 'BookService','AuthService'];
    function ControllerController(VenueDetailService, $stateParams, $scope, $state, BookService,AuthService) {
        var vm = this;


        vm.$onInit = function () {
            getvenue();
            vm.user=AuthService.isLogin();
            vm.testPay = '9.99';
            vm.loading = false;
            vm.venue = {};
            vm.startDate;
            vm.endDate;
            vm.book = {};
            vm.book.guests;
            vm.book.startDate = '';
            vm.book.endDate = '';
            vm.book.venueId = '';
            vm.book.eventType = '';

            //functions
            vm.startChange = startChange;
            vm.endChange = endChange;
            vm.eventSelect = eventSelect;
            $scope.submit = submit;
            vm.loginAlert=loginAlert;

        }

        function getvenue() {
            VenueDetailService.get($stateParams.id)
                .then(function (res) {
                    if (res.length !== 0) {
                        vm.venue = res.venue;
                        vm.book.venueId = vm.venue._id;
                    }
                    else alert('Vo Venue found.');
                    vm.loading = false;
                })
                .catch(function () {
                    vm.loading = true;
                });
        }


        function startChange() {
            vm.book.startDate = vm.startDate.getDay() + '/' +
                vm.startDate.getMonth() + '/' +
                vm.startDate.getFullYear() + ' ' +
                vm.startDate.getHours() + ':' +
                vm.startDate.getMinutes();

        }

        function endChange() {
            vm.book.endDate = vm.endDate.getDay() + '/' +
                vm.endDate.getMonth() + '/' +
                vm.endDate.getFullYear() + ' ' +
                vm.endDate.getHours() + ':' +
                vm.endDate.getMinutes();
        }

        function eventSelect(e) {
            vm.book.eventType = e;
        }

        function submit(data) {
            if (AuthService.isLogin()) {
                console.log(AuthService.isLogin());
                console.log(data);
                BookService.send(vm.book)
                    .then(function (res) {
                        if (res) {
                            alert('Venue Booked successfully.');
                            $state.go('home');
                        }
                        else alert('Venue Could not be booked. Try Again.');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            else alert('Please login to book venue.');
        }

        function loginAlert(){
            vm.user=AuthService.isLogin();
            if( !vm.user){
                alert('Please login to book venue.');
            }
            
            
        }

    }

})();
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('VenueDetailService', VenueDetailService);

    VenueDetailService.inject = ['$http', '$q'];
    function VenueDetailService($http, $q) {
        var api_type = 'venue/details?venue_id='
        var service = {
            get: get
        };

        return service;

        function get(id) {

            var url = API_URL + api_type +id;
    
            return $http.get(url).
                then(function (response) {
                    if (response.data) {

                       //  console.log(response);         
                        return response.data;

                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('venuse')
        .factory('VenueService', VenueService);

    VenueService.inject = ['$http', '$q'];
    function VenueService($http, $q) {
        var api_type = 'venue/user/book'
        var service = {
            get: get,
            search: search
        };

        return service;

        function get() {

            var url = API_URL + api_type;

            return $http.get(url).
                then(function (response) {

                    //console.log(response);
                    if (response.data) {

                        //    console.log(response.data.ret);         
                        return response.data;

                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function search(o) {

            var url = API_URL + 'search/venues';
            var params = {

            };
            var list = Object.keys(o);
            var index = 0;
            _.forOwn(o, function (value) {
                if (value !== '' && value.length !== 0) {
                    var temp = list[index];
                    params[temp] = value;
                }
                index++;
            });
            return $http.post(url, params).
                then(function (response) {

                    console.log(response);
                    if (!response.error) {

                        //    console.log(response.data.ret);         
                        return response.data.venues;

                    } else
                        return $q.reject(response);
                })
                .catch(function (err) {
                   return $q.reject(err);
                });
        }

    }
})();

(function () {
    'use strict';

    var venues = {
        controller: VenuesController,
        controllerAs: 'vm',
        templateUrl: `app/venues/venues.html`,
        bindings: {
            city: '<',
            event: '<'
        }
    };

    angular
        .module('venuse')
        .component('venues', venues);


    angular
        .module('venuse')
        .controller('VenuesController', VenuesController);

    VenuesController.inject = ['VenueService', '$stateParams', '$transitions'];
    function VenuesController(VenueService, $stateParams, $transitions) {
        var vm = this;
        vm.$onInit = function () {
            vm.filter = {};
            vm.filter.type = $stateParams.event;
            vm.filter.city = $stateParams.city;
            vm.moreFilter = { status: false, text: ['Show More Filters', 'Less Filters'] };
            vm.moreFilter.selected = vm.moreFilter.text[0];
            vm.sortfilters = [{ value: 'popular', name: 'By Popularity' },
            { value: 'hourly_rate', name: 'By Price' }];
            vm.sortFilter = vm.sortfilters[0];
            vm.venues = [];
            vm.filter.query = '';
            vm.filter.latitude = '', vm.filter.longitude = '';
            vm.filter.amenities = [];
            vm.filter.rules = [];
            vm.filter.styles = [];
            vm.filter.features = [];
            vm.filter.guests = '';
            vm.filter.size = '';
            vm.filter.hourly = '';
            vm.filter.daily = '';


            vm.guestSlider = {
                minValue: 5,
                maxValue: 500,
                options: {
                    floor: 0,
                    ceil: 500,
                    step: 5
                }
            };
            vm.sizeSlider = {
                minValue: 0,
                maxValue: 15000,
                options: {
                    floor: 0,
                    ceil: 15000,
                    step: 100
                }
            };
            vm.hourSlider = {
                minValue: 20,
                maxValue: 500,
                options: {
                    floor: 20,
                    ceil: 500,
                    step: 5
                }
            };
            vm.daySlider = {
                minValue: 100,
                maxValue: 7000,
                options: {
                    floor: 100,
                    ceil: 7000,
                    step: 100
                }
            };
            vm.amenityTypes = [
                { status: false, value: 'Air Conditioning' },
                { status: false, value: 'Wifi' },
                { status: false, value: 'TV' },
                { status: false, value: 'Kitchen' },
                { status: false, value: 'Tableware' },
                { status: false, value: 'Bathrooms' },
                { status: false, value: 'Lounge' },
                { status: false, value: 'Additional Chairs' },
                { status: false, value: 'Sound System' },
                { status: false, value: 'Large Table' },
                { status: false, value: 'Ample' },
                { status: false, value: 'Street Parking ' },
                { status: false, value: 'On-site Parking' },
                { status: false, value: 'Buttler' },
            ];
            vm.ruleTypes = [
                { status: false, value: 'No Smoking Outside' },
                { status: false, value: 'No Smoking Indoors' },
                { status: false, value: 'No Cooking' },
                { status: false, value: 'No Open Flame' },
                { status: false, value: 'No alcohol (selling)' },
                { status: false, value: 'No Drugs' },
                { status: false, value: 'No loud music / dancing' },
                { status: false, value: 'No one under 21' },
                { status: false, value: 'No teenagers (10-18)' },
                { status: false, value: 'No children (0-10)' },
                { status: false, value: 'No Drinking' },
                { status: false, value: 'No Eatables allowed' },
                { status: false, value: 'No concerts/parties' },

            ];
            vm.styleTypes = [
                { status: false, value: 'Classic' },
                { status: false, value: 'Modern' },
                { status: false, value: 'Whimsical ' },
                { status: false, value: 'Minimalist' },
                { status: false, value: 'Luxurious' },
                { status: false, value: 'Industrial' },
            ];
            vm.featureTypes = [
                { status: false, value: 'Exposed Brick' },
                { status: false, value: 'Exposed Pipes' },
                { status: false, value: 'High Ceiling' },
                { status: false, value: 'Skylight' },
                { status: false, value: 'Large Windows' },
                { status: false, value: 'Library ' },
                { status: false, value: 'Dining Table' },
                { status: false, value: 'Modern Bathroom' },
                { status: false, value: 'Bathtub' },
                { status: false, value: 'Fireplace' },
                { status: false, value: 'Piano' },
                { status: false, value: 'Bar' },
                { status: false, value: 'Concrete' },
                { status: false, value: 'Wood Floors' },
                { status: false, value: 'Art' },
                { status: false, value: ' Garden ' },
                { status: false, value: 'Plants' },
                { status: false, value: 'Graffiti' },
                { status: false, value: 'Cyc' },
                { status: false, value: 'Sound-Proof' },
                { status: false, value: 'Props' },
                { status: false, value: 'Furnished' },
                { status: false, value: 'Empty' },
                { status: false, value: 'Deck/patio' },
                { status: false, value: 'Roof' },
                { status: false, value: 'Storefront' },
                { status: false, value: 'View' },
                { status: false, value: 'Wood Beams' },
                { status: false, value: 'Columns' },
                { status: false, value: 'Multi-level' },
                { status: false, value: 'White Space' },
                { status: false, value: 'Screening Room' },
                { status: false, value: 'Breakout Rooms' },
                { status: false, value: 'Open Kitchen' },

            ];
            getVenues();
            footerChange();
            vm.sortBy = sortBy;
            vm.setMap = setMap;
            vm.eventSelect = eventSelect;
            vm.submit = submit;
            vm.rollUp = rollUp;
            vm.rollDown = rollDown;



        }

        function sortBy(s) {
            vm.venues = _.sortBy(vm.venues, s.value);
            // console.log(vm.venues);
        }
        function setMap() {
            var places = new google.maps.places.Autocomplete(document.getElementById('txtSearchLocation'));
            google.maps.event.addListener(places, 'place_changed', function () {
                var boundsByCity = places.getPlace();

                _.forEach(boundsByCity, function (obj) {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].types[0] == "locality") {
                            //   alert(obj.address_components[i].short_name+" "+obj.address_components[i].long_name);
                            vm.filter.city = obj[i].long_name;
                            // alert(city+ " from function");
                            return false;
                        }
                    }
                });
                var lat = boundsByCity.geometry.location.lat();
                var lng = boundsByCity.geometry.location.lng();
                if (lat !== null && lng !== null) {
                    vm.filter.latitude = lat;
                    vm.filter.longitude = lng;
                }
            });

        }

        function getVenues() {
            vm.loading = true;
            var search = {
            };
            if (vm.filter.city) {
                search.city = vm.filter.city;
            }
            if (vm.filter.event) {
                search.event = vm.filter.event;
            }

            VenueService.search(search)
                .then(function (res) {
                    if (res.length !== 0)
                        vm.venues = res;

                    else alert('Vo Venues found.');
                    vm.loading = false;
                })
                .catch(function () {
                    vm.loading = true;
                });
        }
        function footerChange() {
            $('.main-footer').css('display', 'none'); // to hide footer
            $transitions.onExit({exiting: "venues"}, function () {
                $('.main-footer').css('display', 'block'); // to enable footer on state leave
            });
        }


        function eventSelect(e) {
            // alert(e);
            vm.filter.type = e;
        }

        function submit() {

            _.forEach(vm.amenityTypes, function (a) {
                if (a.status === true) {
                    vm.filter.amenities.push(a.value);
                }
            });

            _.forEach(vm.ruleTypes, function (a) {
                if (a.status === true) {
                    vm.filter.rules.push(a.value);
                }
            });

            _.forEach(vm.styleTypes, function (a) {
                if (a.status === true) {
                    vm.filter.styles.push(a.value);
                }
            });

            _.forEach(vm.featureTypes, function (a) {
                if (a.status === true) {
                    vm.filter.features.push(a.value);
                }
            });

            vm.filter.guests = vm.guestSlider.minValue + '-' + vm.guestSlider.maxValue;
            vm.filter.size = vm.sizeSlider.minValue + '-' + vm.sizeSlider.maxValue;
            vm.filter.hourly = vm.hourSlider.minValue + '-' + vm.hourSlider.maxValue;
            vm.filter.daily = vm.daySlider.minValue + '-' + vm.daySlider.maxValue;

            vm.loading = true;
            VenueService.search(vm.filter)
                .then(function (res) {
                    if (res.length !== 0)
                        vm.venues = res;

                    else alert('Vo Venues found.');
                    vm.loading = false;
                })
                .catch(function () {
                    vm.loading = true;
                });

        }

        function rollUp(id) {
            $('#' + id).css('opacity', '0');
            $('#' + 'roll-' + id).css('opacity', '1');
            $('#' + 'roll-' + id).css('z-index', '10');
        }

        function rollDown(id) {
            $('#' + id).css('opacity', '1');
            $('#' + 'roll-' + id).css('opacity', '0');
            $('#' + 'roll-' + id).css('z-index', '-3');
        }

    }


})();
(function() {
'use strict';

    var venuseCommunity = {
        templateUrl: `app/home/community/view.html`
    };
        
    angular
        .module('venuse')
        .component('venuseCommunity', venuseCommunity);

})();
(function() {
'use strict';

    var venuseHost = {
        templateUrl: `app/home/host/view.html`,
    };
        
    angular
        .module('venuse')
        .component('venuseHost', venuseHost);

})();