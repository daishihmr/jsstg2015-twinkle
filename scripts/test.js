var tm = require("../libs/tmlib");
var THREE = require("../libs/three");

require("./tm/hybrid/application");
require("./tm/hybrid/scene");
require("./tm/hybrid/mesh");

tm.main(function() {
    var app = tm.hybrid.Application("#canvas2d", "#canvas3d");
    app.resize(500, 500).fitWindow();
    app.run();

    tm.display.RectangleShape().addChildTo(app.currentScene);

    var box = tm.hybrid.Mesh()
        .setGeometry(new THREE.BoxGeometry(1, 1, 1))
        .setMaterial(new THREE.MeshNormalMaterial())
        .addChildTo(app.currentScene)
        .on("enterframe", function() {
            this.rotationX += 1;
            this.rotationY += 2;
        });
});
