	module.exports = function(app) {

// ============================ BackEnd routes =============================

	// ============================ LOGIN =============================
		//Receive the credentials from frontEnd try to login
		app.post('/api/torrent-search/login', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');
			var credentials = req.body;
			console.log('DATA RECEIVE name: ' + credentials.name + ' login: ' + credentials.login + ' password: ' + credentials.password);

			torrentSearch.loginToTracker(credentials.name,credentials.login,credentials.password, function(err){
				var data;
				if(err){
					data = {'Connection' : false, 'err' : err};
					res.send();
				}
				else{
					data = {'Connection' : true, 'err' : null};
					res.send(200, data);
				}
			});
		});

		//Send to the front end the loged trackers
		app.get('/api/torrent-search/login', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');
			var trackers = torrentSearch.getEnabledTrackers();
			res.send(trackers);

		});

	// ============================ SEARCH =============================


		app.post('/api/torrent-search/search', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');

			console.log('Receiving search querry... ' + req.body.searchQuerry)
			torrentSearch.torrentsSearch(req.body.searchQuerry, function(result){
				console.log(result);
				res.send(200, result);
			});
		});

	// ============================ DOWNLOAD =============================


		app.post('/api/torrent-search/download', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');

			console.log('Receiving download querry... ' + req.body.torrent.title)
			torrentSearch.torrentDownload(req.body.torrent, function(err, filePath){
				if(err){
					console.log('RESPOND 500');
					res.send(500);
				}
				console.log('RESPOND 200');
				res.send(200, filePath);
			});
		});



	// ============================ =============== =============================
	// ============================ frontend routes =============================
	// ============================ =============== =============================

    // angular will do the frontend routing
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});

	};
