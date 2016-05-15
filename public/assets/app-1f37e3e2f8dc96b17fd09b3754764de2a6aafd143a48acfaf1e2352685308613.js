var FAFStats = angular.module('FAFStats', ['ngRoute', 'validation.match', 'ngFileUpload','ui.materialize'])
    .run(function($rootScope, StatsApi, FAFApi, $location, $route) {

      /* RootScope Variables */
      $rootScope.players = [];
      $rootScope.user = null;

      /* User */

      StatsApi.getUserInSession().success(function(user){
        if (user !== ""){
          $rootScope.user = user;
        } else {
          $rootScope.user = null;
        }
      });

      /* Player Search */

      $rootScope.triggerAutocomplete = function() {
        if ($('.player-search').val().length < 3 && $rootScope.players.length > 0) {
          $rootScope.players = new Array();
        } else if ($('.player-search').val().length >= 3 && $rootScope.players.length <= 0) {
          FAFApi.searchForPlayersByName($('.player-search').val()).success(function(players) {
            $rootScope.players = players.data;
          });
        }
      };

      $rootScope.focusPlayerSearch = function() {
        $('.search-suggest').css('display', 'inline-block');
      };

      $('.search-suggest-link').mousedown(function() {
        mousedownHappened = true;
      });

      /* Close player search suggestions once unfocused*/

      $rootScope.blurPlayerSearch = function() {
        $('.search-suggest').css('display', 'none');
        $("#search").val("");
        $rootScope.players = [];
      };

      $rootScope.logout = function() {
        StatsApi.logout().success(function() {
          $location.path('/');
          window.location.reload();
          Materialize.toast('Logged out', 4000);
        });
      };

      $rootScope.goToPlayerPage = function(id) {
        $location.path("/player/" + id);
      };

      $rootScope.triggerPlayerSearch = function() {
        $location.path("/player/" + $rootScope.players[0].attributes.id);
      };

    })
    .config(function ($routeProvider) {

      /* Authentication */
      var requireAuthentication = function () {
        return {
          load: function ($q, $location, $rootScope) {
            var deferred = $q.defer();
            deferred.resolve();
            /* If player is a moderator/admin */
            if ($rootScope.user && $rootScope.user.usertype < 2) { // fire $routeChangeSuccess
              return deferred.promise;
            } else { // fire $routeChangeError
              $location.path('/');

              // I don't think this is still necessary:
              return $q.reject("'/'");
            }
          }
        };
      };

      $routeProvider
          .when('/', {
            controller: 'RootController',
            templateUrl: '/assets/static/root-1b07aa1413b6ca8df9220b0afd16db17213f219b810bb0cc1dbe5acda329f6ca.html '
          })
          .when('/comments', {
            controller: 'CommentsController',
            templateUrl: '/assets/dynamic/comments_index-0aa1e351db22ad859ad5a7b1a11006692260d2d155ea5693984ee4d7f1bba1ea.html '
          })
          .when('/player/:id', {
            controller: 'PlayerController',
            templateUrl: '/assets/dynamic/player_show-1c8c9c18de461b04d3be41393ade36a9bbda0825061905164f197de167d77b43.html '
          })
          .when('/leaderboards', {
            controller: 'LeaderboardsController',
            templateUrl: '/assets/dynamic/leaderboards_show-432ef61c84c5c606e479a46a3655c318fe3e571b818a122dcef28fc52fadec10.html '
          })
          .when('/games', {
            controller: 'GameIndexController',
            templateUrl: '/assets/dynamic/game_index-2ffd21f11733eb282422cb88a03c4f086340391c81c6a45254980ad99b430fbd.html '
          })
          .when('/game/:id', {
            controller: 'GameController',
            templateUrl: '/assets/dynamic/game_show-2baf2edddffe347d5835945b80b4ae204a89c391d158d6871fc9fdd5957f3476.html '
          })
          .when('/login', {
            controller: 'LogInController',
            templateUrl: '/assets/dynamic/login-a2aaec15ec017b4c0959ae36000bd7b18f010393a76a07d5b8f57b13bbda9600.html '
          })
          .when('/moderator', {
            controller: 'ModeratorController',
            templateUrl: '/assets/dynamic/moderator_page-8c2e6c6438f984e05bd26066b3e3efee8e623d12368f748e3960e8786ab8c9e4.html ',
            resolve: requireAuthentication()
          });
    });
