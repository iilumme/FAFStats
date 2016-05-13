FAFStats.controller('GameController', function ($scope, $http, $routeParams, $rootScope, FAFApi, StatsApi) {

  $scope.gameid = $routeParams.id;
  $scope.players = new Array();
  $scope.comments = new Array();
  if ($rootScope.user !== null) {
    $scope.newComment = {
      content: "",
      game_id: $scope.gameid
    };
  }

  var renderGame = function(id) {
    FAFApi.findGame(id).success(function(gamedata){
      $scope.game = gamedata.data[0].attributes;
      $scope.start_time = new Date($scope.game.start_time).toString();
      if ($scope.game.players[0].score_time === null) {
        $scope.game_length = -1;
      } else {
        $scope.game_length = Math.floor((new Date($scope.game.players[0].score_time)
        - new Date($scope.game.start_time)) / (1000*60));
      }

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

  var getComments = function(gameid) {
    StatsApi.getComments(gameid).success(function(comments) {
      $scope.comments = comments;
    });
  }

  $scope.sendComment = function() {
    StatsApi.postComment($scope.newComment);
  }

  renderGame($scope.gameid);
  getComments($scope.gameid);
});
