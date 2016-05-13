FAFStats.controller('GameController', function ($scope, $routeParams, $rootScope, FAFApi, StatsApi) {

  /* Variables */
  $scope.gameid = $routeParams.id;
  $scope.players = [];
  $scope.comments = [];

  if ($rootScope.user !== null) {
    $scope.newComment = {
      content: "",
      game_id: $scope.gameid
    };
  }

  // Finds the game from FAF API and adds it to $scope
  var renderGame = function() {
    FAFApi.findGame($scope.gameid).success(function(gamedata){
      $scope.game = gamedata.data[0].attributes;
      $scope.start_time = new Date($scope.game.start_time).toString();
      $scope.game_length = gameLength();

      for (var i = 0; i < $scope.game.players.length; i++) {
        getPlayer($scope.game.players[i].player_id);
      }
    });
  };

  // Change the format of game length
  var gameLength = function() {
    if ($scope.game.players[0].score_time === null) {
      return -1;
    } else {
      return Math.floor((new Date($scope.game.players[0].score_time)
        - new Date($scope.game.start_time)) / (1000*60));
    }
  };

  var getPlayer = function(id) {
    FAFApi.findPlayer(id).success(function(player){
      $scope.players.push(player);
    });
  };

  var getComments = function() {
    StatsApi.getComments($scope.gameid).success(function(comments) {
      $scope.comments = comments;
    });
  };

  $scope.sendComment = function() {
    StatsApi.postComment($scope.newComment);
  };

  $scope.giveStars = function(amount) {
    console.log("Gave " + amount + " stars!");
  };

  /* Init */
  renderGame();
  getComments();

  /* Triggers */
  $("#star1").hover(function() {
    $(this).addClass("yellow-text");
  }, function() {
    $(this).removeClass("yellow-text");
  });
  $("#star2").hover(function() {
    $("#star1").addClass("yellow-text");
    $(this).addClass("yellow-text");
  }, function() {
    $("#star1").removeClass("yellow-text");
    $(this).removeClass("yellow-text");
  });
  $("#star3").hover(function() {
    $("#star1").addClass("yellow-text");
    $("#star2").addClass("yellow-text");
    $(this).addClass("yellow-text");
  }, function() {
    $("#star1").removeClass("yellow-text");
    $("#star2").removeClass("yellow-text");
    $(this).removeClass("yellow-text");
  });
  $("#star4").hover(function() {
    $("#star1").addClass("yellow-text");
    $("#star2").addClass("yellow-text");
    $("#star3").addClass("yellow-text");
    $(this).addClass("yellow-text");
  }, function() {
    $("#star1").removeClass("yellow-text");
    $("#star2").removeClass("yellow-text");
    $("#star3").removeClass("yellow-text");
    $(this).removeClass("yellow-text");
  });
  $("#star5").hover(function() {
    $("#star1").addClass("yellow-text");
    $("#star2").addClass("yellow-text");
    $("#star3").addClass("yellow-text");
    $("#star4").addClass("yellow-text");
    $(this).addClass("yellow-text");
  }, function() {
    $("#star1").removeClass("yellow-text");
    $("#star2").removeClass("yellow-text");
    $("#star3").removeClass("yellow-text");
    $("#star4").removeClass("yellow-text");
    $(this).removeClass("yellow-text");
  });
});
