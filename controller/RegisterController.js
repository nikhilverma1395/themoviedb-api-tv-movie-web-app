(function () {
    'use strict';
    angular
        .module('app')
        .controller('RegisterController', RegisterController);
    function RegisterController($scope, $http, $rootScope, $location) {
        $rootScope.logReg = false;
        $scope.postRegisterData = function () {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: $scope.formData,
                headers: {'Content-Type': 'application/json'}
            }).success(function (data) {
                Materialize.toast('Registered Successfully!', 2500);
                $location.path(data.redirect + '');
            }).error(function (data) {
                $scope.ServerResponse = data;
            })
        }
    }
})();