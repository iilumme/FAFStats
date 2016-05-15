FAFStats.controller('GameIndexController', function ($scope, FAFApi, StatsApi) {

  // Finds games
  $scope.replaySearch = function() {
    if(isEmpty($scope.playerOne) && isEmpty($scope.playerTwo)) {
      renderGames("none");
    } else if(!isEmpty($scope.playerOne) && !isEmpty($scope.playerTwo)) {
      renderGames("2p");
    } else if(!isEmpty($scope.playerOne) && isEmpty($scope.playerTwo)) {
      renderGames("1p");
    } else if(isEmpty($scope.playerOne) && !isEmpty($scope.playerTwo)) {
      renderGames("1p_2");
    }
  };

  // Finds games with specified parameters and add them to $scope
  var renderGames = function(mode) {
    FAFApi.findGames($scope.playerOne, $scope.playerTwo, mode).success(function(games){
      $scope.games = games;
      getStars();
      renderTopRatedGames();
    });
  };

  var getStars = function() {
    for (var i = 0; i < $scope.games.data.length; i++) {
      (function(i) {

        StatsApi.getGame($scope.games.data[i].attributes.id).success(function(game){
          if (game !== '') {
            $scope.star_rating = game;

            $scope.games.data[i].yellowStars = [];
            for (var j = 0; j < game.average_of_star_ratings; j++) {
              $scope.games.data[i].yellowStars.push(j);
            }

            $scope.games.data[i].greyStars = [];
            for (var j = 0; j < 5 - game.average_of_star_ratings; j++) {
              $scope.games.data[i].greyStars.push(j);
            }

          } else {
            $scope.games.data[i].greyStars = [];
            for (var j = 0; j < 5; j++) {
              $scope.games.data[i].greyStars.push(j);
            }
          }
        });
      })(i);
    }
  };

  var renderTopRatedGames = function() {
    StatsApi.getAllGames().success(function(games){
      $scope.topRatedGames = games;
      for (var i = 0; i < games.length; i++) {
        (function(i) {
          FAFApi.findGame($scope.topRatedGames[i].game_id).success(function(game){
            $scope.topRatedGames[i].game = game.data[0];
          });
        })(i);
      }
    });
  }

  /* Init */

  $scope.$on('$viewContentLoaded', function() {
    renderGames("none");
  });

});

/* Util */

function isEmpty(str) {
  return (!str || 0 === str.length);
}
