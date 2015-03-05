(function() {
    var tm = require("../../libs/tmlib");
    var THREE = require("../../libs/three");
    var consts = require("../consts");
    var Bullet = require("./bullet");

    var Bullets = tm.createClass({
        superClass: tm.hybrid.ThreeElement,
        init: function(hue, size, poolSize) {
            hue = hue || 0;
            size = size || 20;
            poolSize = poolSize || 512;

            this.bullets = [];

            var image = tm.graphics.Canvas()
                .resize(32, 32)
                .setFillStyle("hsl({0}, 80%, 80%)".format(hue))
                .setStrokeStyle("hsl({0}, 100%, 50%)".format(hue))
                .setLineStyle(8)
                .fillCircle(16, 16, 12)
                .strokeCircle(16, 16, 12)
                .element;
            var texture = new THREE.Texture(image);
            texture.needsUpdate = true;

            var geometry = new THREE.Geometry();
            var vertex;
            for (var i = 0; i < poolSize; i++) {
                vertex = new THREE.Vector3(0, consts.Y_MAX * 2, 0);
                this.bullets.push(Bullet(vertex));
                geometry.vertices.push(vertex);
            }

            var material = new THREE.PointCloudMaterial({
                size: size,
                sizeAttenuation: false,
                map: texture,
                transparent: false,
            });

            var particles = new THREE.PointCloud(geometry, material);
            particles.sortParticles = true;
            particles.frustumCulled = false;

            this.superInit(particles);
        },

        get: function() {
            var bullets = this.bullets;
            var len = bullets.length;
            for (var i = 0; i < len; i++) {
                if (bullets[i].active === false) return bullets[i];
            }
            console.warn("弾切れ");
            return null;
        },

        update: function() {
            var bullets = this.bullets;
            var len = bullets.length;
            for (var i = 0; i < len; i++) {
                bullets[i].update();
            }
        },
    });

    module.exports = Bullets;
})();
