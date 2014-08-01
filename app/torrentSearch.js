var TorrentsSearch = require('torrents-search');
var fs = require('fs');

// Custom logger (not so custom yet)
var myLogger = {
  info: function(msg) {
    console.log(msg);
  },

  error: function(msg) {
    console.error(msg);
  }
};

var torrents = new TorrentsSearch({
  logger: myLogger, // Optional
  timeout: 100000 // Optional
});


exports.loginToTracker = function(tracker, login, password){
  console:log('Login to tracker ' + tracker);

  // Enable a tracker
  torrents.enableTracker(tracker);
  torrents.setCredentials(tracker, login, password);

  torrents.login(function(err){
    if(err){
      console.log('Error login to ' + tracker + ' With ' + login + ' login. Error: ' + err);
      return err;
    }
    return 'OK';
  });

}

exports.torrentsSearch = function(){
  torrents.loadTrackers(function(err) {
    if(err) { console.log(err); return; }

    // Display all loaded trackers
    console.log('Loaded trackers :', torrents.getTrackers());

    // // Enable a tracker
    // torrents.enableTracker('t411');
    // torrents.setCredentials('t411', 'USERNAME', 'PASSWORD');

    // Enable a tracker
    // torrents.enableTracker('FrenchTorrentDB');
    // torrents.setCredentials('FrenchTorrentDB', 'TI80', 'youpi2356');

    // // Enable a tracker
    // torrents.enableTracker('Smartorrent');
    // torrents.setCredentials('Smartorrent', 'USERNAME', 'PASSWORD');

    // Search torrents on all enabled trackers
    torrents.search('matrix la matrice', {type: 'movie', quality: 'dvdrip'}, function(err, torrentsFound) {
      if(err) { console.error(err); return; }

      console.log(torrentsFound.length +' torrent(s) found.');

      console.log('Downloading first torrent :');


      for (var indexTorrent in torrentsFound){
         console.log(torrentsFound[indexTorrent]);
      }


      torrents.download(torrentsFound[0], function(err, torrentFileBuffer) {
        if(err) { console.error(err); return; }

        fs.writeFile('torrent.torrent', torrentFileBuffer, function (err) {
          if (err) {
            throw err;
          }
            console.log('It\'s saved!');
          });

        console.log(torrentFileBuffer);
      });
    });
  });
}
