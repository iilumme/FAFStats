FAFStats.controller('GameController', function ($scope, $http, $routeParams, FAFApi) {

  $scope.gameid = $routeParams.id;
  $scope.players = new Array();

  var renderGame = function(id) {
    FAFApi.findGame(id).success(function(gamedata){
      $scope.game = gamedata.data[0].attributes;
      $scope.start_time = new Date($scope.game.start_time).toString();
      $scope.game_length = Math.floor((new Date($scope.game.players[0].score_time)
      - new Date($scope.game.start_time)) / (1000*60));

      for (var i = 0; i < $scope.game.players.length; i++) {
        getPlayer($scope.game.players[i].player_id);
      }

    });
  }

  var getPlayer = function(id) {
    FAFApi.findPlayer(id).success(function(player){
      $scope.players.push(player);
    });
  }

  renderGame($scope.gameid);
});
