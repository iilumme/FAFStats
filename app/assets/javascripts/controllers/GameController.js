FAFStats.controller('GameController', function ($scope, $http, $routeParams, FAFApi) {

  $scope.gameid = $routeParams.id;

  var renderGame = function(id) {
    FAFApi.getGame(id).success(function(gamedata){
      $scope.game = gamedata.data[0].attributes;
      $scope.start_time = new Date($scope.game.start_time).toString();
      console.log();
      $scope.game_length = Math.floor((new Date($scope.game.players[0].score_time)
      - new Date($scope.game.start_time)) / (1000*60));
    });
  }

  renderGame($scope.gameid);
});
