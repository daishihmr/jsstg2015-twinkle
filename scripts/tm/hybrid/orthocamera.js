var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three");

require("./threeelement");

tm.define("tm.hybrid.OrthoCamera", {
    superClass: "tm.hybrid.ThreeElement",

    init: function() {
        this.superInit(new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 1, 10000));
    },
});
tm.hybrid.OrthoCamera.prototype.accessor("left", {
    get: function() {
        return this.threeObject.left;
    },
    set: function(v) {
        this.threeObject.left = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.OrthoCamera.prototype.accessor("right", {
    get: function() {
        return this.threeObject.right;
    },
    set: function(v) {
        this.threeObject.right = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.OrthoCamera.prototype.accessor("top", {
    get: function() {
        return this.threeObject.top;
    },
    set: function(v) {
        this.threeObject.top = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.OrthoCamera.prototype.accessor("bottom", {
    get: function() {
        return this.threeObject.bottom;
    },
    set: function(v) {
        this.threeObject.bottom = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.OrthoCamera.prototype.accessor("near", {
    get: function() {
        return this.threeObject.near;
    },
    set: function(v) {
        this.threeObject.near = v;
        this.threeObject.updateProjectionMatrix();
    },
});
tm.hybrid.OrthoCamera.prototype.accessor("far", {
    get: function() {
        return this.threeObject.far;
    },
    set: function(v) {
        this.threeObject.far = v;
        this.threeObject.updateProjectionMatrix();
    },
});
