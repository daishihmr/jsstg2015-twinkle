var tm = require("../../libs/tmlib");
var THREE = require("../../libs/three");

(function() {

    tm.define("jsstg2015.elements.Building", {
        superClass: "tm.hybrid.Mesh",

        init: function(geometryParam, materialParam) {
            geometryParam = {}.$extend(DEFAULT_GEOMETRY_PARAM, geometryParam);
            materialParam = {}.$extend(DEFAULT_MATERIAL_PARAM, materialParam);
            var geo = new THREE.BoxGeometry(
                geometryParam.width,
                geometryParam.height,
                geometryParam.depth,
                geometryParam.widthSegments,
                geometryParam.heightSegments,
                geometryParam.depthSegments
            );
            var mat = new THREE.MeshBasicMaterial(materialParam);
            this.superInit(new THREE.Mesh(geo, mat));
        },
    });

    var DEFAULT_GEOMETRY_PARAM = {
        width: 1,
        height: 1,
        depth: 1,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
    };

    var DEFAULT_MATERIAL_PARAM = {
        color: 0xffffff,
    };

})();
