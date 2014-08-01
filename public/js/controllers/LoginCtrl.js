angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http) {

  this.login = function(){

    //Send the ligin credentials to Backen TorrentsSearch
    var data = {'tracker' : 'FrenchTorrentDB', 'login' : 'TI80', 'password' : 'youpi2356'};
    $http.post("http://127.0.0.1:8080/api/torrent-search/login", data).
        success(function(data, status) {
            console.log('Sending credentials: Success');
        }).error(function(data, status) {
            console.log('Sending credentials: Error');
        });

  };

});
