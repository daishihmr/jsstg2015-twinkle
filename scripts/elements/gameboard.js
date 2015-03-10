(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    var GameBoard = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            this.superInit();
            this.rotationX = 90;
        },

        update: function(app) {
            if (app.frame % 5 != 0) return;

            tm.hybrid.BoxMesh()
                .setPosition(Math.rand(-100, 100), 120, 0)
                .setScale(10)
                .addChildTo(this)
                .on("enterframe", function() {
                    this.rotationX += 1;
                    this.rotationY += 2;
                    this.y += -4;
                    if (this.y < -120) this.remove();
                });
        }
    });

    module.exports = GameBoard;
})();
