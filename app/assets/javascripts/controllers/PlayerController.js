FAFStats.controller('PlayerController', function ($scope, $routeParams, FAFApi, StatsApi, $rootScope) {

  $('.modal-trigger').leanModal();

  /* Variables */

  var playerID = $routeParams.id;

  /* Local functions */

  var renderPlayer = function(id) {
    FAFApi.findPlayer(id).success(function(player){
      $scope.player = player;
      renderGames();
      renderFactionChart();
      renderRatingEvolutionChart();
    });
  };

  var renderGames = function() {
    FAFApi.findPlayersGames($scope.player.data.attributes.login).success(function(games){
      $scope.games = games;
    });
  };

  /* Faction distribution chart */
  var renderFactionChart = function() {
    var data = {
      labels: ["UEF", "Cybran", "Aeon", "Seraphim"],
      datasets: [{
        data: [34, 82, 64, 12],
        backgroundColor: ["#1568B8", "#CC0000", "#1E7D1E", "#e5c100"],
        hoverBackgroundColor: ["#2c77bf", "#d63232", "#348a34", "#ffdb19"]
      }]
    };

    var options = {

    };

    var ctx = $("#factionChart");

    var factionChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });
  };

  /* Rating Evolution Chart */

  var renderRatingEvolutionChart = function() {

    StatsApi.getPlayersRatings(playerID).success(function(ratings){

      var data = {
        labels: getMonthLabels(),
        datasets: [
          {
            label: "Ladder Rating",
            fill: true,
            backgroundColor: "rgba(220,220,220,0.2)",
            borderColor: "rgba(220,220,220,1)",
            pointBorderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 15,
            pointHoverBackgroundColor: "rgba(220,220,220,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            data: getRatings(ratings)
          }
        ]
      };

      var options = {
        scales: {
          yAxes: [{
            ticks: {
              min: 500,
              max: 2500
            }
          }]
        }
      };

      var ctx = $("#ratingEvolutionChart");

      var ratingEvolutionChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      });
    });
  };

  var getRatings = function(ratings) {
    var rats = [];

    for(i = 0; i < 7; i++) {
      rats[i] = "";
    };

    var months = getMonths();

    ratings.forEach(function(rating) {
      for(i = 0; i < 7; i++) {
        if (rating.month == months[i] + 1) {
          rats[6-i] = rating.value;
          break;
        }
      }
    });

    return rats;
  };

  var getMonths = function() {

    var month = new Date().getMonth();
    var months = [month];

    for (i = 1; i < 7; i++) {
      var m = month;
      if (m - i >= 0) {
        months.push(m - i);
      } else {
        m = 12 + month;
        months.push(m-i);
      }
    }

    return months;

  };

  var getMonthLabels = function() {

    var months = getMonths();
    var labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    return [labels[months[6]], labels[months[5]], labels[months[4]],
      labels[months[3]], labels[months[2]], labels[months[1]], labels[months[0]]];
  };

  /* Init */

  $scope.$on('$viewContentLoaded', function() {
    if ($rootScope.user !== null && playerID == $rootScope.user.player_id) {
      $scope.user = $rootScope.user;
      renderPlayer($scope.user.player_id);
    } else if ($rootScope.user !== null && playerID !== $rootScope.user.player_id){
      $scope.user = null;
      renderPlayer(playerID);
    } else {
      $scope.user = null;
      renderPlayer(playerID);
    }
  });
});
