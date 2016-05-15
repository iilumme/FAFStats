FAFStats.controller('CommentsController', function ($scope, StatsApi, FAFApi) {
  $scope.comments = [];

  var getComments = function() {
    StatsApi.getAllComments().success(function(comments){
      $scope.comments = comments;
      for (var i = 0; i < $scope.comments.length; i++) {
        (function(i) {
          addUserAndPlayer($scope.comments[i].user_id, i);
          addGame($scope.comments[i].game_id, i);
        })(i);
      }
    });
  };

  var addUserAndPlayer = function(id, index) {
    StatsApi.getUserByUserID(id).success(function(user){
      $scope.comments[index].user = user;
      addPlayer($scope.comments[index].user.player_id, index);
    });
  };

  var addPlayer = function(id, index) {
    FAFApi.findPlayer(id).success(function(player) {
      $scope.comments[index].player = player;
    });
  };

  var addGame = function(id, index) {
    FAFApi.findGame(id).success(function(game) {
      $scope.comments[index].game = game;
    });
  };

  getComments();

});
