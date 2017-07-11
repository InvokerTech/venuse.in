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