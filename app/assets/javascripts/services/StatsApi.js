FAFStats.service('StatsApi', function ($http) {

  this.getUserForPlayer = function(player_id) {
    return $http.get('/users/player/' + player_id + '.json');
  };

  // Returns the user in the session
  this.getUserInSession = function() {
    return $http.get('/sessions/current_user.json')
  };

  this.getPlayersRatings = function(player_id) {
    return $http.get('/ratings/player/' + player_id + '.json')
  };

  this.getPlayersTags = function(player_id) {
    return $http.get('/taggeds/player/' + player_id + '.json');
  };

  this.register = function(user) {
    return $http.post('/register', user);
  };

  this.login = function(user) {
    return $http.post('/login.json', user);
  };

  this.logout = function() {
    return $http.get('/logout');
  };

  this.getComments = function(gameid) {
    return $http.get('/comments/' + gameid + '.json');
  };

  this.postComment = function(comment) {
    return $http.post('/comments', comment);
  };

});
