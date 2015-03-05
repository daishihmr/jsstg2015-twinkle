(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");

    var GameBoard = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            this.superInit();

            this.target = new THREE.Vector3();
        },

        update: function(app) {
            this.target.set(Math.cos(app.frame * 0.009) * 1000, -2500, Math.sin(app.frame * 0.002) * 2600 + 2800);
            this.lookAt(this.target);
        }
    });

    module.exports = GameBoard;
})();
