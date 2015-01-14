var tm = require("../../../libs/tmlib");
var THREE = require("../../../libs/three.js");

require("./mesh");

tm.define("tm.hybrid.PlaneMesh", {
    superClass: "tm.hybrid.Mesh",

    init: function(geometryParam, materialParam) {
        geometryParam = {}.$extend(tm.hybrid.PlaneMesh.DEFAULT_GEOMETRY_PARAM, geometryParam);
        materialParam = {}.$extend(tm.hybrid.PlaneMesh.DEFAULT_MATERIAL_PARAM, materialParam);
        var geo = new THREE.PlaneGeometry(geometryParam.width, geometryParam.height, geometryParam.widthSegments, geometryParam.heightSegments);
        var mat = new THREE.MeshLambertMaterial(materialParam);
        this.superInit(new THREE.Mesh(geo, mat));
    },
});
tm.hybrid.PlaneMesh.DEFAULT_GEOMETRY_PARAM = {
    width: 1,
    height: 1,
    widthSegments: 1,
    heightSegments: 1,
};
tm.hybrid.PlaneMesh.DEFAULT_MATERIAL_PARAM = {
    color: 0xffffff,
};

tm.define("tm.hybrid.BoxMesh", {
    superClass: "tm.hybrid.Mesh",

    init: function(geometryParam, materialParam) {
        geometryParam = {}.$extend(tm.hybrid.BoxMesh.DEFAULT_GEOMETRY_PARAM, geometryParam);
        materialParam = {}.$extend(tm.hybrid.BoxMesh.DEFAULT_MATERIAL_PARAM, materialParam);
        var geo = new THREE.BoxGeometry(geometryParam.width, geometryParam.height, geometryParam.depth, geometryParam.widthSegments, geometryParam.heightSegments, geometryParam.depthSegments);
        var mat = new THREE.MeshLambertMaterial(materialParam);
        this.superInit(new THREE.Mesh(geo, mat));
    },
});
tm.hybrid.BoxMesh.DEFAULT_GEOMETRY_PARAM = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
};
tm.hybrid.BoxMesh.DEFAULT_MATERIAL_PARAM = {
    color: 0xffffff,
};