
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