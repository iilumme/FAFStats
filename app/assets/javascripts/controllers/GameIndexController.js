FAFStats.controller('GameIndexController', function ($scope, $http) {

  /* Local functions */

  var findGames = function(playerOne, playerTwo, mode){
    if (mode === "1p") {
      return $http.get("http://api.faforever.com/games?filter[players]=" + playerOne + "&filter[mod]=ladder1v1&page[size]=50");
    } else if (mode === "1p_2") {
      return $http.get("http://api.faforever.com/games?filter[players]=" + playerTwo + "&filter[mod]=ladder1v1&page[size]=50");
    } else if (mode === "2p") {
      return $http.get("http://api.faforever.com/games?filter[players]=" + playerOne + "," + playerTwo + "&filter[mod]=ladder1v1&page[size]=50");
    } else {
      return $http.get("http://api.faforever.com/games?filter[mod]=ladder1v1&page[size]=50");
    }
  }

  var renderGames = function(mode) {
    findGames($scope.playerOne, $scope.playerTwo, mode).success(function(games){
      $scope.games = games;
    });
  }

  /* $scope functions */

  $scope.replaySearch = function() {
    if(isEmpty($scope.playerOne) && isEmpty($scope.playerTwo)) {
      renderGames("none");
    } else if(!isEmpty($scope.playerOne) && !isEmpty($scope.playerTwo)) {
      renderGames("2p")
    } else if(!isEmpty($scope.playerOne) && isEmpty($scope.playerTwo)) {
      renderGames("1p")
    } else if(isEmpty($scope.playerOne) && !isEmpty($scope.playerTwo)) {
      renderGames("1p_2")
    }
  }

  /* Init */

  renderGames("none");

});

/* Util */

function isEmpty(str) {
    return (!str || 0 === str.length);
}
