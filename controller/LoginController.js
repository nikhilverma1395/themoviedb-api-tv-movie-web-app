(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$scope', '$rootScope', '$http', '$window', '$location'];
    function LoginController($scope, $rootScope, $http, $window, $location) {
        var data = JSON.parse($window.sessionStorage.getItem('user'));
        if (data != null) {
            $location.path('/logged');
            return;
        }
        $rootScope.logReg = false;
        $scope.postLoginData = function () {
            $window.sessionStorage.setItem('rememberMe', $scope.formData.rememberMe);
            $http({
                method: 'POST',
                url: 'http://127.0.0.1:3000/login',
                data: $scope.formData,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).success(function (data) {
                if (data.success === true) {
                    console.log(data.token);
                    if ($window.sessionStorage.getItem('rememberMe')) {
                        $window.localStorage.setItem('user', JSON.stringify(data.data));
                    }
                    $window.sessionStorage.setItem('loggedIn', true);
                    $window.sessionStorage.setItem('user', JSON.stringify(data.data));
                    $window.sessionStorage.setItem('jwtToken', data.token);
                    $rootScope.logg1 = true;
                    $location.path('/logged');
                }
            }).error(function (data) {
                $scope.ServerResponse = "Error";
            });
        }
    }
})();