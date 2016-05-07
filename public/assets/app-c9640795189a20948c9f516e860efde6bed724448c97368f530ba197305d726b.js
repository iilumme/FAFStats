var FAFStats = angular.module('FAFStats', ['ngRoute'])
    .run(function($rootScope, StatsApi, FAFApi) {
      StatsApi.getSession().success(function(user){
        $rootScope.user = user;
      });

      $rootScope.renderAllPlayers = function() {
        if ($('.player-search').val().length === 3) {
          FAFApi.getAllPlayers().success(function(players) {
            $rootScope.players = players.data;
          });
        }
      };

      $rootScope.visibleSuggestions = function() {
        $('.search-suggest').css('display', 'inline-block');
      };

      $rootScope.invisibleSuggestions = function() {
        $('.search-suggest').css('display', 'none');
      };

    })
    .config(function ($routeProvider, $locationProvider) {
//        $locationProvider.html5Mode(true);
      $routeProvider
          .when('/', {
            controller: 'RootController',
            templateUrl: '/assets/static/root-2bd19c0c0262174dbb581becbc99bb1a05283ca81d769cfc0b635af969040c29.html '
          })
          .when('/playertemplate', {
            controller: 'PlayerController',
            templateUrl: '/assets/dynamic/player_show-c902550431ee089cee4289b8625d8486659a08630493fb0af7b56c2bfcf2e8ed.html '
          })
          .when('/player/:id', {
            controller: 'PlayerController',
            templateUrl: '/assets/dynamic/player_show-c902550431ee089cee4289b8625d8486659a08630493fb0af7b56c2bfcf2e8ed.html '
          })
          .when('/leaderboards', {
            controller: 'LeaderboardsController',
            templateUrl: '/assets/dynamic/leaderboards_show-432ef61c84c5c606e479a46a3655c318fe3e571b818a122dcef28fc52fadec10.html '
          })
          .when('/games', {
            controller: 'GameIndexController',
            templateUrl: '/assets/dynamic/game_index-d85da134cecfcd92d0f84ae2ee9a31815b7b69b8ac15ad2ef102bcc05416be24.html '
          })
          .when('/game/:id', {
            controller: 'GameController',
            templateUrl: '/assets/dynamic/game_show-bd319c00860da97626cfe69c5c04e8b2c6d69245217d1645ddfaaed05575155a.html '
          });
    });
