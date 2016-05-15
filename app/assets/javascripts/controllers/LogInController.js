FAFStats.controller('LogInController', function($scope, StatsApi, FAFApi, $location) {

  $scope.invalidID = false;
  $scope.error = false;
  $scope.invalidLogin = false;

  $scope.register = function() {

    FAFApi.findPlayer($scope.player_id).success(function() {
      var user = {"player_id": $scope.player_id}

      StatsApi.register(user).success(function() {
        $location.path('login');
        Materialize.toast('Registering was successful', 4000);
      }).error(function() {
        Materialize.toast('An error happened, please try again!', 4000);
        $scope.error = true;
      });

    }).error(function() {
      $scope.invalidID = true;
    });
  }

  $scope.login = function() {
    var user = {"player_id": $scope.login.player_id}
    StatsApi.login(user).success(function(user) {
      $location.path('player/'+ user.player_id);
      window.location.reload();
      Materialize.toast('Welcome', 4000);
    }).error(function() {
      $scope.invalidLogin = true;
    });
  }

});