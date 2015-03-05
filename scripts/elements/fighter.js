(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    var colorConv = require("../tm/hybrid/colorconv");
    require("../tm/hybrid/shape");

    var consts = require("../consts");

    var Fighter = tm.createClass({
        superClass: tm.hybrid.BoxMesh,

        init: function() {
            this.superInit();
            this.threeObject.material = new THREE.MeshBasicMaterial({
                color: colorConv.hsl("hsl(220, 70%, 90%)"),
                wireframe: true,
                wireframeLinewidth: 3,
            });
            this.setScale(10);

            this.delta = new THREE.Vector3();
        },

        update: function(app) {
            this.rotationX += 10;
            this.rotationY += 5;

            if (app.pointing.getPointing()) {
                this.delta.copy(app.pointing.deltaPosition).multiplyScalar(0.5);
            } else {
                this.delta.copy(app.keyboard.getKeyDirection().mul(3.0));
            }

            this.x = Math.clamp(this.x - this.delta.x, consts.X_MIN, consts.X_MAX);
            this.y = Math.clamp(this.y - this.delta.y, consts.Y_MIN, consts.Y_MAX);
        },

    });

    module.exports = Fighter;
})();
