(function () {
    'use strict';
    angular
        .module('app')
        .controller('TvTopController', TvTopController);
    TvTopController.$inject = ['$scope', '$http', '$rootScope', '$window', '$location', 'DetailsService'];
    function TvTopController($scope, $http, $rootScope, $window, $location, DetailsService) {
        $rootScope.loading = true;
        DetailsService.GetTopRatedTvShows().then(function (response) {
            var json = angular.fromJson(response).results;
            $scope.showCard = true;
            console.log(json.length);
            $rootScope.loading = false;
            $scope.results = json;
        }, function (response) {
        });

    }
})();