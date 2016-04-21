FAFStats.controller('PlayerController', function ($scope, $http, $routeParams) {

  /* Variables */

  var playerID = $routeParams.id;

  /* Local functions */

  var findPlayer = function(id){
    return $http.get('http://api.faforever.com/ranked1v1/' + id);
  }

  var renderPlayer = function(id) {
    findPlayer(id).success(function(player){
      $scope.player = player;
    });
  }

  /* Init */

  $scope.$on('$viewContentLoaded', function() {
    renderPlayer(playerID);
  });

});
