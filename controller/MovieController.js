(function () {
    'use strict';
    angular
        .module('app')
        .controller('MovieController', MovieController);
    MovieController.$inject = ['$scope', 'DetailsService', '$rootScope', '$http'];

    function MovieController($scope, DetailsService, $rootScope, $http) {
        $rootScope.logReg = true;
        $scope.getSelectedData = function (resp) {
            var isLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
            $scope.dataAv = true;
            var json = angular.fromJson(resp);
            $scope.poster_path = json.image;
            $scope.original_title = json.title;
            $scope.overview = json.originalObject.overview;       //release_date
            $scope.release_date = json.originalObject.release_date;
            $scope.vote_average = json.originalObject.vote_average;
            var id = json.originalObject.id;
            if (isLoggedIn) postRecentToDb(id, json.title, json.image, json.originalObject.overview);
            else   console.log("Not ");

            getData(id);
        };
        function postRecentToDb(id, title, link, overview) {

            var data = JSON.parse(sessionStorage.getItem('user'));
            var token = sessionStorage.getItem('jwtToken');
            var data = '{"username":"' + data.username + '", "id": "' + id + '", "title": "' + title + '", "link": "' + link + '", "overview":"' + overview + '"}';
            $http({
                method: 'POST',
                url: 'http://127.0.0.1:3000/api/recent/addData',
                data: data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + token
                }
            }).success(function (data) {
                console.log(data);
            }).error(function (data) {
                $scope.ServerResponse = "Error";
            });
        }

        function getData(mid) {
            DetailsService.GetMovieById(mid).then(function (response) {
                var json = angular.fromJson(response);
                var proCom = json.production_companies;
                $scope.homepage = json.homepage;
                $scope.imdb_link = json.imdb_id;
                setProdCom(proCom);
                setGenre(json.genres);
            }, function (response) {
            });
            DetailsService.GetMovieCredits(mid).then(function (response) {
                var json = angular.fromJson(response);
                $scope.actors = json;
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