FAFStats.controller('LeaderboardsController', function ($scope, FAFApi) {

  /* Variables */

  var currentPage = 0;

  var renderPage = function() {
    FAFApi.getPage(currentPage + 1, 50).success(function(page){
    $scope.page = page;
    });
  };

  /* $scope functions */

  $scope.prevPage = function() {
    if (currentPage === 0) {
      return;
    } else {
      currentPage--;
      renderPage();
    }
  };

  $scope.nextPage = function() {
    if (currentPage === 100) {
      return;
    } else {
      currentPage++;
      renderPage();
    }
  };

  /* Init */
  $scope.$on('$viewContentLoaded', function() {
    renderPage();
  });

});
