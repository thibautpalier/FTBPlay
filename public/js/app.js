var myApp = angular.module('FTDBPlay', ['ngRoute', 'appRoutes', 'MainCtrl', 'LoginCtrl']);

myApp.factory('Trackers', function() {

    var trackers = [];

    var trackerName = [
      'FrenchTorrentDB',
      't411',
      'Smartorrent'
    ];

    function g(name){
      var tracker = {
          name : '',
          login : '',
          password : '',
          isLogged : false
      };

      tracker.name = name;

      return tracker;
    }


    for (i = 0; i < trackerName.length; i++) {
      trackers.push(g(trackerName[i]));
    }

    console.log(trackers);

    return trackers;
});
