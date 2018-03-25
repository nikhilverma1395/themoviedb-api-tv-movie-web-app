(function () {
    'use strict';
    angular
        .module('app')
        .controller('TestController', TestController);
    TestController.$inject = ['$scope', '$http', '$rootScope', '$window'];
    function TestController($scope, $http, $rootScope, $window) {
        $scope.routes = function () {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1:3000/api/users'
            }).success(function (data) {
                console.log(data);
            }).error(function (data) {
                console.log(data);
            });
        };
    }
})();