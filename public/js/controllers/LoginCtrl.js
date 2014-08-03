angular.module('LoginCtrl', [])
.factory('Trackers', function() {

    var trackers = [];

    var trackerName = [
      'FrenchTorrentDB',
      't411',
      'Smartorrent'
    ];

    function getTracker(name){
      var tracker = {
          name : '',
          login : '',
          password : '',
          isLogged : false,
          isDownloaded : false
      };

      tracker.name = name;

      return tracker;
    }


    for (i = 0; i < trackerName.length; i++) {
      trackers.push(getTracker(trackerName[i]));
    }

    return trackers;
})

/* -------------------- ---------- -------------------- */
/* -------------------- ---------- -------------------- */
/* -------------------- CONTROLLER -------------------- */
/* -------------------- ---------- -------------------- */
/* -------------------- ---------- -------------------- */

.controller('LoginController', function($scope, $http, Trackers) {

  this.trackers = Trackers;
  console.log(this.trackers);

  this.login = function(tracker){
    //TODO: Test wisch tracker want connection

    console.log(tracker);
    var data = {'name' : tracker.name, 'login' : tracker.login, 'password' : tracker.password};
    console.log('DATA TO SEND: ' + data.name);

    //Send the login credentials to Backend TorrentsSearch
    $http.post("http://127.0.0.1:8080/api/torrent-search/login", data).
      success(function(data, status) {
          console.log('Sending credentials: Success ' + status);

          if(data.Connection){
            tracker.isLogged = 'true';
          }
          else{
            tracker.isLogged = 'false';
          }

          console.log('Connection success ? ->  ' + tracker.isLogged + ' ' + status);

      }).error(function(data, status) {
          console.log('Sending credentials: Error ' + status);
          tracker.isLoged = false;
      });
  };

});
