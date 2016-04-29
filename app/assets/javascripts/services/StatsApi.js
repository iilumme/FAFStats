FAFStats.service('StatsApi', function ($http) {

    this.getUser = function() {
        return $http.get('/users/1.json');
    };

});