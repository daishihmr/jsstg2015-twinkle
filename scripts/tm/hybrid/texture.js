/*
 * texture.js
 */

(function() {
    var tm = require("../../../libs/tmlib");
    var THREE = require("../../../libs/three");

    tm.hybrid.Texture = function(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
        if (typeof image === "string") {
            var texture = new THREE.Texture(tm.asset.Manager.get(image).element, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
            texture.needsUpdate = true;
            return texture;
        } else if (image instanceof Image || image instanceof HTMLImageElement) {
            var texture = new THREE.Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
            texture.needsUpdate = true;
            return texture;
        }
        return null;
    };

    module.exports = tm.hybrid.Texture;
})();
