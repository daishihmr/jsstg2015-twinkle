var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

var colorConv = require("../tm/hybrid/colorconv");

tm.define("jsstg2015.elements.Background", {
    superClass: "tm.hybrid.ThreeElement",

    init: function() {
        this.superInit();
        var self = this;

        var geometry = tm.asset.Manager.get("board").mesh.geometry;
        (6).times(function(y) {
            (6).times(function(x) {
                tm.hybrid.Mesh(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                        color: colorConv.hsl("hsl(120, 40%, 20%)"),
                        wireframe: true,
                        wireframeLinewidth: 1,
                        fog: true,
                    })))
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
