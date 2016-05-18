FAFStats.controller('GameIndexController', function ($scope, FAFApi, StatsApi) {

  // Finds games
  $scope.replaySearch = function() {
    renderGames();
  };

  // Finds games with specified parameters and add them to $scope
  var renderGames = function() {
    FAFApi.findGames($scope.playerOne, $scope.playerTwo, $scope.map).success(function(games){
      $scope.games = games;
      getCommentAmountForAllGames($scope.games);
      getStars();
      renderTopRatedGames();
    });
  };

  var getCommentAmountForAllGames = function(games) {
    /* Get the amount of comments for each game and add it to corresponding game */
    for (var i = 0; i < games.data.length; i++) {
      (function(i) {
        getCommentAmountForASingleGame(games.data[i]);
      })(i);
    }
  }

  var getCommentAmountForASingleGame = function(game) {
    StatsApi.getComments(game.attributes.id).success(function(comments){
      game.comments_amount = comments.length;
    });
  }

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
            for (var k = 0; k < 5 - game.average_of_star_ratings; k++) {
              $scope.games.data[i].greyStars.push(k);
            }

          } else {
            $scope.games.data[i].greyStars = [];
            for (var l = 0; l < 5; l++) {
              $scope.games.data[i].greyStars.push(l);
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
            getCommentAmountForASingleGame($scope.topRatedGames[i].game);
          });
        })(i);
      }
    });
  }

  /* Init */

  /* Currently FAF Api operations should be done sequentially,
    making it a bit of a mess */

  $scope.$on('$viewContentLoaded', function() {
    renderGames();
  });

});

/* Util */

function isEmpty(str) {
  return (!str || 0 === str.length);
}
