angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http) {

  var tracker = function() {
      this.name = '';
      this.login = '';
      this.password = '';
      this.isLoged = false;
  };


  this.login = function(tracker){
    //TODO: Test wisch tracker want connection
    tracker.name = 't411';

    var data = {'name' : tracker.name, 'login' : tracker.login, 'password' : tracker.password};
    console.log('DATA TO SEND: ' + data.name);

    //Send the login credentials to Backend TorrentsSearch
    $http.post("http://127.0.0.1:8080/api/torrent-search/login", data).
        success(function(data, status) {
            console.log('Sending credentials: Success ' + status);

            if(data.Connection){
              tracker.isLoged = 'true';
            }
            else{
              tracker.isLoged = 'false';
            }

            console.log('Connection success ? ->  ' + tracker.isLoged + ' ' + status);

        }).error(function(data, status) {
            console.log('Sending credentials: Error ' + status);
            tracker.isLoged = false;
        });
  };

});
