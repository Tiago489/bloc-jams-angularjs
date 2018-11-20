(function() {
    function CollectionCtrl() {

        /* albums property defined as an empty array */
        this.albums = [];

        /* we are creating 12 copies of the albumPicasso located within the fixtures.js file */
        for (var i = 0; i < 12; i++) {
            this.albums.push(angular.copy(albumPicasso));
        }
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();