(function() {
    function SongPlayer() {
        var SongPlayer = {};
        var currentSong = null;
        var currentBuzzObject = null;

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            };

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                format: ['mp3'],
                preload: true
            });

            currentSong = song;

        };

        SongPlayer.play = function(song) {

            if (currentSong !== song) {
                setSong(song);
                playSong(song);


            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }


        };

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            currentSong.playing = false;
        };

        return SongPlayer;
    };

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer)
})();