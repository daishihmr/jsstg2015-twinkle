/*
 * scene.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");
    require("./threeelement");
    require("./camera");
    require("./ambientlight");
    require("./directionallight");

    tm.define("tm.hybrid.Scene", {
        superClass: "tm.app.Scene",

        two: null,
        three: null,

        effectComposer: null,

        init: function() {
            this.superInit();
            this.two = this;
            this.three = tm.hybrid.Scene.Three();

            // TODO どう扱うか
            this.effectComposer = null;

            this.on("enter", function(e) {
                this.camera.aspect = e.app.width / e.app.height;
            });
        },

        render: function(renderer) {
            renderer.render(this.three.scene, this.three.camera.threeObject);
        },

        /** @override */
        addChild: function(child) {
            if (child instanceof tm.hybrid.ThreeElement) {
                this.three.addChild(child);
            } else {
                this.two.addChild(child);
            }
        },

        /** @override */
        removeChild: function(child) {
            if (child instanceof tm.hybrid.ThreeElement) {
                this.three.removeChild(child);
            } else {
                this.two.removeChild(child);
            }
        },
    });
    tm.hybrid.Scene.prototype.accessor("camera", {
        get: function() {
            return this.three.camera;
        },
        set: function(v) {
            this.three.camera = v;
        },
    });
    tm.hybrid.Scene.prototype.accessor("ambientLight", {
        get: function() {
            return this.three.ambientLight;
        },
        set: function(v) {
            this.three.ambientLight = v;
        },
    });
    tm.hybrid.Scene.prototype.accessor("directionalLight", {
        get: function() {
            return this.three.directionalLight;
        },
        set: function(v) {
            this.three.directionalLight = v;
        },
    });

    tm.hybrid.Scene.prototype.accessor("fog", {
        get: function() {
            return this.three.scene.fog;
        },
        set: function(v) {
            this.three.scene.fog = v;
        },
    });
    tm.hybrid.Scene.prototype.accessor("fogColor", {
        get: function() {
            return this.three.scene.fog.color;
        },
        set: function(v) {
            this.three.scene.fog.color = v;
        },
    });
    tm.hybrid.Scene.prototype.accessor("fogNear", {
        get: function() {
            return this.three.scene.fog.near;
        },
        set: function(v) {
            this.three.scene.fog.near = v;
        },
    });
    tm.hybrid.Scene.prototype.accessor("fogFar", {
        get: function() {
            return this.three.scene.fog.far;
        },
        set: function(v) {
            this.three.scene.fog.far = v;
        },
    });

    tm.hybrid.Scene.prototype.accessor("overrideMaterial", {
        get: function() {
            return this.three.scene.overrideMaterial;
        },
        set: function(v) {
            this.three.scene.overrideMaterial = v;
        },
    });

    tm.hybrid.Scene.prototype.accessor("autoUpdate", {
        get: function() {
            return this.three.scene.autoUpdate;
        },
        set: function(v) {
            this.three.scene.autoUpdate = v;
        },
    });

    tm.define("tm.hybrid.Scene.Three", {
        superClass: "tm.hybrid.ThreeElement",

        init: function() {
            this.superInit(new THREE.Scene());

            this.scene = this.threeObject;
            this.scene.fog = new THREE.Fog(0xffffff, 1000, 5000);

            this.camera = tm.hybrid.Camera();
            this.camera.z = 7;

            this.ambientLight = tm.hybrid.AmbientLight(0x888888)
                .addChildTo(this);

            this.directionalLight = tm.hybrid.DirectionalLight(0xffffff, 1)
                .setPosition(1, 1, 1)
                .addChildTo(this);
        },
    });
})();
