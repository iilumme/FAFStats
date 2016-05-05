FAFStats.service('StatsApi', function ($http) {

  /* GET */

  this.getUserForPlayer = function(player_id) {
    return $http.get('/users/player/' + player_id + '.json');
  };

  this.getPlayersRatings = function(player_id) {
    return $http.get('/ratings/player/' + player_id + '.json')
  };

  this.getPlayersTags = function(player_id) {
    return $http.get('/taggeds/player/' + player_id + '.json');
  };

});