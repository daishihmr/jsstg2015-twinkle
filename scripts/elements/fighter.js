(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    require("../tm/hybrid/shape");

    var consts = require("../consts");
    var GameSceneManager = require("../scenes/gamescenemanager");

    var Fighter = tm.createClass({
        superClass: tm.hybrid.Mesh,

        init: function() {
            this.superInit("fighter");
            GameSceneManager.fighter = this;

            this.setScale(5);
            this.rotationX = -90;

            this.roll = 0;
            this.entered = false;
            this.delta = new THREE.Vector3();
        },

        update: function(app) {
            var gameScene = GameSceneManager.gameScene;

            if (!gameScene.demoPlaying) {

                var lastX = this.x;
                var lastY = this.y;

                if (app.pointing.getPointing()) {
                    this.delta.copy(app.pointing.deltaPosition).multiplyScalar(-consts.FIGHTER_SPEED);
                } else {
                    this.delta.set(0, 0, 0);
                }
                // this.delta.copy(app.keyboard.getKeyDirection().mul(3.0));

                this.x = Math.clamp(this.x + this.delta.x, consts.X_MIN, consts.X_MAX);
                this.y = Math.clamp(this.y + this.delta.y, consts.Y_MIN, consts.Y_MAX);

                var cam = gameScene.camera;
                if (this.entered) {
                    var count = 0;
                    var v = tm.geom.Vector2(this.x, this.y).normalize().negate();
                    while (count < 10 && !cam.isInSight(this)) {
                        if (this.x != 0) this.x += v.x;
                        if (this.y != 0) this.y += v.y;

                        this.updateMatrix();
                        this.updateMatrixWorld();

                        count += 1;
                    }
                } else {
                    if (cam.isInSight(this)) {
                        this.entered = true;
                    }
                }


                var lastRoll = this.roll;
                var dx = this.x - lastX;
                if (dx != 0) {
                    this.roll -= (dx / Math.abs(dx)) * 6;
                } else if (this.roll != 0) {
                    var absRoll = Math.abs(this.roll);
                    if (absRoll <= 6) {
                        this.roll = 0;
                    } else {
                        this.roll -= (this.roll / absRoll) * 6;
                    }
                }
                this.roll = Math.clamp(this.roll, -90, 90);

                if (this.roll != lastRoll) {
                    this.rotateRoll(this.roll - lastRoll);
                }

            }
            // console.log(this.x, this.y);
        },

    });

    module.exports = Fighter;
})();
