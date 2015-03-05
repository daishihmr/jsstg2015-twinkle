/*
 * directionallight.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");
    require("./delegateutil");
    require("./threeelement");

    tm.define("tm.hybrid.DirectionalLight", {
        superClass: "tm.hybrid.ThreeElement",

        init: function(hex, intensity) {
            hex = hex || 0xffffff;
            intensity = intensity || 1.0;
            this.superInit(new THREE.DirectionalLight(hex, intensity));
        },
    });

    var delegater = tm.hybrid.DelegateUtil(tm.hybrid.DirectionalLight);

    delegater.property("target");
    delegater.property("intensity");
    delegater.property("onlyShadow");
    delegater.property("shadowCameraNear");
    delegater.property("shadowCameraFar");
    delegater.property("shadowCameraLeft");
    delegater.property("shadowCameraRight");
    delegater.property("shadowCameraTop");
    delegater.property("shadowCameraBottom");
    delegater.property("shadowCameraVisible");
    delegater.property("shadowBias");
    delegater.property("shadowDarkness");
    delegater.property("shadowMapWidth");
    delegater.property("shadowMapHeight");
    delegater.property("shadowCascade");
    delegater.property("shadowCascadeOffset");
    delegater.property("shadowCascadeCount");
    delegater.property("shadowCascadeBias");
    delegater.property("shadowCascadeWidth");
    delegater.property("shadowCascadeHeight");
    delegater.property("shadowCascadeNearZ");
    delegater.property("shadowCascadeFarZ");
    delegater.property("shadowCascadeArray");
    delegater.property("shadowMap");
    delegater.property("shadowMapSize");
    delegater.property("shadowCamera");
    delegater.property("shadowMatrix");
})();
