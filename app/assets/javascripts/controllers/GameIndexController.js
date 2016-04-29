FAFStats.controller('GameIndexController', function ($scope, FAFApi) {

  /* $scope functions */

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

    var renderGames = function(mode) {
        FAFApi.findGames($scope.playerOne, $scope.playerTwo, mode).success(function(games){
            $scope.games = games;
        });
    }

  /* Init */

  renderGames("none");

});

/* Util */

function isEmpty(str) {
    return (!str || 0 === str.length);
}
