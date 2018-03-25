(function () {
    'use strict';
    angular
        .module('app')
        .controller('TvController', TvController);
    TvController.$inject = ['$scope', 'DetailsService', '$rootScope'];
    function TvController($scope, DetailsService, $rootScope) {
        $rootScope.logReg = true;
        $scope.getSelectedData = function (resp) {
            $scope.dataAv = true;
            var json = angular.fromJson(resp);
            $scope.poster_path = json.image;
            $scope.name = json.originalObject.original_name;
            $scope.overview = json.originalObject.overview;

            $scope.vote_average = json.originalObject.vote_average;
            var id = json.originalObject.id;
            getData(id);
        };


        function getData(id) {
            DetailsService.GetTvById(id).then(function (response) {
                var json = angular.fromJson(response);
                var proCom = json.production_companies;
                $scope.first_air_date = json.first_air_date + " - " + json.last_air_date;
                $scope.homepage = json.homepage;
                setProdCom(proCom);
                setGenre(json.genres);
            }, function (response) {
            });

        }

        function setGenre(genres) {
            var pop = "";
            for (var i = 0; i < genres.length; i++) {
                pop += genres[i].name;
                if (i != genres.length - 1)
                    pop += ", ";
            }
            $scope.genre = pop;
        }

        function setProdCom(names) {
            var pop = "";
            for (var i = 0; i < names.length; i++) {
                pop += names[i].name;
                if (i != names.length - 1)
                    pop += ", ";
            }
            $scope.names = pop;

        }
    }
})();