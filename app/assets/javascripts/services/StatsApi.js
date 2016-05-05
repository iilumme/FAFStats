FAFStats.service('StatsApi', function ($http) {

  /* GET */

  this.getUserForPlayer = function(player_id) {
    return $http.get('/users/player/' + player_id + '.json');
  }

  this.getSession = function() {
    return $http.get('/users/1.json');
    //return $http.get('/sessions/current_user')
  }

  this.getPlayersRatings = function(player_id) {
    return $http.get('/ratings/player/' + player_id + '.json')
  };

  this.getPlayersTags = function(player_id) {
    return $http.get('/taggeds/player/' + player_id + '.json');
  };

});
