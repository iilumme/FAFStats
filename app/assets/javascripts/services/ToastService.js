FAFStats.service('ToastService', function() {

  var toasts = [];
  toasts['newComment'] = 'Your comment has been submitted!';
  toasts['deleteComment'] = 'Your comment has been deleted!';
  toasts['newStarRating'] = 'Your star rating has been submitted!';
  toasts['loginSuccessful'] = 'Registering was successful';
  toasts['welcome'] = 'Welcome!';
  toasts['taggingSuccessful'] = 'Tagging was successful!';
  toasts['hasTagAlready'] = 'Player already has this tag!';
  toasts['firstPageAlready'] = 'Already on the first page';
  toasts['logout'] = 'Logged out';

  this.errorMessage = function() {
    Materialize.toast('An error happened, please try again!', 4000);
  };

  this.getMessage = function(parameter) {
    Materialize.toast(toasts[parameter], 4000);
  };

});