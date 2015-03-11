(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/shape");

    var consts = require("../consts");

    var Fighter = tm.createClass({
        superClass: tm.hybrid.Mesh,

        init: function() {
            this.superInit("fighter");
            this.setScale(5);
            this.delta = new THREE.Vector3();

            this.rotationY = 180;
            this.rotationX = -90;
        },

        update: function(app) {
            if (app.pointing.getPointing()) {
                this.delta.copy(app.pointing.deltaPosition).multiplyScalar(consts.FIGHTER_SPEED);
            } else {
                this.delta.set(0, 0, 0);
            }
            // this.delta.copy(app.keyboard.getKeyDirection().mul(3.0));

            var lastX = this.x;

            this.x = Math.clamp(this.x - this.delta.x, consts.X_MIN, consts.X_MAX);
            this.y = Math.clamp(this.y - this.delta.y, consts.Y_MIN, consts.Y_MAX);

            var dx = this.x - lastX;
            if (dx != 0) {
                this.rotationZ += (dx / Math.abs(dx)) * 6;
            }
            this.rotationZ -= (this.rotationZ / Math.abs(this.rotationY)) * 9;
            this.rotationZ = Math.clamp(this.rotationZ, -90, 90);

            // console.log(this.x, this.y);
        },

    });

    module.exports = Fighter;
})();
