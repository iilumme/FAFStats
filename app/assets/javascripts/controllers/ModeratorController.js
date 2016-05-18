FAFStats.controller('ModeratorController', function($rootScope, $scope, StatsApi, ToastService){

  // Gets all tags from StatsApi
  var getAllTags = function() {
    StatsApi.getAllTags().success(function(tags) {
      $scope.tags = tags;
      $scope.update_tags = tags;
    });
  };

  // Sends POST request to create a new tag
  $scope.newTag = function() {
    var tag = {name: $scope.tag_name, style: $scope.tag_style};

    StatsApi.postTag(tag).success(function() {
      Materialize.toast('New tag created!', 4000);
      getAllTags();
    }).error(function(){
      ToastService.errorMessage();
    });
  };

  // Sends POST request to create a new tagged
  $scope.newTagged = function() {
    for (var i = 0; i < $scope.tagged_tags.length; i++) {
      var tagged = {tag_id: $scope.tagged_tags[i], player_id: $scope.tagged_player_id};
      StatsApi.postTagged(tagged)
        .then(function successCallback(response){
          ToastService.getMessage('taggingSuccessful');
        },
          function errorCallback(response){
            if (response.status === 400) {
              ToastService.getMessage('hasTagAlready');
            } else {
              ToastService.errorMessage();
            }
        });
    }
  };

  /* Init */
  getAllTags();
  console.log($scope.tag_to_update)
});