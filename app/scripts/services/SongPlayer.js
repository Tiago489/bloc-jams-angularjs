(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        SongPlayer.currentSong = null;
        var currentBuzzObject = null;

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            };

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                format: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;

        };

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;

            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);


            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }


        };

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            SongPlayer.currentSong.playing = false;
        };

        SongPlayer.previousSong = function(song) {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.song[currentSongIndex];
                setSong(song);
                playSong(song);
            };
        };

        SongPlayer.nextSong = function(song) {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.length) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.song[currentSongIndex];
                setSong(song);
                playSong(song);
            };
        };



        return SongPlayer;
    };

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer])
})();