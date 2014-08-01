	module.exports = function(app) {

		// server routes ===========================================================

		// BackEnd Routes


		//Receive the credentials from frontEnd try to login
		app.post('/api/torrent-search/login', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');
			var credentials = req.body;

			//TODO: pass a callback method to wait for the login before send res status
			torrentSearch.loginToTracker(credentials.tracker,credentials.login,credentials.password);
			console.log(err);
			if(err){
				res.send(500);
			}
			else{
				res.send(200);
			}

		});

		//Send to the front end the enabled trackers (to test the login status)
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
