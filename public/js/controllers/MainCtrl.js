angular.module('MainCtrl', []).factory('search', function() {
	return;
})

/* -------------------- ---------- -------------------- */
/* -------------------- ---------- -------------------- */
/* -------------------- CONTROLLER -------------------- */
/* -------------------- ---------- -------------------- */
/* -------------------- ---------- -------------------- */

.controller('MainController', function($scope, $http, search) {

	//this.searchQuerry = '';


	this.search = function(searchQuerry){
		//Send the querry to back end api
		//console.log('search ': +  searchQuerry);
		var data = {'searchQuerry' : searchQuerry};
		$http.post("http://127.0.0.1:8080/api/torrent-search/search", data).
				success(function(data, status) {
					console.log('Respond ' + status);
					$scope.torrentsResult = data;
				}).error(function(data, status) {
					console.log('Something wrong happends ' + status);
				});
	};

	this.download = function(torrent){
		var data = {'torrent' : torrent};
		$http.post("http://127.0.0.1:8080/api/torrent-search/download", data).
				success(function(data, status) {
					console.log('Respond ' + status);
					torrent.isDownloaded = true;
				}).error(function(data, status) {
					console.log('Something wrong happends ' + status);
				});
	};

	this.luckySearch = function(searchQuerry){

	};



});
