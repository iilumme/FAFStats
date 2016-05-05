FAFStats.service('StatsApi', function ($http) {

  this.getUser = function() {
    return $http.get('/users/1.json');
  };

  this.getPlayersRatings = function(player_id) {
    return $http.get('/ratings/player/' + player_id + '.json')
  };

  this.getPlayersTags = function(player_id) {
    return $http.get('/taggeds/player/' + player_id + '.json');
  };

});