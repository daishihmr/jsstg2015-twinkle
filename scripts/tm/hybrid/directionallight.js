var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three");

require("./threeelement");

tm.define("tm.hybrid.DirectionalLight", {
    superClass: "tm.hybrid.ThreeElement",

    init: function(hex, intensity) {
        this.superInit(new THREE.DirectionalLight(hex, intensity));
    },
});

tm.hybrid.DirectionalLight.prototype.accessor("target", {
    get: function() {
        return this.threeObject.target;
    },
    set: function(v) {
        this.threeObject.target = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setTarget", function(v) {
    this.target = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("intensity", {
    get: function() {
        return this.threeObject.intensity;
    },
    set: function(v) {
        this.threeObject.intensity = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setIntensity", function(v) {
    this.intensity = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("onlyShadow", {
    get: function() {
        return this.threeObject.onlyShadow;
    },
    set: function(v) {
        this.threeObject.onlyShadow = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setOnlyShadow", function(v) {
    this.onlyShadow = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraNear", {
    get: function() {
        return this.threeObject.shadowCameraNear;
    },
    set: function(v) {
        this.threeObject.shadowCameraNear = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraNear", function(v) {
    this.shadowCameraNear = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraFar", {
    get: function() {
        return this.threeObject.shadowCameraFar;
    },
    set: function(v) {
        this.threeObject.shadowCameraFar = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraFar", function(v) {
    this.shadowCameraFar = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraLeft", {
    get: function() {
        return this.threeObject.shadowCameraLeft;
    },
    set: function(v) {
        this.threeObject.shadowCameraLeft = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraLeft", function(v) {
    this.shadowCameraLeft = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraRight", {
    get: function() {
        return this.threeObject.shadowCameraRight;
    },
    set: function(v) {
        this.threeObject.shadowCameraRight = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraRight", function(v) {
    this.shadowCameraRight = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraTop", {
    get: function() {
        return this.threeObject.shadowCameraTop;
    },
    set: function(v) {
        this.threeObject.shadowCameraTop = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraTop", function(v) {
    this.shadowCameraTop = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraBottom", {
    get: function() {
        return this.threeObject.shadowCameraBottom;
    },
    set: function(v) {
        this.threeObject.shadowCameraBottom = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraBottom", function(v) {
    this.shadowCameraBottom = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCameraVisible", {
    get: function() {
        return this.threeObject.shadowCameraVisible;
    },
    set: function(v) {
        this.threeObject.shadowCameraVisible = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCameraVisible", function(v) {
    this.shadowCameraVisible = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowBias", {
    get: function() {
        return this.threeObject.shadowBias;
    },
    set: function(v) {
        this.threeObject.shadowBias = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowBias", function(v) {
    this.shadowBias = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowDarkness", {
    get: function() {
        return this.threeObject.shadowDarkness;
    },
    set: function(v) {
        this.threeObject.shadowDarkness = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowDarkness", function(v) {
    this.shadowDarkness = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowMapWidth", {
    get: function() {
        return this.threeObject.shadowMapWidth;
    },
    set: function(v) {
        this.threeObject.shadowMapWidth = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowMapWidth", function(v) {
    this.shadowMapWidth = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowMapHeight", {
    get: function() {
        return this.threeObject.shadowMapHeight;
    },
    set: function(v) {
        this.threeObject.shadowMapHeight = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowMapHeight", function(v) {
    this.shadowMapHeight = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascade", {
    get: function() {
        return this.threeObject.shadowCascade;
    },
    set: function(v) {
        this.threeObject.shadowCascade = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascade", function(v) {
    this.shadowCascade = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeOffset", {
    get: function() {
        return this.threeObject.shadowCascadeOffset;
    },
    set: function(v) {
        this.threeObject.shadowCascadeOffset = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeOffset", function(v) {
    this.shadowCascadeOffset = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeCount", {
    get: function() {
        return this.threeObject.shadowCascadeCount;
    },
    set: function(v) {
        this.threeObject.shadowCascadeCount = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeCount", function(v) {
    this.shadowCascadeCount = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeBias", {
    get: function() {
        return this.threeObject.shadowCascadeBias;
    },
    set: function(v) {
        this.threeObject.shadowCascadeBias = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeBias", function(v) {
    this.shadowCascadeBias = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeWidth", {
    get: function() {
        return this.threeObject.shadowCascadeWidth;
    },
    set: function(v) {
        this.threeObject.shadowCascadeWidth = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeWidth", function(v) {
    this.shadowCascadeWidth = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeHeight", {
    get: function() {
        return this.threeObject.shadowCascadeHeight;
    },
    set: function(v) {
        this.threeObject.shadowCascadeHeight = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeHeight", function(v) {
    this.shadowCascadeHeight = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeNearZ", {
    get: function() {
        return this.threeObject.shadowCascadeNearZ;
    },
    set: function(v) {
        this.threeObject.shadowCascadeNearZ = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeNearZ", function(v) {
    this.shadowCascadeNearZ = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeFarZ", {
    get: function() {
        return this.threeObject.shadowCascadeFarZ;
    },
    set: function(v) {
        this.threeObject.shadowCascadeFarZ = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeFarZ", function(v) {
    this.shadowCascadeFarZ = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCascadeArray", {
    get: function() {
        return this.threeObject.shadowCascadeArray;
    },
    set: function(v) {
        this.threeObject.shadowCascadeArray = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCascadeArray", function(v) {
    this.shadowCascadeArray = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowMap", {
    get: function() {
        return this.threeObject.shadowMap;
    },
    set: function(v) {
        this.threeObject.shadowMap = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowMap", function(v) {
    this.shadowMap = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowMapSize", {
    get: function() {
        return this.threeObject.shadowMapSize;
    },
    set: function(v) {
        this.threeObject.shadowMapSize = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowMapSize", function(v) {
    this.shadowMapSize = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowCamera", {
    get: function() {
        return this.threeObject.shadowCamera;
    },
    set: function(v) {
        this.threeObject.shadowCamera = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowCamera", function(v) {
    this.shadowCamera = v;
    return this;
});

tm.hybrid.DirectionalLight.prototype.accessor("shadowMatrix", {
    get: function() {
        return this.threeObject.shadowMatrix;
    },
    set: function(v) {
        this.threeObject.shadowMatrix = v;
    }
});
tm.hybrid.DirectionalLight.defineInstanceMethod("setShadowMatrix", function(v) {
    this.shadowMatrix = v;
    return this;
});
