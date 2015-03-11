(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    var consts = require("../consts");
    var ColorConv = require("../tm/hybrid/colorconv");

    var GameBoard = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            this.superInit();

            this.rotationX = 90;

            if (consts.DEBUG) {
                tm.hybrid.Mesh()
                    .setGeometry(new THREE.PlaneGeometry(500, 500, 20, 20))
                    .setMaterial(new THREE.MeshBasicMaterial({
                        color: ColorConv.hsl(220, 70, 10),
                        wireframe: true,
                    }))
                    .addChildTo(this);
            }
        },

        update: function(app) {
            this.rotationX += 0.5;
            this.rotationY += 0.25;
        }
    });

    module.exports = GameBoard;
})();
