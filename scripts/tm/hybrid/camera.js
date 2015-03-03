if (typeof module !== 'undefined' && module.exports) {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");

    require("./threeelement");
}

tm.define("tm.hybrid.Camera", {
    superClass: "tm.hybrid.ThreeElement",

    init: function() {
        this.superInit(new THREE.PerspectiveCamera(45, 1, 1, 20000));
    },
});

tm.hybrid.Camera.prototype.accessor("matrixWorldInverse", {
    get: function() {
        return this.threeObject.matrixWorldInverse;
    },
    set: function(v) {
        this.threeObject.matrixWorldInverse = v;
    },
});
tm.hybrid.Camera.defineInstanceMethod("setMatrixWorldInverse", function(v) {
    this.matrixWorldInverse = v;
    return this;
});

tm.hybrid.Camera.prototype.accessor("projectionMatrix", {
    get: function() {
        return this.threeObject.projectionMatrix;
    },
    set: function(v) {
        this.threeObject.projectionMatrix = v;
    },
});
tm.hybrid.Camera.defineInstanceMethod("setProjectionMatrix", function(v) {
    this.projectionMatrix = v;
    return this;
});

tm.hybrid.Camera.prototype.accessor("fov", {
    get: function() {
        return this.threeObject.fov;
    },
    set: function(v) {
        this.threeObject.fov = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.Camera.defineInstanceMethod("setFov", function(v) {
    this.fov = v;
    return this;
});

tm.hybrid.Camera.prototype.accessor("aspect", {
    get: function() {
        return this.threeObject.aspect;
    },
    set: function(v) {
        this.threeObject.aspect = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.Camera.defineInstanceMethod("setAspect", function(v) {
    this.aspect = v;
    return this;
});

tm.hybrid.Camera.prototype.accessor("near", {
    get: function() {
        return this.threeObject.near;
    },
    set: function(v) {
        this.threeObject.near = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.Camera.defineInstanceMethod("setNear", function(v) {
    this.near = v;
    return this;
});

tm.hybrid.Camera.prototype.accessor("far", {
    get: function() {
        return this.threeObject.far;
    },
    set: function(v) {
        this.threeObject.far = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.Camera.defineInstanceMethod("setFar", function(v) {
    this.far = v;
    return this;
});
