/*
 * ambientlight.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");
    require("./delegateutil");
    require("./threeelement");

    tm.define("tm.hybrid.AmbientLight", {
        superClass: "tm.hybrid.ThreeElement",

        init: function(hex) {
            hex = hex || 0xffffff;
            this.superInit(new THREE.AmbientLight(hex));
        },
    });

    var delegater = tm.hybrid.DelegateUtil(tm.hybrid.AmbientLight);

    delegater.property("color");
})();
