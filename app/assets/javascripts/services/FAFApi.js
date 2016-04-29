FAFStats.service('FAFApi', function ($http) {

     this.findGames = function (playerOne, playerTwo, mode) {
        if (mode === "1p") {
            return $http.get("http://api.faforever.com/games?filter[players]=" + playerOne + "&filter[mod]=ladder1v1&page[size]=50");
        } else if (mode === "1p_2") {
            return $http.get("http://api.faforever.com/games?filter[players]=" + playerTwo + "&filter[mod]=ladder1v1&page[size]=50");
        } else if (mode === "2p") {
            return $http.get("http://api.faforever.com/games?filter[players]=" + playerOne + "," + playerTwo + "&filter[mod]=ladder1v1&page[size]=50");
        } else {
            return $http.get("http://api.faforever.com/games?filter[mod]=ladder1v1&page[size]=50");
        }
    }

    this.findPlayer = function(id){
        return $http.get('http://api.faforever.com/ranked1v1/' + id);
    }

    this.findPlayersGames = function(login){
        return $http.get("http://api.faforever.com/games?filter[players]=" + login + "&filter[mod]=ladder1v1&page[size]=10");
    }

    this.getPage = function(pageNumber, pageSize) {
        return $http.get("http://api.faforever.com/ranked1v1?page[size]=" + pageSize + "&page[number]=" + pageNumber + "&filter[is_active]=true");
    }

});