(function () {
    'use strict';
    angular
        .module('app')
        .factory('DetailsService', DetailsService);
    DetailsService.$inject = ['$http'];
    function DetailsService($http) {
        var service = {};
        var pre = 'https://api.themoviedb.org/3/';
        var apikey = '?api_key=API_KEY';

        service.GetMovieById = GetMovieById;
        service.GetTvById = GetTvById;
        service.GetSeasonByIdAndSno = GetSeasonByIdAndSno;
        service.GetPopularMovies = GetPopularMovies;
        service.GetPopularTvShows = GetPopularTvShows;
        service.GetOnTheAirTvShows = GetOnTheAirTvShows;
        service.GetTopRatedTvShows = GetTopRatedTvShows;
        service.GetSeasonEpisodeCreditsByIdAndSno = GetSeasonEpisodeCreditsByIdAndSno;
        service.GetTopRatedMovies = GetTopRatedMovies;
        service.GetMovieCredits = GetMovieCredits;
        service.GetTvShowCredits = GetTvShowCredits;
        service.GetSeasonImagesByIdAndSno = GetSeasonImagesByIdAndSno;
        service.GetSeasonCreditsByIdAndSno = GetSeasonCreditsByIdAndSno;
        service.GetSeasonEpisodeByIdAndSno = GetSeasonEpisodeByIdAndSno;
        service.GetMovieImages = GetMovieImages;
        service.GetSeasonEpisodeImagesByIdAndSno = GetSeasonEpisodeImagesByIdAndSno
        service.GetPersonById = GetPersonById;
        service.GetTvShowImages = GetTvShowImages;
        service.GetPersonMovieCredits = GetPersonMovieCredits;
        service.GetPersonTvCredits = GetPersonTvCredits;
        service.GetPersonCombinedCredits = GetPersonCombinedCredits;
        service.GetDiscoverTv = GetDiscoverTv;
        service.GetDiscoverMovie = GetDiscoverMovie;
        return service;

        function GetTvById(id) {
            return $http.get(pre + 'tv/' + id + apikey).then(handleSuccess, handleError('Error getting tv details'));
        }

        function GetMovieById(id) {
            return $http.get(pre + 'movie/' + id + apikey).then(handleSuccess, handleError('Error getting movie details'));
        }

        function GetSeasonByIdAndSno(id, sno) {
            return $http.get(pre + 'tv/' + id + '/season/' + sno + apikey).then(handleSuccess, handleError('Error getting Season'));
        }

        function GetSeasonImagesByIdAndSno(id, sno) {
            return $http.get(pre + 'tv/' + id + '/season/' + sno + '/images' + apikey).then(handleSuccess, handleError('Error getting Season'));
        }

        function GetSeasonCreditsByIdAndSno(id, sno) {
            return $http.get(pre + 'tv/' + id + '/season/' + sno + '/credits' + apikey).then(handleSuccess, handleError('Error getting Season'));
        }

        function GetSeasonEpisodeByIdAndSno(id, sno, showno) {
            return $http.get(pre + 'tv/' + id + '/season/' + sno + '/episode/' + showno + apikey).then(handleSuccess, handleError('Error getting Season'));
        }

        function GetSeasonEpisodeCreditsByIdAndSno(id, sno, showno) {
            return $http.get(pre + 'tv/' + id + '/season/' + sno + '/episode/' + showno + '/credits' + apikey).then(handleSuccess, handleError('Error getting Season'));
        }

        function GetSeasonEpisodeImagesByIdAndSno(id, sno, showno) {
            return $http.get(pre + 'tv/' + id + '/season/' + sno + '/episode/' + showno + '/images' + apikey).then(handleSuccess, handleError('Error getting Season'));
        }

        function GetPopularMovies() {
            return $http.get(pre + 'movie/popular' + apikey).then(handleSuccess, handleError('Error getting popular movies'));
        }

        function GetPopularTvShows() {
            return $http.get(pre + 'tv/popular' + apikey).then(handleSuccess, handleError('Error getting popular tvShows'));
        }

        function GetOnTheAirTvShows() {
            return $http.get(pre + 'tv/on_the_air' + apikey).then(handleSuccess, handleError('Error getting on the air tvShows'));
        }

        function GetTopRatedTvShows() {
            return $http.g*et(pre + 'tv/top_rated' + apikey).then(handleSuccess, handleError('Error getting top rated tvShows'));
        }

        function GetTopRatedMovies() {
            return $http.get(pre + 'movie/top_rated' + apikey).then(handleSuccess, handleError('Error getting top rated movies'));
        }

        function GetMovieCredits(id) {
            return $http.get(pre + 'movie/' + id + '/credits' + apikey).then(handleSuccess, handleError('Error getting movie credits'));
        }

        function GetTvShowCredits(id) {
            return $http.get(pre + 'tv/' + id + '/credits' + apikey).then(handleSuccess, handleError('Error getting tvShow Credits'));
        }

        function GetMovieImages(id) {
            return $http.get(pre + 'movie/' + id + '/images' + apikey).then(handleSuccess, handleError('Error getting movie images'));
        }

        function GetTvShowImages(id) {
            return $http.get(pre + 'tv/' + id + '/images' + apikey).then(handleSuccess, handleError('Error getting tv images'));
        }

        function GetPersonById(id) {
            return $http.get(pre + 'person/' + id + apikey).then(handleSuccess, handleError('Error getting person By id'));
        }

        function GetPersonMovieCredits(id) {
            return $http.get(pre + 'person/' + id + '/movie_credits' + apikey).then(handleSuccess, handleError('Error getting person Movie Credist'));
        }

        function GetPersonTvCredits(id) {
            return $http.get(pre + 'person/' + id + '/tv_credits' + apikey).then(handleSuccess, handleError('Error getting person TvCredits'));
        }

        function GetPersonCombinedCredits(id) {
            return $http.get(pre + 'person/' + id + '/combined_credits' + apikey).then(handleSuccess, handleError('Error getting combined Credits'));
        }

        function GetDiscoverTv() {
            return $http.get(pre + '/discover/tv' + apikey).then(handleSuccess, handleError('Error getting discover Tv'));
        }

        function GetDiscoverMovie() {
            return $http.get(pre + '/discover/movie' + apikey).then(handleSuccess, handleError('Error getting discover movie'));
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }

    }

})();