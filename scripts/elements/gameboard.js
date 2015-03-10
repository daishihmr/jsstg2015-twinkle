(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    var GameBoard = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            this.superInit();
            tm.hybrid.PlaneMesh().setScale(100).addChildTo(this);

            this.rotationX += 90;
        },

        update: function(app) {
        }
    });

    module.exports = GameBoard;
})();
