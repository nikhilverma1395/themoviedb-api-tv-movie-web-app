(function () {
    'use strict';
    angular
        .module('app')
        .controller('TopMovieController', TopMovieController);
    TopMovieController.$inject = ['$scope', '$http', '$rootScope', '$window', '$location', 'DetailsService'];
    function TopMovieController($scope, $http, $rootScope, $window, $location, DetailsService) {
        $rootScope.loading = true;
        if ($location.path() === '/topMovie') {
            DetailsService.GetTopRatedMovies().then(function (response) {
                var json = angular.fromJson(response).results;
                $scope.showCard = true;
                //     var data = '[' + JSON.stringify(json[0]) + ',' + JSON.stringify(json[1]) + ',' + JSON.stringify(json[2]) + ']';
                console.log(json);
                $rootScope.loading = false;
                $scope.results = json;
            }, function (response) {
            });
        } else if ($location.path() === '/popMovie') {
            DetailsService.GetPopularMovies().then(function (response) {
                var json = angular.fromJson(response).results;
                $scope.showCard = true;
                $rootScope.loading = false;
                $scope.results = json;
            }, function (response) {
            });
        } else if ($location.path() === '/topTv') {
            DetailsService.GetTopRatedTvShows().then(function (response) {
                var json = angular.fromJson(response).results;
                $scope.showCard = true;
                console.log(json.length);
                $rootScope.loading = false;
                $scope.results = json;
            }, function (response) {
            });
        }

    }
})
();