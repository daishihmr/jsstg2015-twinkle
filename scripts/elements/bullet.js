(function() {
    var tm = require("../../libs/tmlib");
    var consts = require("../consts");
    var utils = require("../utils");

    var Bullet = tm.createClass({

        init: function(vertex) {
            this.position = vertex;
            this.age = 0;
            this.active = false;
        },

        update: function() {
            if (!this.active) return;

            this.position.x += this.vx;
            this.position.y += this.vy;

            if (!utils.isOutScreen(this.position)) {
                this.age += 1;
            } else {
                this.dispose();
            }
        },

        activate: function(x, y, direction) {
            this.position.set(x, y, 0);

            this.vx = Math.cos(direction);
            this.vy = Math.sin(direction);

            this.active = true;
        },

        dispose: function() {
            this.active = false;
            this.age = 0;
            this.position.set(0, consts.Y_MAX * 2, 0);
        },

    });

    module.exports = Bullet;
})();
