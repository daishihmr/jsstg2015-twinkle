(function() {
    var tm = require("../../libs/tmlib");
    var consts = require("../consts");
    var utils = require("../utils");

    var Bullet = tm.createClass({
        superClass: tm.app.Element,

        init: function(bullets, index) {
            this.superInit();

            this.bullets = bullets;
            this.index = index;

            this.runner = null;

            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.bright = 1;
            this.type = 0;
            this.frame = 0;
        },

        dispose: function() {
            this.bullets.dispose(this);
        },

        update: function(app) {},

    });

    module.exports = Bullet;
})();
