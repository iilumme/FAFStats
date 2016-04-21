FAFStats.controller('PlayerController', function ($scope, $http) {

     var findPlayer = function(id){
        return $http.get('http://api.faforever.com/ranked1v1/' + id);
    }

    var findPlayers = function(){
        return $http.get('http://api.faforever.com/ranked1v1');
    }

    findPlayer('40063').success(function(player){
        $scope.player = player;
    });

    findPlayers().success(function(players){
        $scope.players = players.data;
    });

});