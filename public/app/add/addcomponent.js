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
            vm.space.description;
            vm.space.title;
            vm.space.hourlyRate;
            vm.space.minHours = 1;
            vm.space.dayRate;
            vm.space.extraDesc;
            vm.space.cancelationPolicy;
            vm.space.holdBeforeCancel = 1;
            vm.space.deposit;
            vm.space.photos = [];


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




            RegisterService.send(vm.space)
                .then(function (res) {
                    //  console.log(res);
                    if (res) {
                        alert('Venue added successfully.');
                        $state.go('venues');
                    }
                    else {
                        alert('Venue not added.Correct all details.');
                        $state.reload();
                    }
                })
                .catch(function (err) {
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
        vm.test = function (s) {
            alert('test success');
            console.log(s);
        }
    }


})();