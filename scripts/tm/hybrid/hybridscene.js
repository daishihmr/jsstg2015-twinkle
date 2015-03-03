var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three");

require("./threeelement");
require("./camera");

tm.define("tm.hybrid.HybridScene", {
    superClass: "tm.app.Scene",

    two: null,
    three: null,

    effectComposer: null,

    init: function() {
        this.superInit();
        this.two = this;
        this.three = tm.hybrid.HybridScene.Three();

        // TODO どう扱うか
        this.effectComposer = null;

        this.on("enter", function(e) {
            this.camera.aspect = e.app.width / e.app.height;
        });
    },

    render: function(renderer) {
        renderer.render(this.three.scene, this.three.camera.threeObject);
    },
});
tm.hybrid.HybridScene.prototype.accessor("camera", {
    get: function() {
        return this.three.camera;
    },
    set: function(v) {
        this.three.camera = v;
    },
});
tm.hybrid.HybridScene.prototype.accessor("ambientLight", {
    get: function() {
        return this.three.ambientLight;
    },
    set: function(v) {
        this.three.ambientLight = v;
    },
});
tm.hybrid.HybridScene.prototype.accessor("directionalLight", {
    get: function() {
        return this.three.directionalLight;
    },
    set: function(v) {
        this.three.directionalLight = v;
    },
});

tm.hybrid.HybridScene.prototype.accessor("fog", {
    get: function() {
        return this.three.scene.fog;
    },
    set: function(v) {
        this.three.scene.fog = v;
    },
});

tm.hybrid.HybridScene.prototype.accessor("overrideMaterial", {
    get: function() {
        return this.three.scene.overrideMaterial;
    },
    set: function(v) {
        this.three.scene.overrideMaterial = v;
    },
});

tm.hybrid.HybridScene.prototype.accessor("autoUpdate", {
    get: function() {
        return this.three.scene.autoUpdate;
    },
    set: function(v) {
        this.three.scene.autoUpdate = v;
    },
});

tm.define("tm.hybrid.HybridScene.Three", {
    superClass: "tm.hybrid.ThreeElement",

    init: function() {
        this.superInit(new THREE.Scene());

        this.scene = this.threeObject;
        this.scene.fog = new THREE.Fog(0x000000, 1000, 15000);

        this.camera = tm.hybrid.Camera();
        this.camera.z = 7;
    },
});
