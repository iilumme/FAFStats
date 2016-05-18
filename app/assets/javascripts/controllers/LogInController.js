FAFStats.controller('LogInController', function($scope, StatsApi, FAFApi, $location, ToastService) {

  $scope.invalidID = false;
  $scope.error = false;
  $scope.invalidLogin = false;

  $scope.register = function() {

    FAFApi.findPlayer($scope.player_id).success(function() {
      var user = {"player_id": $scope.player_id}

      StatsApi.register(user).success(function() {
        $location.path('login');
        ToastService.getMessage('loginSuccessful');
      }).error(function() {
        ToastService.errorMessage();
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
      ToastService.getMessage('welcome');
    }).error(function() {
      $scope.invalidLogin = true;
    });
  }

});