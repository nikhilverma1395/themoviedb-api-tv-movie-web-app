(function () {
    'use strict';
    var app = angular.module('app', ['ui.router', "ngTouch", "angucomplete-alt"]);
    app.config(config).run(run);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/movie");
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'lc'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/sign_up.html',
                controller: 'RegisterController',
                controllerAs: 'rc'
            })
            .state('logged', {
                url: '/logged',
                templateUrl: 'views/user.html',
                controller: 'LoggedInController',
                controllerAs: 'lic'
            })
            .state('movie', {
                url: '/movie',
                templateUrl: 'views/movieMain.html',
                controller: 'MovieController',
                controllerAs: 'mc'
            })
            .state('tv', {
                url: '/tv',
                templateUrl: 'views/tvMain.html',
                controller: 'TvController',
                controllerAs: 'tc'
            })
            .state('topTv', {
                url: '/topTv',
                templateUrl: 'views/tvTop.html',
                controller: 'TopMovieController',
                controllerAs: 'ttp'
            })
            .state('topMovie', {
                url: '/topMovie',
                templateUrl: 'views/topMovie.html',
                controller: 'TopMovieController',
                controllerAs: 'tmc'
            })
            .state('testRoutes', {
                url: '/testRoutes',
                templateUrl: 'views/testRoutes.html',
                controller: 'TestController'
            })
            .state('recent', {
                url: '/recent',
                templateUrl: 'views/recentView.html',
                controller: 'RecentController'
            })
            .state('popMovie', {
                url: '/popMovie',
                templateUrl: 'views/topMovie.html',
                controller: 'TopMovieController',
                controllerAs: 'pmc'
            });
    }

    function run($http, $rootScope, $window) {
        var data = JSON.parse(sessionStorage.getItem('user'));
        if (data != null) {
            $rootScope.userName = data.fname + "\t" + data.lname;
        }
        $('.materialboxed').materialbox();
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //    $window.isLoggedIn = false;
        //});
    }
})();
