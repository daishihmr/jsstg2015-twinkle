/*
 * texture.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");

    tm.hybrid = tm.hybrid || {};

    tm.hybrid.Texture = function(image, mapping) {
        if (typeof image === "string") {
            image = tm.asset.Manager.get(image).element;
        } else if (image instanceof tm.graphics.Canvas || image instanceof tm.asset.Texture) {
            image = image.element;
        }

        var texture = new THREE.Texture(image, mapping);
        texture.needsUpdate = true;
        return texture;
    };
})();
