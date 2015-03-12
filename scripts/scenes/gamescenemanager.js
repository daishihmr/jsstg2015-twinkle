(function() {
    var tm = require("../../libs/tmlib");

    var _GameSceneManager = tm.createClass({
        superClass: tm.event.EventDispatcher,

        init: function() {
            this.superInit();

            this.application = null;
            this.gameScene = null;
            this.fighter = null;
        }
    });

    module.exports = _GameSceneManager();
})();
