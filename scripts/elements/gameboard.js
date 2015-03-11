(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/colorconv");
    var consts = require("../consts");

    var GameBoard = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            this.superInit();

            this.rotationX = 90;

            // if (consts.DEBUG) {
            //     tm.hybrid.Mesh()
            //         .setGeometry(new THREE.PlaneGeometry(500, 500, 20, 20))
            //         .setMaterial(new THREE.MeshBasicMaterial({
            //             color: tm.hybrid.ColorConv.hsl(220, 70, 10),
            //             wireframe: true,
            //         }))
            //         .addChildTo(this);
            // }
        },

        update: function(app) {
        }
    });

    module.exports = GameBoard;
})();
