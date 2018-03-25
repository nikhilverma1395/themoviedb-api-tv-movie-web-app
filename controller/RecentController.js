/**
 * Created by Nikhil Verma on 4/25/2016.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .controller('RecentController', RecentController);
    RecentController.$inject = ['$scope', '$http', '$rootScope', '$window', '$location', 'DetailsService'];
    function RecentController($scope, $http, $rootScope) {
        $rootScope.logReg = false;
        var isLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
        if (!isLoggedIn) {
            $scope.ndata = true;
            $rootScope.loading = false;
            return;
        }
        var data = JSON.parse(sessionStorage.getItem('user'));
        var token = sessionStorage.getItem('jwtToken');
        var data1 = '{"username":"' + data.username + '"}';
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/recent/getData',
            data: data1,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + token
            }
        }).success(function (data) {
            $scope.results = data;
            if (data.length === 0)      $scope.ndata = true;

        }).error(function (data) {
            $scope.ServerResponse = "Error";
        });

    }
})();