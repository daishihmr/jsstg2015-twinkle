(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/colorconv");
    var consts = require("../consts");

    var GameBoard = tm.createClass({
        superClass: tm.hybrid.ThreeElement,

        init: function() {
            this.superInit();

            this.plane = tm.hybrid.Mesh()
                .setGeometry(new THREE.PlaneGeometry(1000, 1000, 20, 20))
                .setVisible(false)
                .setMaterial(new THREE.MeshNormalMaterial({
                    wireframe: true,
                }))
                .addChildTo(this);
        },

        update: function(app) {}
    });

    module.exports = GameBoard;
})();
