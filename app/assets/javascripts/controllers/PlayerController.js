FAFStats.controller('PlayerController', function ($scope, $routeParams, FAFApi, StatsApi, $rootScope, Upload, ChartService) {

  $('.modal-trigger').leanModal();

  /* Variables */
  var playerID = $routeParams.id;
  $scope.session_playerid = null;
  if ($rootScope.user !== null) {
    $scope.session_playerid = $rootScope.user.player_id;
  }

  // Finds the player with their stats and adds all the information to $scope
  var renderPlayer = function() {
    FAFApi.findPlayer(playerID).success(function(player){
      $scope.player = player;
      renderGames();
      renderTags();
      ChartService.renderFactionChart();
      ChartService.renderRatingEvolutionChart(playerID);
    });
  };

  // Finds player's games
  var renderGames = function() {
    FAFApi.findPlayersGames($scope.player.data.attributes.login).success(function(games){
      $scope.games = games;
    });
  };

  // Finds player's tags
  var renderTags = function() {
    StatsApi.getPlayersTags($scope.player.data.attributes.id).success(function(tags){
      $scope.tags = tags;
    });
  };

  // Finds the user for player if user exists
  var renderUser = function(id) {
    StatsApi.getUserForPlayer(playerID).success(function(user){
      if (user === '') {
        $scope.user = {player_id: '0',description: "This player has not written a description"};
      } else {
        $scope.user = user;
      }
    });
  };

  // Sends POST request to update user info
  $scope.updateProfile = function() {
    var image = $scope.image;
    $scope.upload = Upload.upload({
      url: 'users/update',
      method: 'POST',
      file: image,
      fileFormDataName: 'user[image]',
      fields: { 'id': $rootScope.user.id, 'user[description]': $scope.description, 'user[image]': image }
    });
  };

  /* Init */
  $scope.$on('$viewContentLoaded', function() {
    renderUser();
    renderPlayer();
  });
});
