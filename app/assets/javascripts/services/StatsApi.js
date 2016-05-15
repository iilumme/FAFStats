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

  this.getUserByUserID = function(user_id) {
    return $http.get('/users/' + user_id + '.json');
  };


  /* For a game/replay */

  this.getGame = function(game_id) {
    return $http.get('/games/' + game_id + '.json');
  };

  this.getStarsOfCurrentUser = function(game_id) {
    return $http.get('/star_ratings/current_user/' + game_id + '.json');
  };

  this.getComments = function(game_id) {
    return $http.get('/comments/' + game_id + '.json');
  };

  this.getAllComments = function() {
    return $http.get('/comments');
  }

  this.postComment = function(comment) {
    return $http.post('/comments', comment);
  };

  this.deleteComment = function(id) {
    return $http.delete('/comments/' + id);
  };


  /* comments */

  this.getAllComments = function() {
    return $http.get('/comments.json');
  };


  /* For tags */

  this.getAllTags = function() {
    return $http.get('/tags.json');
  };

  this.postTag = function(tag) {
    return $http.post('/tags', tag);
  };

  /* For taggeds */

  this.postTagged = function(tagged) {
    return $http.post('/taggeds', tagged);
  };

  /* For star ratings */

  this.postStars = function(star_rating) {
    return $http.post('/star_ratings', star_rating);
  };

  /* Games path */

  this.getAllGames = function() {
    return $http.get('/games.json');
  }

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
    return $http.get('/sessions/current_user.json');
  };

});
