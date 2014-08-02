	module.exports = function(app) {

		// server routes ===========================================================

		// BackEnd Routes


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


		// route to handle creating (app.post)
		// route to handle delete (app.delete)

		// ============================ frontend routes =============================
    // load public/views/index.html file (angular will do the frontend routing)
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});

	};
