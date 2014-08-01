	module.exports = function(app) {

		// server routes ===========================================================

		// BackEnd Routes

		app.get('/api/torrent-search/login', function(req, res) {

			var torrentSearch = require('./torrentSearch.js');
			torrentSearch.torrentsSearch();

			res.send(200); // return torrent torrents-search test page
		});


		// route to handle creating (app.post)
		// route to handle delete (app.delete)

		// ============================ frontend routes =============================
    // load public/views/index.html file (angular will do the frontend routing)
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});

	};
