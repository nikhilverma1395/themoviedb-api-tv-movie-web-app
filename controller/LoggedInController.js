(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoggedInController', LoggedInController);
    LoggedInController.$inject = ['$scope', '$http', '$rootScope', '$window', '$location'];
    function LoggedInController($scope, $http, $rootScope, $window, $location) {
        var data = JSON.parse(sessionStorage.getItem('user'));
        if (data == null) {
            $location.path('/login');
            return;
        }
        if (data != null) {
            $scope.name = data.fname + "\t" + data.lname;
            $scope.uname = data.username;
            $scope.email = data.email;
            $rootScope.userName = data.fname + "\t" + data.lname;
        }
        $scope.logout = function () {
            $rootScope.logg1 = false;
            sessionStorage.setItem('user', null);
            sessionStorage.setItem('loggedIn', false);
            sessionStorage.setItem('jwtToken', null);
            localStorage.setItem('user', null);
            $location.path('/login');
        };
    }
})();