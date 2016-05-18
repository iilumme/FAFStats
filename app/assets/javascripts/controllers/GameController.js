FAFStats.controller('GameController', function ($scope, $routeParams, $rootScope, FAFApi, StatsApi) {

  /* Variables */
  $scope.gameid = $routeParams.id;
  $scope.players = [];
  $scope.comments = [];
  $scope.commenters = [];
  $scope.stars = {};
  $scope.current_user_stars = 0;

  if ($rootScope.session_user !== null) {
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
      $scope.players = [];

      for (var i = 0; i < $scope.game.players.length; i++) {
        getPlayer($scope.game.players[i].player_id);
      }

      getStars();
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
      for (var i = 0; i < $scope.comments.length; i++) {
        $scope.addCommenter(comments[i].player_id);
      }
    });
  };

  $scope.sendComment = function() {
    StatsApi.postComment($scope.newComment).success(function() {
      Materialize.toast('Your comment has been submitted!', 4000);
      getComments();
      $("#commentform").val("");
    }).error(function() {
      Materialize.toast('An error happened, please try again!', 4000);
    });
  };

  $scope.deleteComment = function(id) {
    StatsApi.deleteComment(id).success(function() {
      Materialize.toast('Your comment has been deleted!', 4000);
      getComments();
    }).error(function() {
      Materialize.toast('An error happened, please try again!', 4000);
    });
  }

  var getStars = function() {
    StatsApi.getGame($scope.gameid).success(function(game){
      if (game !== '') {
        $scope.star_rating = game;
        $scope.yellowStars = [];
        for (var i = 0; i < game.average_of_star_ratings; i++) {
          $scope.yellowStars.push(i);
        }
        $scope.greyStars = [];
        for (var j = 0; j < 5 - game.average_of_star_ratings; j++) {
          $scope.greyStars.push(j);
        }
      } else {
        $scope.greyStars = [];
        for (var k = 0; k < 5; k++) {
          $scope.greyStars.push(k);
        }
      }
      StatsApi.getStarsOfCurrentUser($scope.gameid).success(function(stars){
        $scope.current_user_stars = stars.stars;
        clearStars();
        addDefaultStars();
      });
    });
  };

  /* Utility functions for "rate this replay" ui */

  var clearStars = function() {
    for (var i = 0; i < 5; i++) {
      $("#star"+(i+1)).removeClass("yellow-text");
    }
  }

  var addDefaultStars = function() {
    var user_given_stars = $scope.current_user_stars;
    for (var i = 0; i < user_given_stars; i++) {
      $("#star"+(i+1)).addClass("yellow-text");
    }
  }

  /* */

  $scope.giveStars = function(amount) {
    var star_rating = {stars: amount, game_id: $scope.gameid}
    StatsApi.postStars(star_rating).success(function() {
      Materialize.toast('Your star rating has been submitted!', 4000);
      renderGame();
    }).error(function(){
      Materialize.toast('An error happened, please try again!', 4000);
    });
  };

  $scope.addCommenter = function(id) {
    FAFApi.findPlayer(id).success(function(player) {
      var index = $scope.commenters.push(player) - 1;
      $scope.addUser(id, index);
    });
  }

  $scope.addUser = function(id, commenterIndex) {
    StatsApi.getUserForPlayer(id).success(function(user){
      $scope.commenters[commenterIndex].user = user;
    });
  };

  /* Init */
  renderGame();
  getComments();

  /* Rate this replay */

  for (var i = 0; i < 5; i++) {
    (function(i) {
      $("#star"+(i+1)).hover(function() {
        clearStars();
        for (var j = 0; j < i+1; j++) {
          $("#star"+(j+1)).addClass("yellow-text");
        }
      }, function() {
        clearStars();
        addDefaultStars();
      });
    })(i);
  }

});
