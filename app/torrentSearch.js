var TorrentsSearch = require('torrents-search');
var peerflix = require('peerflix');

var fs = require('fs');
var path = require('path');
var proc = require('child_process');
var address = require('network-address');

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
  torrents.search(querry, {type: 'movie', quality: 'bluray'}, function(err, torrentsFound) {
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
    var filePath = path.join(torrentDir, 'torrent.torrent');
    fs.writeFile(filePath, torrentFileBuffer, function(err){
      if(err){
        console.error(err);
        callBack(err, null);
        return;
      }
      console.log('Downloaded!');
      var torrentStream = require('torrent-stream');

      var engine = peerflix(torrentFileBuffer);

      engine.server.on('listening', function() {
    		var href = 'http://'+address()+':'+engine.server.address().port+'/';
        var filename = engine.server.index.name.split('/').pop().replace(/\{|\}/g, '');

        var root = '/Applications/VLC.app/Contents/MacOS/VLC'
				var home = (process.env.HOME || '') + root
        var VLC_ARGS = '-q --video-on-top --play-and-exit';
				var vlc = proc.exec('vlc '+href+' '+VLC_ARGS+' || '+root+' '+href+' '+VLC_ARGS+' || '+home+' '+href+' '+VLC_ARGS, function(error, stdout, stderror){
					if (error) {
            console.log(error);
						process.exit(0);
					}
				});

				vlc.on('exit', function(){
					//if (!argv.n && argv.quit !== false) process.exit(0);
				});
      });

      // engine.on('ready', function() {
      //     engine.files.forEach(function(file) {
      //         //console.log('filename:', file);
      //         var stream = file.createReadStream();
      //         console.log('stream:', stream._engine.path);
      //
      //         var root = '/Applications/VLC.app/Contents/MacOS/VLC'
      //         var home = (process.env.HOME || '') + root
      //
      //         process.title = 'FTBPLay';
      // 				var vlc = proc.exec('vlc -q --video-on-top --play-and-exit', function(error, stdout, stderror){
      // 					if (error) {
      // 						//process.exit(0);
      // 					}
      // 				});
      //
      // 				// vlc.on('exit', function(){
      // 				// 	 process.exit(0);
      //         //    console.log('process exiting');
      // 				// });
      //     });
      // });
      callBack(null, filePath);
    });

  });
};
