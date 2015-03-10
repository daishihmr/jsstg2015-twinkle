(function() {
    var tm = require("../../../libs/tmlib");
    var GameScene = require("../gamescene");
    var Tasks = require("../../tasks");

    var Stage1Scene = tm.createClass({
        superClass: GameScene,

        init: function() {
            this.superInit();
        },
    });

    module.exports = Stage1Scene;
});