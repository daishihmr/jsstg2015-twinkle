var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

var colorConv = require("../tm/hybrid/colorconv");

tm.define("jsstg.elements.Background", {
    superClass: "tm.hybrid.ThreeElement",

    init: function() {
        this.superInit();
        var self = this;

        var geometry = tm.asset.Manager.get("board").mesh.geometry;
        var material = tm.asset.Manager.get("board").mesh.material;
        material.materials.forEach(function(m) {
            m.side = THREE.DoubleSide;
        });
        (6).times(function(y) {
            (6).times(function(x) {
                tm.hybrid.Mesh(new THREE.Mesh(geometry, material))
                    .setRotationZ(x / 6 * 360 + 90)
                    .setPosition(
                        Math.cos(x / 6 * 2 * Math.PI) * 2000,
                        Math.sin(x / 6 * 2 * Math.PI) * 2000,
                        y * 4000 * 1.1
                    )
                    .setScale(500)
                    .on("enterframe", function() {
                        this.z -= 60;
                        if (this.z < 4000 * 1.1 * -1) {
                            this.z += 4000 * 1.1 * 6;
                        }
                    })
                    .addChildTo(self);
            });
        });
    },

    update: function(app) {
        this.rotationZ += 0.3;
    },
});
