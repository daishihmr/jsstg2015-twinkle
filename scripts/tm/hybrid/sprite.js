var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three.js");

require("./threeelement");

tm.define("tm.hybrid.Sprite", {
    superClass: "tm.hybrid.ThreeElement",

    init: function(image, xCellSize, yCellSize) {

        var imageName = null;
        var spriteMaterial = null;

        if (typeof(image) === "string") {
            imageName = image;
            spriteMaterial = tm.hybrid.Sprite.materialCache[image];
            if (!spriteMaterial) {
                image = tm.asset.Manager.get(image);
                if (!image) {
                    console.error("アセット{0}がないよ".format(image));
                }
            }
        } else {
            if (!image.id) {
                image.id = THREE.Math.generateUUID();
            }
            imageName = image.id;
        }

        if (!spriteMaterial) {
            var texture = new THREE.Texture(image.element);
            texture.needsUpdate = true;
            // texture.sourceAssetName = imageName;

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff,
                fog: true,
            });

            tm.hybrid.Sprite.materialCache[imageName] = spriteMaterial;
        }

        xCellSize = xCellSize || 1;
        yCellSize = yCellSize || 1;

        this.superInit(new THREE.Sprite(spriteMaterial));
    },
});

tm.hybrid.Sprite.materialCache = {};
