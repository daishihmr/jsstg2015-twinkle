(function() {
    var tm = require("../libs/tmlib");
    var THREE = require("../libs/three");
    require("./tm/hybrid/threeelement");
    require("./tm/hybrid/scene");

    var consts = require("./consts");
    var GameScene = require("./scenes/gamescene");
    var Easing = require("./shader/easing.js");
    var SoundManager = require("./soundmanager");
    var ParticleSystem = require("./elements/particlesystem");
    // var Cloud = require("./elements/cloud");

    var Bullets = require("./elements/bullets");

    var Dev = tm.createClass({
        superClass: GameScene,
        // superClass: tm.hybrid.Scene,

        init: function() {
            var scene = this;
            scene.superInit();

            // var geo = new THREE.Geometry();
            // var box = new THREE.BoxGeometry(10, 10, 10);
            // var matrix = new THREE.Matrix4();
            // for (var x = -200; x < 200; x += 75) {
            //     for (var y = -400; y < 400; y += 75) {
            //         for (var z = -200; z < 200; z += 75) {
            //             matrix.identity().setPosition({
            //                 x: x,
            //                 y: y,
            //                 z: z,
            //             });
            //             geo.merge(box, matrix);
            //         }
            //     }
            // }
            // tm.hybrid.Mesh()
            //     .setGeometry(geo)
            //     .setMaterial(new THREE.MeshBasicMaterial({
            //         color: 0x442200
            //     }))
            //     .addChildTo(this)
            //     .on("enterframe", function() {
            //         this.z -= 2;
            //         if (this.z < -400) this.z += 800;
            //     });
            // tm.hybrid.Mesh()
            //     .setZ(400)
            //     .setGeometry(geo)
            //     .setMaterial(new THREE.MeshBasicMaterial({
            //         color: 0x004422
            //     }))
            //     .addChildTo(this)
            //     .on("enterframe", function() {
            //         this.z -= 2;
            //         if (this.z < -400) this.z += 800;
            //     });

            // var cloud = Cloud("clouddark")
            //     .setY(-160)
            //     .addChildTo(this.first)
            //     .on("enterframe", function() {
            //         this.z -= 0.6;
            //     });

            // this.fogColor = new THREE.Color(0x000000);
            // this.fogNear = 100;
            // this.fogFar = 500;
            // this.tweener.clear()
            //     .to({
            //         fogNear: 1000,
            //         fogFar: 1500
            //     }, 60 * 1000);

            var groundScale = 800;

            var ground = tm.hybrid.Mesh("stage1/ground")
                .setScale(groundScale)
                .setY(-500)
                .on("enterframe", function() {
                    this.z += 0.2;
                })
                .addChildTo(this);
            ground.material.materials.forEach(function(m) {
                m.shading = THREE.SmoothShading;
                m.side = THREE.DoubleSide;
            });
            var ground2 = tm.hybrid.Mesh("stage1/ground")
                .setScale(groundScale, groundScale, -groundScale)
                .setY(-500)
                .on("enterframe", function() {
                    this.z += 0.2;
                })
                .addChildTo(this);
            ground2.material.materials.forEach(function(m) {
                m.shading = THREE.SmoothShading;
                m.side = THREE.DoubleSide;
            });

            // this.ambientLight.color = new THREE.Color(0x666666);

            // var particleSystem = ParticleSystem({
            //     texture: tm.hybrid.Texture("exp"),
            //     count: 500,
            //     life: 25,
            //     lifeRandom: 0.5,
            //     emitRange: 7,
            //     distance: 10,
            //     distanceRandom: 0.4,
            //     easing: Easing.QUAD_OUT,
            //     sizeFrom: 10.0,
            //     sizeTo: 30.0,
            //     sizeEasing: Easing.QUAD_OUT,
            //     redFrom: 1.0,
            //     redTo: 0.1,
            //     redDuration: 0.8,
            //     greenFrom: 1.0,
            //     greenTo: 0.0,
            //     greenDuration: 0.5,
            //     blueFrom: 1.0,
            //     blueTo: 0.0,
            //     blueDuration: 0.2,
            //     alphaFrom: 0.9,
            //     alphaTo: 0.1,
            //     alphaDuration: 1.0,
            //     alphaEasing: Easing.QUAD_OUT,
            //     blending: THREE.NormalBlending,
            // }).addChildTo(this.gameBoard);
            // this.on("enterframe", function(e) {
            //     if (e.app.frame % 5 === 0) {
            //         var v = tm.geom.Vector2().setRandom();
            //         v.mul(Math.randf(0, 100));
            //         particleSystem.createEmitter(4, 10)
            //             .setPosition(v.x, v.y, 0);
            //     }
            // });

            var camera = this.camera;
            var bullets = Bullets().addChildTo(this.gameBoard);
            this.on("enterframe", function(e) {
                if (e.app.frame % 10 === 0) {
                    var b = bullets.get();
                    if (b) {
                        b.addChildTo(bullets);
                        b.x = scene.fighter.x;
                        b.y = scene.fighter.y;
                        b.z = scene.fighter.z;
                        b.type = 1;
                        b.frame = 0;
                        b.rotation = Math.PI * 0.5;
                        b.update = function() {
                            this.y += 6.0;
                            this.frame = 0 + (this.frame + 1) % 3;
                            if (this.y > 200) this.remove();
                        };
                    }
                }
            });

        },
    });

    module.exports = Dev;
})();
