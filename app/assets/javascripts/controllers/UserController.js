FAFStats.controller('UserController', function ($scope, $rootScope, FAFApi) {

    $('.modal-trigger').leanModal();

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
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
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
                    data: [2236, 2256, 2278, 2280, 2295, 2309, 2324]
                }
            ]
        };

        var options = {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 500,
                        max: 3000
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
    };

    $scope.editModal = function () {

    }


    /* Init */

    $scope.$on('$viewContentLoaded', function() {
        $scope.user = $rootScope.user;
        renderPlayer($scope.user.player_id);
    });

});
