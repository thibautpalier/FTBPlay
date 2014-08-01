	module.exports = function(app) {

		// server routes ===========================================================

		// BackEnd Routes

		app.post('/api/torrent-search/login', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');
			var credentials = req.body;
			var err = torrentSearch.loginToTracker(credentials.tracker,credentials.login,credentials.password);
			if(err){
				res.send(500);
			}
			res.send(200);

		});


		// route to handle creating (app.post)
		// route to handle delete (app.delete)

		// ============================ frontend routes =============================
    // load public/views/index.html file (angular will do the frontend routing)
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});

	};
