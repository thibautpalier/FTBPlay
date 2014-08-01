angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http) {

  this.isLogin = false;


  this.login = function(tracker, login, password){

    var data = {'tracker' : tracker, 'login' : login, 'password' : password};

    //Send the login credentials to Backend TorrentsSearch
    $http.post("http://127.0.0.1:8080/api/torrent-search/login", data).
        success(function(data, status) {
            console.log('Sending credentials: Success');
            //Load the enabled trackers list from backend torrent-search and look if our desired tracker is connected
            $http.get("http://127.0.0.1:8080/api/torrent-search/login").
              success(function(data, status) {
                var trackers = data.body;

                //Browse all the enabled trackers and look if our tracker is ON
                for (var indexTracker in trackers){
                   if(trackers[indexTracker] == tracker){
                     this.isLogin = true;
                     console.log('Connected to ' + trackers[indexTracker])
                     return true;
                   }
                }

                //Our tracker is not present Login FAILED
                this.isLogin = false;
                console.log('Not Connected to ' + tracker)
                return false;

              }).error(function(data, status) {
                console.log('ERROR ' + status);
              });
        }).error(function(data, status) {
            console.log('Sending credentials: Error');
            return false;
        });

  };

});
