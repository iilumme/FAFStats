FAFStats.service('StatsApi', function ($http) {

  /* For a player */

  // Returns player's ratings for past 7 months
  this.getPlayersRatings = function(player_id) {
    return $http.get('/ratings/player/' + player_id + '.json')
  };

  this.getPlayersTags = function(player_id) {
    return $http.get('/taggeds/player/' + player_id + '.json');
  };

  // Returns the user for a player if user exists
  this.getUserForPlayer = function(player_id) {
    return $http.get('/users/player/' + player_id + '.json');
  };


  /* Session */

  this.register = function(user) {
    return $http.post('/register', user);
  };

  this.login = function(user) {
    return $http.post('/login.json', user);
  };

  this.logout = function() {
    return $http.get('/logout');
  };

  // Returns the user in the session if there is one
  this.getUserInSession = function() {
    return $http.get('/sessions/current_user.json')
  };

});
