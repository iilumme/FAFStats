FAFStats.controller('ModeratorController', function($rootScope, $scope, StatsApi){

  // Gets all tags from StatsApi
  var getAllTags = function() {
    StatsApi.getAllTags().success(function(tags) {
      $scope.tags = tags;
    });
  };

  // Sends POST request to create a new tag
  $scope.newTag = function() {
    var tag = {name: $scope.tag_name, style: $scope.tag_style};

    StatsApi.postTag(tag).success(function() {
      Materialize.toast('New tag created!', 4000);
      getAllTags();
    }).error(function(){
      Materialize.toast('An error happened, please try again!', 4000);
    });
  };

  // Sends POST request to create a new tagged
  $scope.newTagged = function() {
    for (var i = 0; i < $scope.tagged_tags.length; i++) {
      var tagged = {tag_id: $scope.tagged_tags[i], player_id: $scope.tagged_player_id};
      StatsApi.postTagged(tagged)
        .then(function successCallback(response){
          Materialize.toast('Tagging was successful!', 4000);
        },
          function errorCallback(response){
            if (response.status === 400) {
              Materialize.toast('Player already has this tag!', 4000);
            } else {
              Materialize.toast('An error happened, please try again!', 4000);
            }
        });
    }
  };

  /* Init */
  getAllTags();

});