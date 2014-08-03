var TorrentsSearch = require('torrents-search');

var fs = require('fs');
var path = require('path');

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


exports.loginToTracker = function(tracker, login, password, callBack){
  torrents.loadTrackers(function(err) {
    if(err) {
      console.log(err); return;
    }
    console.log('Login to tracker ' + tracker);

    // Enable a tracker
    torrents.enableTracker(tracker);
    torrents.setCredentials(tracker, login, password);

    torrents.login(function(err){
      if(err){
        console.log('Error login to ' + tracker + ' with login' + login + ' . Error: ' + err);
        callBack(err);
      }
      callBack(err);
    });
  });
};


exports.torrentsSearch = function(querry, callBack){
  //Display all loaded trackers
  console.log('Loaded trackers :', torrents.getTrackers());

  // Search torrents on all enabled trackers
  torrents.search(querry, {type: 'movie', quality: 'dvdrip'}, function(err, torrentsFound) {
    if(err) { console.error(err); return; }

    console.log(torrentsFound.length +' torrent(s) found.');

    callBack(torrentsFound);
  });
};

exports.torrentDownload = function(torrent, callBack){
  var torrentDir = path.join(__dirname, 'torrent/');
  //Display all loaded trackers
  console.log('Loaded trackers :', torrents.getTrackers());

  torrents.download(torrent, function(err, torrentFileBuffer) {
    if(err) {
      console.error(err);
      callBack(err);
      return;
    }

    console.log(torrentFileBuffer);
    fs.writeFile(path.join(torrentDir, 'torrent.torrent'), torrentFileBuffer, function(err){
      if(err){
        console.error(err);
        callBack(err);
        return;
      }
    console.log('Downloaded!');
    });

  });
};
