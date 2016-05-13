FAFStats.service('ChartService', function(StatsApi) {

  /* Faction distribution chart */
  this.renderFactionChart = function() {
    var data = {
      labels: ["UEF", "Cybran", "Aeon", "Seraphim"],
      datasets: [{
        data: [1, 1, 1, 1],
        backgroundColor: ["#1568B8", "#CC0000", "#1E7D1E", "#e5c100"],
        hoverBackgroundColor: ["#2c77bf", "#d63232", "#348a34", "#ffdb19"]
      }]
    };

    var options = {};
    var ctx = $("#factionChart");

    var factionChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });
  };

  /* Rating Evolution Chart */
  this.renderRatingEvolutionChart = function(playerID) {
    StatsApi.getPlayersRatings(playerID).success(function(ratings){

      var ratingData = getRatings(ratings);

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
            data: ratingData
          }
        ]
      };

      var options = {
        scales: {
          yAxes: [{
            ticks: {
              min: Math.min.apply(Math, ratingData) - 100,
              max: Math.max.apply(Math, ratingData) + 100
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

  // Returns the rating values in descending order
  var getRatings = function(ratings) {
    var rats = [];

    for(i = 0; i < 7; i++) {
      rats[i] = "";
    }

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

  // Returns past 7 months including the current month
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

  // Returns the month labels for Rating Evolution Chart
  var getMonthLabels = function() {
    var months = getMonths();
    var labels = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];

    return [labels[months[6]], labels[months[5]], labels[months[4]],
      labels[months[3]], labels[months[2]], labels[months[1]], labels[months[0]]];
  };


});
