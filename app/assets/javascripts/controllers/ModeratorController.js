FAFStats.controller('ModeratorController', function($rootScope, $scope, StatsApi){

  StatsApi.getAllTags().success(function(tags) {
    $scope.tags = tags;
  });

  // Sends POST request to create a new tag
  $scope.newTag = function() {
    var tag = {name: $scope.tag_name, style: $scope.tag_style};

    StatsApi.postTag(tag).success(function() {
      //VIESTI
    }).error(function(){
      //viesti
    });
  };

  // Sends POST request to create a new tagged
  $scope.newTagged = function() {
    for (var i = 0; i < $scope.tagged_tags.length; i++) {
      var tagged = {tag_id: $scope.tagged_tags[i], player_id: $scope.tagged_player_id};
      StatsApi.postTagged(tagged).success(function() {
        //VIESTI
      }).error(function(){
        //viesti
      });
    }
  };

});