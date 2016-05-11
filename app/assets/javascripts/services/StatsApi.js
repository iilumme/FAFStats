FAFStats.service('StatsApi', function ($http) {

  this.getUserForPlayer = function(player_id) {
    return $http.get('/users/player/' + player_id + '.json');
  }

  // Returns the user in the session OR id:0, player_id:0
  this.getUserInSession = function() {
    return $http.get('/sessions/current_user.json')
  }

  this.getPlayersRatings = function(player_id) {
    return $http.get('/ratings/player/' + player_id + '.json')
  };

  this.getPlayersTags = function(player_id) {
    return $http.get('/taggeds/player/' + player_id + '.json');
  };

  this.register = function(user) {
    return $http.post('/register', user);
  };

});
