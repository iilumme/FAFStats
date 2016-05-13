FAFStats.controller('LeaderboardsController', function ($scope, FAFApi) {

  /* Variables */
  var currentPage = 0;

  // Finds a leaderboard page and adds it to $scope
  var renderPage = function() {
    FAFApi.getPage(currentPage + 1, 50).success(function(page){
      $scope.page = page;
    });
  };

  // Renders the previous leaderboard page
  $scope.prevPage = function() {
    if (currentPage === 0) {
      return;
    } else {
      currentPage--;
      renderPage();
    }
  };

  // Renders the next leaderboard page
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
