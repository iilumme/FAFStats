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
    });
  };

  var getStars = function() {
    for (var i = 0; i < $scope.games.data.length; i++) {
      (function(i) {
        StatsApi.getStars($scope.games.data[i].attributes.id).success(function(star_rating) {
          $scope.games.data[i].star_rating = star_rating;
          $scope.games.data[i].yellowStars = [];
          for (var j = 0; j < star_rating.average_stars; j++) {
            $scope.games.data[i].yellowStars.push(j);
          }
          $scope.games.data[i].greyStars = [];
          for (var j = 0; j < 5 - star_rating.average_stars; j++) {
            $scope.games.data[i].greyStars.push(j);
          }
        });
      })(i);
    }
  };

  /* Init */

  renderGames("none");

});

/* Util */

function isEmpty(str) {
  return (!str || 0 === str.length);
}
