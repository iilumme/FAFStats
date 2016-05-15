FAFStats.service('FAFApi', function ($http) {

  /* Players */

  this.findPlayer = function(id){
    return $http.get('http://api.faforever.com/ranked1v1/' + id);
  };

  this.getAllPlayers = function() {
    return $http.get('http://api.faforever.com/ranked1v1');
  };

  this.searchForPlayersByName = function(name) {
    return $http.get('http://api.faforever.com/ranked1v1?filter[player]=' + name)
  };

  /* Games */

  this.findGame = function(id) {
    return $http.get("http://api.faforever.com/games/" + id);
  };

  this.findGames = function (playerOne, playerTwo, map) {
    var q = "http://api.faforever.com/games?filter[mod]=ladder1v1&filter[rating_type]=ladder1v1&page[size]=50";
    if (playerOne) {
      q = q.concat("&filter[players]="+playerOne);
    }
    if (playerTwo) {
      q = q.concat("&filter[players]="+playerTwo);
    }
    if (playerOne && playerTwo) {
      q = q.concat("&filter[players]="+playerOne+","+playerTwo);
    }
    if (map) {
      q = q.concat("&filter[map_name]="+map)
    }
    return $http.get(q);
  };


  this.findPlayersGames = function(login, pageNumber){
    return $http.get("http://api.faforever.com/games?filter[players]=" + login + "&filter[mod]=ladder1v1&page[size]=20&page[number]=" + pageNumber);
  };

  /* Leaderboards */

  this.getPage = function(pageNumber, pageSize) {
    return $http.get("http://api.faforever.com/ranked1v1?page[size]=" + pageSize + "&page[number]=" + pageNumber + "&filter[is_active]=true");
  };

});
