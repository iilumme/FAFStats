FAFStats.controller('LeaderboardsController', function ($scope, $http) {

  /* Variables */

  var currentPage = 0;

  /* Local functions */

  var getPage = function(pageNumber, pageSize) {
    return $http.get("http://api.faforever.com/ranked1v1?page[size]=" + pageSize + "&page[number]=" + pageNumber + "&filter[is_active]=true");
  }

  var renderPage = function() {
    getPage(currentPage + 1, 50).success(function(page){
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
  }

  $scope.nextPage = function() {
    console.log("asd");
    if (currentPage === 100) {
      return;
    } else {
      currentPage++;
      renderPage();
    }
  }

  /* Init */
  $scope.$on('$viewContentLoaded', function() {
    renderPage();
  });

});
